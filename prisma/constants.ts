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
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/99f5cb91225b4875bd06a26d2e842106.png",
	},
	{
		name: "Вершкова моцарела",
		price: 79,
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/cdea869ef287426386ed634e6099a5ba.png",
	},
	{
		name: "Сир чеддер і пармезан",
		price: 79,
		imageUrl: "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA69C1FE796",
	},
	{
		name: "Гострий перець халапеньйо",
		price: 59,
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/11ee95b6bfdf98fb88a113db92d7b3df.png",
	},
	{
		name: "Ніжний курча",
		price: 79,
		imageUrl: "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA5B328D35A",
	},
	{
		name: "Печериці",
		price: 59,
		imageUrl: "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA67259A324",
	},
	{
		name: "Шинка",
		price: 79,
		imageUrl: "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA61B9A8D61",
	},
	{
		name: "Пікантна пепероні",
		price: 79,
		imageUrl: "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA6258199C3",
	},
	{
		name: "Гостра чорізо",
		price: 79,
		imageUrl: "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA62D5D6027",
	},
	{
		name: "Мариновані огірки",
		price: 59,
		imageUrl: "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9EA89958D782B",
	},
	{
		name: "Свіжі томати",
		price: 59,
		imageUrl: "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA7AC1A1D67",
	},
	{
		name: "Червона цибуля",
		price: 59,
		imageUrl: "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA60AE6464C",
	},
	{
		name: "Соковиті ананаси",
		price: 59,
		imageUrl: "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9AFA6795BA2A0",
	},
	{
		name: "Італійські трави",
		price: 39,
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/370dac9ed21e4bffaf9bc2618d258734.png",
	},
	{
		name: "Солодкий перець",
		price: 59,
		imageUrl: "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA63F774C1B",
	},
	{
		name: "Кубики бринзи",
		price: 79,
		imageUrl: "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA6B0FFC349",
	},
	{
		name: "Мітболи",
		price: 79,
		imageUrl:
			"https://cdn.dodostatic.net/static/Img/Ingredients/b2f3a5d5afe44516a93cfc0d2ee60088.png",
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
