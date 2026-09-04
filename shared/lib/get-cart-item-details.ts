import { PizzaSize, PizzaType, mapPizzaTypeUk, mapPizzaTypeEn } from "../constants/pizza";
import { CartStateItem } from "./get-cart-details";
import { getLocalizedName } from "./get-localized-name";

export const getCartItemDetails = (
	ingredients: CartStateItem["ingredients"],
	pizzaType?: PizzaType,
	pizzaSize?: PizzaSize,
	locale: "uk" | "en" = "uk",
): string => {
	const details = [];

	if (pizzaSize && pizzaType) {
		const typeName = locale === "en" ? mapPizzaTypeEn[pizzaType] : mapPizzaTypeUk[pizzaType];
		const unit = locale === "en" ? "cm" : "см";
		details.push(`${typeName} ${pizzaSize} ${unit}`);
	}

	if (ingredients) {
		details.push(
			...ingredients.map((ingredient) =>
				getLocalizedName(ingredient.name, (ingredient as any).nameEn, locale),
			),
		);
	}

	return details.join(", ");
};
