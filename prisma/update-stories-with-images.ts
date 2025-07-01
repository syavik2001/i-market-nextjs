const { prisma: prismaClient } = require("./prisma-client");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// Список всех изображений из папки public/assets/images/stories/
const allStoryImages = [
	"06908213d759fdb3564eabdf37fcb416.jpg",
	"092f0fc545b1e3a4c522fb0f81dec9a4.jpg",
	"0e57be1e9c35b89cda29a955bf293204.jpg",
	"0ec521672b643025100af5fac91cbf37.jpg",
	"0f1c3ba444f04c4e6503d326b1ceef43.jpg",
	"1064a63d6401f9cb0ca8c54ae78fb02b.jpg",
	"12a4be3b3652298dfd7309063ff6b692.jpg",
	"142d1a892a2f6d62fbbb2672d272b2ff.jpg",
	"168cc1595fa5e19133903691d34e2923.jpg",
	"196455282e0e078f3682244df54cd681.jpg",
	"2008a8671dc487a5f66a8aa1be15e9e3.jpg",
	"221b545576fc891208fe4b93974f6dba.jpg",
	"29feb13f741817d3d298c1250d752482.jpg",
	"2bd726a86299ac8bf38a8d07744bd455.jpg",
	"3d262a6d535572ade997e6511d03bc9b.jpg",
	"411db607e02d5f6b6821b9fe9e9db7be.jpg",
	"4b7526a972650d6396c46eeecb745cda.jpg",
	"4e9e272ada6230f5936deab4a4a9254c.jpg",
	"4ebbc6243287600edcc0075aab9d07a4.jpg",
	"4f8709a640b969be25c1a0f5ddf95129.jpg",
	"5020531cf31a347c90974474e91ced5d.jpg",
	"533ecf4f9e58c4e211f075792047b7fd.jpg",
	"553530af34affa416e393607587a77b0.jpg",
	"57d777ab43810927d9e9a05232b4da32.jpg",
	"583c3672c0a424b932e97f0e175d0fcf.jpg",
	"5a81ee0cdba5a9a0033568b2150b1a34.jpg",
	"5ded3af85015853d68fb97bc1a95decd.jpg",
	"6fef1c32ea993bdf1d780ebb8b8ebe52.jpg",
	"7078c66c97cd9a1009d5e2ee868ef540.jpg",
	"760fe5bce24c3a62b66a32d426f04768.jpg",
	"7831271e8ee2ba33974ddae18dd3da89.jpg",
	"7b0eabba402886e46c4051af3edeec80.jpg",
	"7eec21c372da7852fc39f901778641f7.jpg",
	"8420cddb35a6f35eae42d00dde9d5df4.jpg",
	"85661584dd58afe3caa27fd5bf8361b2.jpg",
	"8f327651f1fa4c6ff7119d6592d7dffe.jpg",
	"9791ce622c4262e509469b37e24ddab9.jpg",
	"99a1b481415e3c0ebfae5734203dc8bf.jpg",
	"9e4e0b231f45dbf350b16debe538b4af.jpg",
	"a487a33ba5ca3fa7c9286b6ec1cf6382.jpg",
	"a609832c44f1bc6c7e3c6d33cc898bc5.jpg",
	"aaade5d7e8970d62fcaaad2c9239048f.jpg",
	"bec81ab89f55451db415275e1e8edcab.jpg",
	"c4c13e480302ccceec4b594668598a74.jpg",
	"d40678adcc3d46e69611abd54956dc04.jpg",
	"d4f973ac3e534ffea49adc56e59dadcb.jpg",
	"dd51d96da550350ff84011cea4caae6c.jpg",
	"e00c23e52531a6c15094adc085df6795.jpg",
	"e2b568b3ac874ed54a451844260d76a9.jpg",
	"e6edbe69c07eae294bc5310690e24abf.jpg",
	"e9b1a53b18ea9958c3433f68cf562d11.jpg",
	"ea5e7db8ac2883954e242ee02b38d5ea.jpg",
	"f0e378d182ad48ff8982e68fbaa4e8ea.jpg",
	"fa2c6562f2365efa7cad151cfce44018.jpg",
	"fb5f6b0917507e588c869deb169ec543.jpg",
	"fe1468b856b2f1eea8a027361215cb50.jpg",
	"fe34dc337e425a0b45e5ef344aaf6e93.jpg",
	"ffeebd01887901543896ddefc5c43a9b.jpg",
	"pexels-rajesh-tp-749235-1633525.jpg",
	"pexels-tijana-drndarski-449691-3338681.jpg",
	"pexels-vanmalidate-784633.jpg",
	"загружено (1).png",
	"загружено.png",
];

// Оставляем только реально существующие файлы
const storiesDir = path.join(__dirname, "..", "public", "assets", "images", "stories");
const filteredStoryImages = allStoryImages.filter((filename) =>
	fs.existsSync(path.join(storiesDir, filename)),
);

// Функция для перемешивания массива
function shuffleArray(array: any[]): any[] {
	const shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}

// Функция для обработки изображения
async function processImage(
	inputPath: string,
	outputPath: string,
	targetWidth = 520,
	targetHeight = 800,
): Promise<boolean> {
	try {
		await sharp(inputPath)
			.resize(targetWidth, targetHeight, {
				fit: "cover",
				position: "center",
			})
			.jpeg({ quality: 85 })
			.toFile(outputPath);

		return true;
	} catch (error) {
		console.error(`Ошибка при обработке изображения ${inputPath}:`, error);
		return false;
	}
}

// Функция для создания историй
async function updateStoriesWithProcessedImages() {
	try {
		console.log("Начинаем обновление историй с обработкой изображений...");

		// Создаем папку для обработанных изображений, если её нет
		const processedImagesDir = path.join(
			__dirname,
			"..",
			"public",
			"assets",
			"images",
			"stories-processed",
		);
		if (!fs.existsSync(processedImagesDir)) {
			fs.mkdirSync(processedImagesDir, { recursive: true });
			console.log("Создана папка для обработанных изображений");
		}

		// Очищаем существующие истории
		await prismaClient.storyItem.deleteMany();
		await prismaClient.story.deleteMany();

		console.log("Существующие истории удалены");

		// Перемешиваем изображения для случайного распределения
		const shuffledImages = shuffleArray(filteredStoryImages);

		// Создаем 6 историй с фиксированным количеством изображений (8 штук)
		const storiesCount = 6;
		const imagesPerStory = 8; // Фиксированное количество изображений
		let currentImageIndex = 0;

		for (let i = 0; i < storiesCount; i++) {
			// Проверяем, достаточно ли изображений
			if (currentImageIndex + imagesPerStory > shuffledImages.length) {
				console.log(`Недостаточно изображений для истории ${i + 1}. Останавливаемся.`);
				break;
			}

			// Берем ровно 8 изображений для текущей истории
			const currentStoryImages = shuffledImages.slice(
				currentImageIndex,
				currentImageIndex + imagesPerStory,
			);
			currentImageIndex += imagesPerStory;

			// Первое изображение будет превью
			const previewImage = currentStoryImages[0];
			const previewImageName = `preview_${i + 1}_${path.basename(previewImage)}`;
			const previewImagePath = path.join(processedImagesDir, previewImageName);

			// Обрабатываем превью изображение (меньший размер для превью)
			const previewProcessed = await processImage(
				path.join(__dirname, "..", "public", "assets", "images", "stories", previewImage),
				previewImagePath,
				200,
				250, // Размер превью
			);

			if (!previewProcessed) {
				console.log(`Пропускаем историю ${i + 1} из-за ошибки обработки превью`);
				continue;
			}

			// Создаем историю
			const story = await prismaClient.story.create({
				data: {
					previewImageUrl: `/assets/images/stories-processed/${previewImageName}`,
				},
			});

			console.log(`Создана история ${i + 1} с превью: ${previewImageName}`);

			// Обрабатываем и создаем элементы истории
			const storyItems = [];

			for (let j = 0; j < currentStoryImages.length; j++) {
				const imageName = currentStoryImages[j];
				const processedImageName = `story_${i + 1}_item_${j + 1}_${path.basename(imageName)}`;
				const processedImagePath = path.join(processedImagesDir, processedImageName);

				// Обрабатываем изображение для истории (полный размер)
				const processed = await processImage(
					path.join(__dirname, "..", "public", "assets", "images", "stories", imageName),
					processedImagePath,
					520,
					800, // Размер для историй
				);

				if (processed) {
					storyItems.push({
						storyId: story.id,
						sourceUrl: `/assets/images/stories-processed/${processedImageName}`,
					});
				}
			}

			if (storyItems.length > 0) {
				await prismaClient.storyItem.createMany({
					data: storyItems,
				});

				console.log(`Добавлено ${storyItems.length} изображений в историю ${i + 1}`);
			}
		}

		console.log("Все истории успешно обновлены!");

		// Проверяем результат
		const allStories = await prismaClient.story.findMany({
			include: {
				items: true,
			},
		});

		console.log(`\nРезультат:`);
		console.log(`Всего историй: ${allStories.length}`);
		allStories.forEach((story: any, index: number) => {
			console.log(`История ${index + 1}: ${story.items.length} изображений`);
		});
	} catch (error) {
		console.error("Ошибка при обновлении историй:", error);
	}
}

// Запускаем обновление
updateStoriesWithProcessedImages()
	.then(async () => {
		await prismaClient.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prismaClient.$disconnect();
		process.exit(1);
	});
