export const categories = [
	{
		name: "Піци",
		nameEn: "Pizzas",
	},
	{
		name: "Сніданок",
		nameEn: "Breakfast",
	},
	{
		name: "Закуски",
		nameEn: "Snacks",
	},
	{
		name: "Коктейлі",
		nameEn: "Cocktails",
	},
	{
		name: "Напої",
		nameEn: "Drinks",
	},
];

export const _ingredients = [
	{
		name: "Сирний бортик",
		nameEn: "Cheese crust",
		price: 179,
		imageUrl: "/assets/images/ingridients/Сирний бортик.png",
	},
	{
		name: "Вершкова моцарела",
		nameEn: "Creamy mozzarella",
		price: 79,
		imageUrl: "/assets/images/ingridients/Вершкова моцарела.png",
	},
	{
		name: "Сир чеддер і пармезан",
		nameEn: "Cheddar and parmesan cheese",
		price: 79,
		imageUrl: "/assets/images/ingridients/Сир чеддер і пармезан.png",
	},
	{
		name: "Гострий перець халапеньйо",
		nameEn: "Jalapeño pepper",
		price: 59,
		imageUrl: "/assets/images/ingridients/Гострий перець халапеньйо.png",
	},
	{
		name: "Ніжний курча",
		nameEn: "Tender chicken",
		price: 79,
		imageUrl: "/assets/images/ingridients/Ніжний курча.png",
	},
	{
		name: "Печериці",
		nameEn: "Mushrooms",
		price: 59,
		imageUrl: "/assets/images/ingridients/Печериці.png",
	},
	{
		name: "Шинка",
		nameEn: "Ham",
		price: 79,
		imageUrl: "/assets/images/ingridients/Шинка.png",
	},
	{
		name: "Пікантна пепероні",
		nameEn: "Spicy pepperoni",
		price: 79,
		imageUrl: "/assets/images/ingridients/Пікантна пепероні.png",
	},
	{
		name: "Гостра чорізо",
		nameEn: "Spicy chorizo",
		price: 79,
		imageUrl: "/assets/images/ingridients/Гостра чорізо.png",
	},
	{
		name: "Мариновані огірки",
		nameEn: "Pickled cucumbers",
		price: 59,
		imageUrl: "/assets/images/ingridients/Мариновані огірки.png",
	},
	{
		name: "Свіжі томати",
		nameEn: "Fresh tomatoes",
		price: 59,
		imageUrl: "/assets/images/ingridients/Свіжі томати.png",
	},
	{
		name: "Червона цибуля",
		nameEn: "Red onion",
		price: 59,
		imageUrl: "/assets/images/ingridients/Червона цибуля.png",
	},
	{
		name: "Соковиті ананаси",
		nameEn: "Juicy pineapples",
		price: 59,
		imageUrl: "/assets/images/ingridients/Соковиті ананаси.png",
	},
	{
		name: "Італійські трави",
		nameEn: "Italian herbs",
		price: 39,
		imageUrl: "/assets/images/ingridients/Італійські трави.png",
	},
	{
		name: "Солодкий перець",
		nameEn: "Sweet pepper",
		price: 59,
		imageUrl: "/assets/images/ingridients/Солодкий перець.png",
	},
	{
		name: "Кубики бринзи",
		nameEn: "Brynza cheese cubes",
		price: 79,
		imageUrl: "/assets/images/ingridients/Кубики бринзи.png",
	},
	{
		name: "Мітболи",
		nameEn: "Meatballs",
		price: 79,
		imageUrl: "/assets/images/ingridients/Мітболи.png",
	},
].map((obj, index) => ({ id: index + 1, ...obj }));

export const products = [
	// Сніданок (breakfast)
	{
		name: "Омлет з шинкою та грибами",
		nameEn: "Ham and Mushroom Omelette",
		imageUrl: "/assets/images/breakfast/shinka-omlet.avif",
		categoryId: 2,
	},
	{
		name: "Омлет з пепероні",
		nameEn: "Pepperoni Omelette",
		imageUrl: "/assets/images/breakfast/paper-omlet.avif",
		categoryId: 2,
	},
	{
		name: "Кава Латте",
		nameEn: "Coffee Latte",
		imageUrl: "/assets/images/breakfast/kava-latte.avif",
		categoryId: 2,
	},

	// Закуски (zakuski)
	{
		name: "Денвіч шинка і сир",
		nameEn: "Ham and Cheese Sandwich",
		imageUrl: "/assets/images/zakuski/denvich-shinka.avif",
		categoryId: 3,
	},
	{
		name: "Курячі нагетси",
		nameEn: "Chicken Nuggets",
		imageUrl: "/assets/images/zakuski/chikken-nagets.avif",
		categoryId: 3,
	},
	{
		name: "Картопля з печі з соусом 🌱",
		nameEn: "Oven Baked Potatoes with Dip 🌱",
		imageUrl: "/assets/images/zakuski/potato-with-souse.avif",
		categoryId: 3,
	},
	{
		name: "Додстер",
		nameEn: "Dodster Roll",
		imageUrl: "/assets/images/zakuski/dodster.avif",
		categoryId: 3,
	},
	{
		name: "Гострий Додстер 🌶️🌶️",
		nameEn: "Spicy Dodster Roll 🌶️🌶️",
		imageUrl: "/assets/images/zakuski/dodster-spicy.avif",
		categoryId: 3,
	},

	// Коктейлі (coctails)
	{
		name: "Банановий молочний коктейль",
		nameEn: "Banana Milkshake",
		imageUrl: "/assets/images/coctails/banana-milk.avif",
		categoryId: 4,
	},
	{
		name: "Карамельне яблуко молочний коктейль",
		nameEn: "Caramel Apple Milkshake",
		imageUrl: "/assets/images/coctails/apple-milk.avif",
		categoryId: 4,
	},
	{
		name: "Молочний коктейль з печивом Орео",
		nameEn: "Oreo Milkshake",
		imageUrl: "/assets/images/coctails/oreo-milk.avif",
		categoryId: 4,
	},
	{
		name: "Класичний молочний коктейль 👶",
		nameEn: "Classic Milkshake 👶",
		imageUrl: "/assets/images/coctails/classik-milk.avif",
		categoryId: 4,
	},

	// Напої (drinks)
	{
		name: "Ірландський Капучино",
		nameEn: "Irish Cappuccino",
		imageUrl: "/assets/images/drinks/irish-capuchino.avif",
		categoryId: 5,
	},
	{
		name: "Кава Карамельний капучино",
		nameEn: "Caramel Cappuccino",
		imageUrl: "/assets/images/drinks/caramel-capuchino.avif",
		categoryId: 5,
	},
	{
		name: "Кава Кокосовий латте",
		nameEn: "Coconut Latte",
		imageUrl: "/assets/images/drinks/coconut-latte.avif",
		categoryId: 5,
	},
	{
		name: "Кава Американо",
		nameEn: "Americano Coffee",
		imageUrl: "/assets/images/drinks/americano.avif",
		categoryId: 5,
	},
	{
		name: "Кава Латте",
		nameEn: "Latte Coffee",
		imageUrl: "/assets/images/drinks/latte.avif",
		categoryId: 5,
	},
];
