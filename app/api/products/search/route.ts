import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

// Функция для нормализации текста для поиска
function normalizeSearchText(text: string): string {
	return text
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, ""); // Убираем диакритические знаки
}

// Функция для транслитерации украинских символов
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

// Функция для создания вариантов поиска
function createSearchVariants(query: string): string[] {
	const normalized = normalizeSearchText(query);
	const variants = [
		query, // оригинальный запрос
		query.toLowerCase(), // в нижнем регистре
		normalized, // нормализованный
	];

	// Добавляем варианты с заменой украинских символов на похожие
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

	let ukrainianVariant = query.toLowerCase();
	for (const [uk, lat] of Object.entries(ukrainianMap)) {
		ukrainianVariant = ukrainianVariant.replace(new RegExp(uk, "g"), lat);
	}

	if (ukrainianVariant !== query.toLowerCase()) {
		variants.push(ukrainianVariant);
		console.log("Added Ukrainian variant:", ukrainianVariant);
	}

	// Добавляем варианты без "й" (y) для лучшего поиска
	if (query.includes("й") || query.includes("y")) {
		const withoutY = query.toLowerCase().replace(/[йy]/g, "");
		if (withoutY !== query.toLowerCase()) {
			variants.push(withoutY);
			console.log("Added variant without Y:", withoutY);
		}
	}

	// Добавляем варианты с заменой "й" на "и" и наоборот
	const withIInsteadOfY = query.toLowerCase().replace(/[йy]/g, "i");
	if (withIInsteadOfY !== query.toLowerCase()) {
		variants.push(withIInsteadOfY);
		console.log("Added variant with I instead of Y:", withIInsteadOfY);
	}

	// Убираем дубликаты
	const result = Array.from(new Set(variants));
	console.log("Final search variants:", result);
	return result;
}

export async function GET(req: NextRequest) {
	try {
		const query = req.nextUrl.searchParams.get("query") || "";

		if (!query.trim()) {
			return NextResponse.json([]);
		}

		console.log("Search query:", query);

		// Создаем варианты поиска
		const searchVariants = createSearchVariants(query);
		console.log("Search variants:", searchVariants);

		// Проверяем и обновляем searchName для продуктов, если его нет
		const productsWithoutSearchName = await prisma.product.findMany({
			where: {
				OR: [{ searchName: null }, { searchName: "" }],
			},
		});

		if (productsWithoutSearchName.length > 0) {
			console.log(`Обновляем searchName для ${productsWithoutSearchName.length} продуктов...`);

			for (const product of productsWithoutSearchName) {
				const normalized = normalizeSearchText(product.name);
				const transliterated = transliterateUkrainian(product.name);
				const searchName = `${normalized} ${transliterated}`.trim();

				await prisma.product.update({
					where: { id: product.id },
					data: { searchName },
				});
			}
		}

		// Используем Prisma с поиском по searchName
		const products = await prisma.product.findMany({
			where: {
				OR: [
					// Поиск по searchName (основной поиск)
					...searchVariants.map((variant) => ({
						searchName: {
							contains: variant,
							mode: "insensitive" as const,
						},
					})),
					// Поиск по оригинальному названию
					...searchVariants.map((variant) => ({
						name: {
							contains: variant,
							mode: "insensitive" as const,
						},
					})),
					// Поиск по ингредиентам
					...searchVariants.map((variant) => ({
						ingredients: {
							some: {
								name: {
									contains: variant,
									mode: "insensitive" as const,
								},
							},
						},
					})),
				],
			},
			include: {
				ingredients: true,
				items: true,
			},
			take: 5,
		});

		// Убираем дубликаты
		const uniqueProducts = products.filter(
			(product, index, self) => index === self.findIndex((p) => p.id === product.id),
		);

		console.log(
			"Found products:",
			uniqueProducts.map((p) => p.name),
		);

		return NextResponse.json(uniqueProducts);
	} catch (error) {
		console.error("Search error:", error);
		return NextResponse.json({ error: "Search failed" }, { status: 500 });
	}
}
