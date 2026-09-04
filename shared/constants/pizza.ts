export const mapPizzaSizeUk = {
	20: "Мала",
	30: "Середня",
	40: "Велика",
} as const;

export const mapPizzaSizeEn = {
	20: "Small",
	30: "Medium",
	40: "Large",
} as const;

export const mapPizzaSize = mapPizzaSizeUk;

export const mapPizzaTypeUk = {
	1: "традиційне",
	2: "тонке",
} as const;

export const mapPizzaTypeEn = {
	1: "traditional",
	2: "thin",
} as const;

export const mapPizzaType = mapPizzaTypeUk;

export const getPizzaSizes = (locale: "uk" | "en" = "uk") => {
	const map = locale === "en" ? mapPizzaSizeEn : mapPizzaSizeUk;
	return Object.entries(map).map(([value, name]) => ({
		name: locale === "en" ? `${value} cm` : `${value} см`,
		value,
	}));
};

export const getPizzaTypes = (locale: "uk" | "en" = "uk") => {
	const map = locale === "en" ? mapPizzaTypeEn : mapPizzaTypeUk;
	return Object.entries(map).map(([value, name]) => ({
		name,
		value,
	}));
};

export const pizzaSizes = Object.entries(mapPizzaSizeUk).map(([value, name]) => ({
	name: `${value} см`,
	value,
}));

export const pizzaTypes = Object.entries(mapPizzaTypeUk).map(([value, name]) => ({
	name,
	value,
}));

export type PizzaSize = keyof typeof mapPizzaSizeUk;
export type PizzaType = keyof typeof mapPizzaTypeUk;
