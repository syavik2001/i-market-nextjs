const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Функция для нормализации текста для поиска
function normalizeSearchText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // Убираем диакритические знаки
}

// Функция для транслитерации украинских символов
function transliterateUkrainian(text) {
  const ukrainianMap = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'h', 'д': 'd', 'е': 'e', 'є': 'ye',
    'ж': 'zh', 'з': 'z', 'и': 'y', 'і': 'i', 'ї': 'yi', 'й': 'y', 'к': 'k',
    'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's',
    'т': 't', 'у': 'u', 'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh',
    'щ': 'shch', 'ь': '', 'ю': 'yu', 'я': 'ya'
  };

  let result = text.toLowerCase();
  for (const [uk, lat] of Object.entries(ukrainianMap)) {
    result = result.replace(new RegExp(uk, 'g'), lat);
  }
  return result;
}

async function updateSearchNames() {
  try {
    console.log('Начинаем обновление searchName...');

    const products = await prisma.product.findMany();

    for (const product of products) {
      // Создаем нормализованное название для поиска
      const normalized = normalizeSearchText(product.name);
      const transliterated = transliterateUkrainian(product.name);

      // Объединяем варианты для лучшего поиска
      const searchName = `${normalized} ${transliterated}`.trim();

      await prisma.product.update({
        where: { id: product.id },
        data: { searchName }
      });

      console.log(`Обновлен продукт: "${product.name}" -> searchName: "${searchName}"`);
    }

    console.log('Все продукты обновлены!');

    // Проверим результат
    const updatedProducts = await prisma.product.findMany({
      select: { name: true, searchName: true }
    });

    console.log('\nРезультат:');
    updatedProducts.forEach(product => {
      console.log(`"${product.name}" -> "${product.searchName}"`);
    });

  } catch (error) {
    console.error('Ошибка:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateSearchNames(); 