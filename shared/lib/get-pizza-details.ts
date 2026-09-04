import { calcTotalPizzaPrice } from "./calc-total-pizza-price";
import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaSize, PizzaType, mapPizzaTypeUk, mapPizzaTypeEn } from "../constants/pizza";

export const getPizzaDetails = (
	type: PizzaType,
	size: PizzaSize,
	items: ProductItem[],
	ingredients: Ingredient[],
	selectedIngredients: Set<number>,
	locale: "uk" | "en" = "uk",
) => {
	const totalPrice = calcTotalPizzaPrice(type, size, items, ingredients, selectedIngredients);
	const typeName = locale === "en" ? mapPizzaTypeEn[type] : mapPizzaTypeUk[type];
	const unit = locale === "en" ? "cm" : "см";
	const doughWord = locale === "en" ? "dough" : "тісто";
	const textDetaills = `${size} ${unit}, ${typeName} ${doughWord}`;

	return { totalPrice, textDetaills };
};
