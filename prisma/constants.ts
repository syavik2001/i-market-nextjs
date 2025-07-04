export const categories = [
	{
		name: "Піци",
	},
	{
		name: "Сніданок",
	},
	{
		name: "Закуски",
	},
	{
		name: "Коктейлі",
	},
	{
		name: "Напої",
	},
];

export const _ingredients = [
	{
		name: "Сирний бортик",
		price: 179,
		imageUrl: "/assets/images/ingridients/Сирний бортик.png",
	},
	{
		name: "Вершкова моцарела",
		price: 79,
		imageUrl: "/assets/images/ingridients/Вершкова моцарела.png",
	},
	{
		name: "Сир чеддер і пармезан",
		price: 79,
		imageUrl: "/assets/images/ingridients/Сир чеддер і пармезан.png",
	},
	{
		name: "Гострий перець халапеньйо",
		price: 59,
		imageUrl: "/assets/images/ingridients/Гострий перець халапеньйо.png",
	},
	{
		name: "Ніжний курча",
		price: 79,
		imageUrl: "/assets/images/ingridients/Ніжний курча.png",
	},
	{
		name: "Печериці",
		price: 59,
		imageUrl: "/assets/images/ingridients/Печериці.png",
	},
	{
		name: "Шинка",
		price: 79,
		imageUrl: "/assets/images/ingridients/Шинка.png",
	},
	{
		name: "Пікантна пепероні",
		price: 79,
		imageUrl: "/assets/images/ingridients/Пікантна пепероні.png",
	},
	{
		name: "Гостра чорізо",
		price: 79,
		imageUrl: "/assets/images/ingridients/Гостра чорізо.png",
	},
	{
		name: "Мариновані огірки",
		price: 59,
		imageUrl: "/assets/images/ingridients/Мариновані огірки.png",
	},
	{
		name: "Свіжі томати",
		price: 59,
		imageUrl: "/assets/images/ingridients/Свіжі томати.png",
	},
	{
		name: "Червона цибуля",
		price: 59,
		imageUrl: "/assets/images/ingridients/Червона цибуля.png",
	},
	{
		name: "Соковиті ананаси",
		price: 59,
		imageUrl: "/assets/images/ingridients/Соковиті ананаси.png",
	},
	{
		name: "Італійські трави",
		price: 39,
		imageUrl: "/assets/images/ingridients/Італійські трави.png",
	},
	{
		name: "Солодкий перець",
		price: 59,
		imageUrl: "/assets/images/ingridients/Солодкий перець.png",
	},
	{
		name: "Кубики бринзи",
		price: 79,
		imageUrl: "/assets/images/ingridients/Кубики бринзи.png",
	},
	{
		name: "Мітболи",
		price: 79,
		imageUrl: "/assets/images/ingridients/Мітболи.png",
	},
].map((obj, index) => ({ id: index + 1, ...obj }));

export const products = [
	// Сніданок (breakfast)
	{
		name: "Омлет з шинкою та грибами",
		imageUrl: "/assets/images/breakfast/shinka-omlet.avif",
		categoryId: 2,
	},
	{
		name: "Омлет з пепероні",
		imageUrl: "/assets/images/breakfast/paper-omlet.avif",
		categoryId: 2,
	},
	{
		name: "Кава Латте",
		imageUrl: "/assets/images/breakfast/kava-latte.avif",
		categoryId: 2,
	},

	// Закуски (zakuski)
	{
		name: "Денвіч шинка і сир",
		imageUrl: "/assets/images/zakuski/denvich-shinka.avif",
		categoryId: 3,
	},
	{
		name: "Курячі нагетси",
		imageUrl: "/assets/images/zakuski/chikken-nagets.avif",
		categoryId: 3,
	},
	{
		name: "Картопля з печі з соусом 🌱",
		imageUrl: "/assets/images/zakuski/potato-with-souse.avif",
		categoryId: 3,
	},
	{
		name: "Додстер",
		imageUrl: "/assets/images/zakuski/dodster.avif",
		categoryId: 3,
	},
	{
		name: "Гострий Додстер 🌶️🌶️",
		imageUrl: "/assets/images/zakuski/dodster-spicy.avif",
		categoryId: 3,
	},

	// Коктейлі (coctails)
	{
		name: "Банановий молочний коктейль",
		imageUrl: "/assets/images/coctails/banana-milk.avif",
		categoryId: 4,
	},
	{
		name: "Карамельне яблуко молочний коктейль",
		imageUrl: "/assets/images/coctails/apple-milk.avif",
		categoryId: 4,
	},
	{
		name: "Молочний коктейль з печивом Орео",
		imageUrl: "/assets/images/coctails/oreo-milk.avif",
		categoryId: 4,
	},
	{
		name: "Класичний молочний коктейль 👶",
		imageUrl: "/assets/images/coctails/classik-milk.avif",
		categoryId: 4,
	},

	// Напої (drinks)
	{
		name: "Ірландський Капучино",
		imageUrl: "/assets/images/drinks/irish-capuchino.avif",
		categoryId: 5,
	},
	{
		name: "Кава Карамельний капучино",
		imageUrl: "/assets/images/drinks/caramel-capuchino.avif",
		categoryId: 5,
	},
	{
		name: "Кава Кокосовий латте",
		imageUrl: "/assets/images/drinks/coconut-latte.avif",
		categoryId: 5,
	},
	{
		name: "Кава Американо",
		imageUrl: "/assets/images/drinks/americano.avif",
		categoryId: 5,
	},
	{
		name: "Кава Латте",
		imageUrl: "/assets/images/drinks/latte.avif",
		categoryId: 5,
	},
];
