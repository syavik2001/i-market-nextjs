import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

// Принудительно делаем роут динамическим
export const dynamic = "force-dynamic";

// Известные названия продуктов на английском по умолчанию
const defaultEnNames: Record<string, string> = {
	"Вегетаріанська": "Vegetarian",
	"Пепероні фреш": "Pepperoni Fresh",
	"Сирна": "Cheese Pizza",
	"Чорізо фреш": "Chorizo Fresh",
	"Маргарита": "Margherita",
	"Гавайська": "Hawaiian",
	"Барбекю": "BBQ",
	"Чотири сири": "Four Cheeses",
	"М'ясна": "Meat Supreme",
	"Омлет з шинкою та грибами": "Ham and Mushroom Omelette",
	"Омлет з пепероні": "Pepperoni Omelette",
	"Кава Латте": "Coffee Latte",
	"Денвіч шинка і сир": "Ham and Cheese Sandwich",
	"Курячі нагетси": "Chicken Nuggets",
	"Картопля з печі з соусом 🌱": "Oven Baked Potatoes with Dip 🌱",
	"Додстер": "Dodster Roll",
	"Гострий Додстер 🌶️🌶️": "Spicy Dodster Roll 🌶️🌶️",
	"Банановий молочний коктейль": "Banana Milkshake",
	"Карамельне яблуко молочний коктейль": "Caramel Apple Milkshake",
	"Молочний коктейль з печивом Орео": "Oreo Milkshake",
	"Класичний молочний коктейль 👶": "Classic Milkshake 👶",
	"Ірландський Капучино": "Irish Cappuccino",
	"Кава Карамельний капучино": "Caramel Cappuccino",
	"Кава Кокосовий латте": "Coconut Latte",
	"Кава Американо": "Americano Coffee",
};

// Функция для нормализации текста для поиска
function normalizeSearchText(text: string): string {
	return text
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, ""); // Убираем диакритические знаки
}

// Функция для транслитерации украинских символов в латиницу (включая g и h)
function transliterateUkrainian(text: string): string {
	const ukrainianMap: Record<string, string> = {
		а: "a",
		б: "b",
		в: "v",
		г: "h",
		д: "d",
		е: "e",
		є: "ye",
		ж: "zh",
		з: "z",
		и: "y",
		і: "i",
		ї: "yi",
		й: "y",
		к: "k",
		л: "l",
		м: "m",
		н: "n",
		о: "o",
		п: "p",
		р: "r",
		с: "s",
		т: "t",
		у: "u",
		ф: "f",
		х: "kh",
		ц: "ts",
		ч: "ch",
		ш: "sh",
		щ: "shch",
		ь: "",
		ю: "yu",
		я: "ya",
	};

	let result = text.toLowerCase();
	for (const [uk, lat] of Object.entries(ukrainianMap)) {
		result = result.replace(new RegExp(uk, "g"), lat);
	}
	return result;
}

// Обратная транслитерация из латиницы в кириллицу
function latinToUkrainian(text: string): string {
	const multiMap: [string, string][] = [
		["shch", "щ"],
		["zh", "ж"],
		["kh", "х"],
		["ts", "ц"],
		["ch", "ч"],
		["sh", "ш"],
		["yu", "ю"],
		["ya", "я"],
		["ye", "є"],
		["yi", "ї"],
	];

	const singleMap: Record<string, string> = {
		a: "а",
		b: "б",
		v: "в",
		g: "г",
		h: "г",
		d: "д",
		e: "е",
		z: "з",
		y: "и",
		i: "і",
		k: "к",
		l: "л",
		m: "м",
		n: "н",
		o: "о",
		p: "п",
		r: "р",
		s: "с",
		t: "т",
		u: "у",
		f: "ф",
	};

	let result = text.toLowerCase();

	for (const [lat, uk] of multiMap) {
		result = result.replace(new RegExp(lat, "g"), uk);
	}

	let singleResult = "";
	for (let i = 0; i < result.length; i++) {
		const char = result[i];
		singleResult += singleMap[char] || char;
	}

	return singleResult;
}

// Функция для создания вариантов поиска
function createSearchVariants(query: string): string[] {
	const normalized = normalizeSearchText(query);
	const lower = query.toLowerCase();
	const variants = [query, lower, normalized];

	// 1. Прямая транслитерация укр -> латиница
	const ukVariant = transliterateUkrainian(lower);
	if (ukVariant !== lower) {
		variants.push(ukVariant);
	}

	// 2. Вариант с заменой 'g' <-> 'h' (например, veh <-> veg)
	if (lower.includes("g")) {
		variants.push(lower.replace(/g/g, "h"));
	}
	if (lower.includes("h")) {
		variants.push(lower.replace(/h/g, "g"));
	}

	// 3. Обратная транслитерация латиница -> кириллица (например, veg -> вег)
	const cyrillicVariant = latinToUkrainian(lower);
	if (cyrillicVariant !== lower) {
		variants.push(cyrillicVariant);
	}

	// Убираем дубликаты
	return Array.from(new Set(variants.filter(Boolean)));
}

export async function GET(req: NextRequest) {
	try {
		const query = req.nextUrl.searchParams.get("query") || "";

		if (!query.trim()) {
			return NextResponse.json([]);
		}

		const cleanQuery = query.trim().toLowerCase();

		// Создаем варианты поиска
		const searchVariants = createSearchVariants(cleanQuery);

		// Автоматически заполняем nameEn и поисковые индексы для ВСЕХ продуктов в базе
		const allProducts = await prisma.product.findMany();
		for (const product of allProducts) {
			const expectedEn = defaultEnNames[product.name] || product.nameEn || product.name;
			const normalizedUk = normalizeSearchText(product.name);
			const transliterated = transliterateUkrainian(product.name);
			const searchName = `${normalizedUk} ${transliterated}`.trim();
			const searchNameEn = normalizeSearchText(expectedEn);

			if (product.nameEn !== expectedEn || !product.searchName || !product.searchNameEn) {
				await prisma.product.update({
					where: { id: product.id },
					data: { nameEn: expectedEn, searchName, searchNameEn },
				});
			}
		}

		// Используем Prisma для поиска
		const products = await prisma.product.findMany({
			where: {
				OR: [
					...searchVariants.map((variant) => ({
						searchName: {
							contains: variant,
							mode: "insensitive" as const,
						},
					})),
					...searchVariants.map((variant) => ({
						searchNameEn: {
							contains: variant,
							mode: "insensitive" as const,
						},
					})),
					...searchVariants.map((variant) => ({
						name: {
							contains: variant,
							mode: "insensitive" as const,
						},
					})),
					...searchVariants.map((variant) => ({
						nameEn: {
							contains: variant,
							mode: "insensitive" as const,
						},
					})),
					...searchVariants.map((variant) => ({
						category: {
							OR: [
								{ name: { contains: variant, mode: "insensitive" as const } },
								{ nameEn: { contains: variant, mode: "insensitive" as const } },
							],
						},
					})),
					...searchVariants.map((variant) => ({
						ingredients: {
							some: {
								OR: [
									{ name: { contains: variant, mode: "insensitive" as const } },
									{ nameEn: { contains: variant, mode: "insensitive" as const } },
								],
							},
						},
					})),
				],
			},
			include: {
				ingredients: true,
				items: true,
			},
			take: 30,
		});

		// Убираем дубликаты
		const uniqueProducts = products.filter(
			(product, index, self) => index === self.findIndex((p) => p.id === product.id),
		);

		// Умная сортировка релевантности:
		// 1. Название начинается с вводимого слова (на англ или укр)
		// 2. Наличие прямых совпадений по подстрокам
		uniqueProducts.sort((a, b) => {
			const nameAEn = (a.nameEn || defaultEnNames[a.name] || "").toLowerCase();
			const nameAUk = a.name.toLowerCase();
			const nameBEn = (b.nameEn || defaultEnNames[b.name] || "").toLowerCase();
			const nameBUk = b.name.toLowerCase();

			const startsA =
				nameAEn.startsWith(cleanQuery) ||
				nameAUk.startsWith(cleanQuery) ||
				searchVariants.some((v) => nameAEn.startsWith(v) || nameAUk.startsWith(v));

			const startsB =
				nameBEn.startsWith(cleanQuery) ||
				nameBUk.startsWith(cleanQuery) ||
				searchVariants.some((v) => nameBEn.startsWith(v) || nameBUk.startsWith(v));

			if (startsA && !startsB) return -1;
			if (!startsA && startsB) return 1;

			return 0;
		});

		return NextResponse.json(uniqueProducts.slice(0, 6));
	} catch (error) {
		console.error("Search error:", error);
		return NextResponse.json({ error: "Search failed" }, { status: 500 });
	}
}
