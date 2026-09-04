const translationMap: Record<string, string> = {
	// Categories
	"Піци": "Pizzas",
	"Сніданок": "Breakfast",
	"Закуски": "Snacks",
	"Коктейлі": "Cocktails",
	"Напої": "Drinks",

	// Pizzas
	"Пепероні фреш": "Pepperoni Fresh",
	"Сирна": "Cheese Pizza",
	"Чорізо фреш": "Chorizo Fresh",
	"Маргарита": "Margherita",
	"Гавайська": "Hawaiian",
	"Барбекю": "BBQ",
	"Чотири сири": "Four Cheeses",
	"М'ясна": "Meat Supreme",
	"Вегетаріанська": "Vegetarian",

	// Breakfast, Snacks, Drinks, Cocktails
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

	// Ingredients
	"Сирний бортик": "Cheese crust",
	"Вершкова моцарела": "Creamy mozzarella",
	"Сир чеддер і пармезан": "Cheddar & parmesan cheese",
	"Гострий перець халапеньйо": "Jalapeño pepper",
	"Ніжний курча": "Tender chicken",
	"Печериці": "Mushrooms",
	"Шинка": "Ham",
	"Пікантна пепероні": "Spicy pepperoni",
	"Гостра чорізо": "Spicy chorizo",
	"Мариновані огірки": "Pickled cucumbers",
	"Свіжі томати": "Fresh tomatoes",
	"Червона цибуля": "Red onion",
	"Соковиті ананаси": "Juicy pineapples",
	"Італійські трави": "Italian herbs",
	"Солодкий перець": "Sweet pepper",
	"Кубики бринзи": "Brynza cheese cubes",
	"Мітболи": "Meatballs",
};

/**
 * Возвращает локализованное имя элемента с резервным словарем на случай,
 * если в базе данных nameEn === null
 */
export const getLocalizedName = (
	name: string,
	nameEn?: string | null,
	locale: "uk" | "en" = "uk",
): string => {
	if (locale === "en") {
		return nameEn || translationMap[name] || name;
	}
	return name;
};
