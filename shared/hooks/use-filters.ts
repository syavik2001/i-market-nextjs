import { useSearchParams } from "next/navigation";
import { useSet } from "react-use";
import React from "react";

interface PriceProps {
	priceFrom?: number;
	priceTo?: number;
}

interface QueryFilters extends PriceProps {
	pizzaTypes: string;
	sizes: string;
	ingredients: string;
	sortBy?: string;
}

export interface Filters {
	sizes: Set<string>;
	pizzaTypes: Set<string>;
	selectedIngredients: Set<string>;
	prices: PriceProps;
	sortBy?: string;
}

interface ReturnProps extends Filters {
	setPrices: (name: keyof PriceProps, value: number) => void;
	setPizzaTypes: (value: string) => void;
	setSizes: (value: string) => void;
	setSelectedIngredients: (value: string) => void;
	setSortBy: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
	const searchParams = (useSearchParams() as unknown) as Map<keyof QueryFilters, string>;

	// Используем useRef для сохранения sortBy между рендерами
	const sortByRef = React.useRef<string>(searchParams.get("sortBy") || "alphabet-asc");
	const [sortBy, setSortByState] = React.useState<string>(sortByRef.current);

	const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
		new Set<string>(searchParams.get("ingredients")?.split(",")),
	);

	const [sizes, { toggle: toggleSizes }] = useSet(
		new Set<string>(searchParams.has("sizes") ? searchParams.get("sizes")?.split(",") : []),
	);

	const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
		new Set<string>(
			searchParams.has("pizzaTypes") ? searchParams.get("pizzaTypes")?.split(",") : [],
		),
	);

	const [prices, setPrices] = React.useState<PriceProps>({
		priceFrom: Number(searchParams.get("priceFrom")) || undefined,
		priceTo: Number(searchParams.get("priceTo")) || undefined,
	});

	const updatePrice = (name: keyof PriceProps, value: number) => {
		setPrices((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const updateSortBy = (value: string) => {
		sortByRef.current = value;
		setSortByState(value);
	};

	return React.useMemo(
		() => ({
			sizes,
			pizzaTypes,
			selectedIngredients,
			prices,
			sortBy: sortByRef.current,
			setPrices: updatePrice,
			setPizzaTypes: togglePizzaTypes,
			setSizes: toggleSizes,
			setSelectedIngredients: toggleIngredients,
			setSortBy: updateSortBy,
		}),
		[sizes, pizzaTypes, selectedIngredients, prices, sortBy],
	);
};
