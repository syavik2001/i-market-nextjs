import { prisma } from "./prisma-client";
import { categories, _ingredients, products } from "./constants";
import { Prisma } from "@prisma/client";
import { hashSync } from "bcrypt";

const randomDecimalNumber = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductItem = ({
	productId,
	pizzaType,
	size,
}: {
	productId: number;
	pizzaType?: 1 | 2;
	size?: 20 | 30 | 40;
}) => {
	return {
		productId,
		price: randomDecimalNumber(190, 600),
		pizzaType,
		size,
	} as Prisma.ProductItemUncheckedCreateInput;
};

async function up() {
	await prisma.user.createMany({
		data: [
			{
				fullName: "User Test",
				email: "user@test.ru",
				password: hashSync("111111", 10),
				verified: new Date(),
				role: "USER",
			},
			{
				fullName: "Admin Admin",
				email: "admin@test.ru",
				password: hashSync("111111", 10),
				verified: new Date(),
				role: "ADMIN",
			},
		],
	});

	await prisma.category.createMany({
		data: categories,
	});

	await prisma.ingredient.createMany({
		data: _ingredients,
	});

	await prisma.product.createMany({
		data: products,
	});

	const pizza1 = await prisma.product.create({
		data: {
			name: "Пепероні фреш",
			imageUrl: "/assets/images/pizzas/chorizzo-fresh.avif",
			categoryId: 1,
			ingredients: {
				connect: _ingredients.slice(0, 5),
			},
		},
	});

	const pizza2 = await prisma.product.create({
		data: {
			name: "Сирна",
			imageUrl: "/assets/images/pizzas/cheez.avif",
			categoryId: 1,
			ingredients: {
				connect: _ingredients.slice(5, 10),
			},
		},
	});

	const pizza3 = await prisma.product.create({
		data: {
			name: "Чорізо фреш",
			imageUrl: "/assets/images/pizzas/paper-fresh.avif",
			categoryId: 1,
			ingredients: {
				connect: _ingredients.slice(10, 40),
			},
		},
	});

	// Добавляем еще 6 пицц
	const pizza4 = await prisma.product.create({
		data: {
			name: "Маргарита",
			imageUrl: "/assets/images/pizzas/019635b27c727302835040e5d7c27caa.avif",
			categoryId: 1,
			ingredients: {
				connect: _ingredients.slice(0, 8),
			},
		},
	});

	const pizza5 = await prisma.product.create({
		data: {
			name: "Гавайська",
			imageUrl: "/assets/images/pizzas/019591c69fac7921a27e4ecd8c99f9df.avif",
			categoryId: 1,
			ingredients: {
				connect: _ingredients.slice(5, 15),
			},
		},
	});

	const pizza6 = await prisma.product.create({
		data: {
			name: "Барбекю",
			imageUrl: "/assets/images/pizzas/11ee7d6105ef6690b86fbde6150b5b0c.avif",
			categoryId: 1,
			ingredients: {
				connect: _ingredients.slice(8, 25),
			},
		},
	});

	const pizza7 = await prisma.product.create({
		data: {
			name: "Чотири сири",
			imageUrl: "/assets/images/pizzas/019591b13a1a724b90092c16d9b1c05a.avif",
			categoryId: 1,
			ingredients: {
				connect: _ingredients.slice(0, 12),
			},
		},
	});

	const pizza8 = await prisma.product.create({
		data: {
			name: "М'ясна",
			imageUrl: "/assets/images/pizzas/0194d4fd39bb7352bfa5de2219e88b9b.avif",
			categoryId: 1,
			ingredients: {
				connect: _ingredients.slice(10, 30),
			},
		},
	});

	const pizza9 = await prisma.product.create({
		data: {
			name: "Вегетаріанська",
			imageUrl: "/assets/images/pizzas/11ee7d60fda22358ac33c6a44eb093a2.avif",
			categoryId: 1,
			ingredients: {
				connect: _ingredients.slice(15, 35),
			},
		},
	});

	await prisma.productItem.createMany({
		data: [
			// Пицца "Пепероні фреш"
			generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 20 }),
			generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 30 }),
			generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 40 }),

			// Пицца "Сирна"
			generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 20 }),
			generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 30 }),
			generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 40 }),
			generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 20 }),
			generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 30 }),
			generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 40 }),

			// Пицца "Чорізо фреш"
			generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 20 }),
			generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 30 }),
			generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 40 }),

			// Пицца "Маргарита"
			generateProductItem({ productId: pizza4.id, pizzaType: 1, size: 20 }),
			generateProductItem({ productId: pizza4.id, pizzaType: 1, size: 30 }),
			generateProductItem({ productId: pizza4.id, pizzaType: 2, size: 40 }),

			// Пицца "Гавайська"
			generateProductItem({ productId: pizza5.id, pizzaType: 1, size: 20 }),
			generateProductItem({ productId: pizza5.id, pizzaType: 2, size: 30 }),
			generateProductItem({ productId: pizza5.id, pizzaType: 1, size: 40 }),

			// Пицца "Барбекю"
			generateProductItem({ productId: pizza6.id, pizzaType: 2, size: 20 }),
			generateProductItem({ productId: pizza6.id, pizzaType: 1, size: 30 }),
			generateProductItem({ productId: pizza6.id, pizzaType: 2, size: 40 }),

			// Пицца "Чотири сири"
			generateProductItem({ productId: pizza7.id, pizzaType: 1, size: 20 }),
			generateProductItem({ productId: pizza7.id, pizzaType: 1, size: 30 }),
			generateProductItem({ productId: pizza7.id, pizzaType: 2, size: 40 }),

			// Пицца "М'ясна"
			generateProductItem({ productId: pizza8.id, pizzaType: 2, size: 20 }),
			generateProductItem({ productId: pizza8.id, pizzaType: 1, size: 30 }),
			generateProductItem({ productId: pizza8.id, pizzaType: 1, size: 40 }),

			// Пицца "Вегетаріанська"
			generateProductItem({ productId: pizza9.id, pizzaType: 1, size: 20 }),
			generateProductItem({ productId: pizza9.id, pizzaType: 2, size: 30 }),
			generateProductItem({ productId: pizza9.id, pizzaType: 1, size: 40 }),

			// Остальные продукты
			generateProductItem({ productId: 1 }),
			generateProductItem({ productId: 2 }),
			generateProductItem({ productId: 3 }),
			generateProductItem({ productId: 4 }),
			generateProductItem({ productId: 5 }),
			generateProductItem({ productId: 6 }),
			generateProductItem({ productId: 7 }),
			generateProductItem({ productId: 8 }),
			generateProductItem({ productId: 9 }),
			generateProductItem({ productId: 10 }),
			generateProductItem({ productId: 11 }),
			generateProductItem({ productId: 12 }),
			generateProductItem({ productId: 13 }),
			generateProductItem({ productId: 14 }),
			generateProductItem({ productId: 15 }),
			generateProductItem({ productId: 16 }),
			generateProductItem({ productId: 17 }),
		],
	});

	await prisma.cart.createMany({
		data: [
			{
				userId: 1,
				totalAmount: 0,
				token: "11111",
			},
			{
				userId: 2,
				totalAmount: 0,
				token: "222222",
			},
		],
	});

	await prisma.cartItem.create({
		data: {
			productItemId: 1,
			cartId: 1,
			quantity: 2,
			ingredients: {
				connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
			},
		},
	});

	const story1 = await prisma.story.create({
		data: {
			previewImageUrl:
				"https://cdn.inappstory.ru/story/xep/xzh/zmc/cr4gcw0aselwvf628pbmj3j/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3101815496",
		},
	});
	const story2 = await prisma.story.create({
		data: {
			previewImageUrl:
				"https://cdn.inappstory.ru/story/km2/9gf/jrn/sb7ls1yj9fe5bwvuwgym73e/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3074015640",
		},
	});
	const story3 = await prisma.story.create({
		data: {
			previewImageUrl:
				"https://cdn.inappstory.ru/story/quw/acz/zf5/zu37vankpngyccqvgzbohj1/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=1336215020",
		},
	});
	const story4 = await prisma.story.create({
		data: {
			previewImageUrl:
				"https://cdn.inappstory.ru/story/7oc/5nf/ipn/oznceu2ywv82tdlnpwriyrq/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=38903958",
		},
	});
	const story5 = await prisma.story.create({
		data: {
			previewImageUrl:
				"https://cdn.inappstory.ru/story/q0t/flg/0ph/xt67uw7kgqe9bag7spwkkyw/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=2941222737",
		},
	});
	const story6 = await prisma.story.create({
		data: {
			previewImageUrl:
				"https://cdn.inappstory.ru/story/lza/rsp/2gc/xrar8zdspl4saq4uajmso38/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=4207486284",
		},
	});

	await prisma.storyItem.createMany({
		data: [
			{
				storyId: story1.id,
				sourceUrl:
					"https://cdn.inappstory.ru/file/dd/yj/sx/oqx9feuljibke3mknab7ilb35t.webp?k=IgAAAAAAAAAE",
			},
			{
				storyId: story1.id,
				sourceUrl:
					"https://cdn.inappstory.ru/file/jv/sb/fh/io7c5zarojdm7eus0trn7czdet.webp?k=IgAAAAAAAAAE",
			},
			{
				storyId: story1.id,
				sourceUrl:
					"https://cdn.inappstory.ru/file/ts/p9/vq/zktyxdxnjqbzufonxd8ffk44cb.webp?k=IgAAAAAAAAAE",
			},
			{
				storyId: story1.id,
				sourceUrl:
					"https://cdn.inappstory.ru/file/ur/uq/le/9ufzwtpdjeekidqq04alfnxvu2.webp?k=IgAAAAAAAAAE",
			},
			{
				storyId: story1.id,
				sourceUrl:
					"https://cdn.inappstory.ru/file/sy/vl/c7/uyqzmdojadcbw7o0a35ojxlcul.webp?k=IgAAAAAAAAAE",
			},
		],
	});
}

async function down() {
	await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
}

async function main() {
	try {
		await down();
		await up();
	} catch (e) {
		console.error(e);
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
