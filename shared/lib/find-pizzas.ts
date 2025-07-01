import { prisma } from "@/prisma/prisma-client";

export interface GetSearchParams {
	query?: string;
	sortBy?: string;
	sizes?: string;
	pizzaTypes?: string;
	ingredients?: string;
	priceFrom?: string;
	priceTo?: string;
}

const DEFAULT_MIN_PRICE = 10;
const DEFAULT_MAX_PRICE = 1000;

export const findPizzas = async (params: GetSearchParams) => {
	const sizes = params.sizes?.split(",").map(Number);
	const pizzaTypes = params.pizzaTypes?.split(",").map(Number);
	const ingredientsIdArr = params.ingredients?.split(",").map(Number);

	const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
	const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;

	// Оптимизированный запрос с сортировкой на уровне SQL
	const getOrderBy = () => {
		switch (params.sortBy) {
			case "alphabet-asc":
				return { name: "asc" as const };
			case "alphabet-desc":
				return { name: "desc" as const };
			case "price-asc":
			case "price-desc":
				// Для сортировки по цене используем сортировку по id, а затем сортируем на уровне JavaScript
				return { id: "desc" as const };
			default:
				return { name: "asc" as const };
		}
	};

	// Упрощенный запрос без лишних JOIN
	const categories = await prisma.category.findMany({
		include: {
			products: {
				orderBy: getOrderBy(),
				where: {
					// Фильтр по ингредиентам
					...(ingredientsIdArr &&
						ingredientsIdArr.length > 0 && {
							ingredients: {
								some: {
									id: { in: ingredientsIdArr },
								},
							},
						}),
					// Фильтр по размерам и типам
					...(((sizes && sizes.length > 0) || (pizzaTypes && pizzaTypes.length > 0)) && {
						items: {
							some: {
								...(sizes && sizes.length > 0 && { size: { in: sizes } }),
								...(pizzaTypes && pizzaTypes.length > 0 && { pizzaType: { in: pizzaTypes } }),
								price: { gte: minPrice, lte: maxPrice },
							},
						},
					}),
				},
				include: {
					ingredients: true,
					items: {
						where: {
							price: { gte: minPrice, lte: maxPrice },
						},
						orderBy: { price: "asc" },
					},
				},
			},
		},
	});

	// Применяем сортировку по цене на уровне JavaScript, если нужно
	if (params.sortBy === "price-asc" || params.sortBy === "price-desc") {
		categories.forEach((category) => {
			category.products.sort((a, b) => {
				const priceA = Math.min(...a.items.map((item) => item.price));
				const priceB = Math.min(...b.items.map((item) => item.price));

				if (params.sortBy === "price-asc") {
					return priceA - priceB;
				} else {
					return priceB - priceA;
				}
			});
		});
	}

	// Фильтруем продукты без подходящих items
	const filteredCategories = categories.map((category) => ({
		...category,
		products: category.products.filter((product) => product.items.length > 0),
	}));

	return filteredCategories;
};
