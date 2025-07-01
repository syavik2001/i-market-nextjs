import React from "react";
import { Filters } from "./use-filters";
import qs from "qs";
import { useRouter } from "next/navigation";

export const useQueryFilters = (filters: Filters) => {
	const isMounted = React.useRef(false);
	const router = useRouter();
	const prevFiltersRef = React.useRef<{
		sizes: Set<string>;
		pizzaTypes: Set<string>;
		selectedIngredients: Set<string>;
		prices: any;
	} | null>(null);

	React.useEffect(() => {
		if (isMounted.current) {
			const currentFilters = {
				sizes: filters.sizes,
				pizzaTypes: filters.pizzaTypes,
				selectedIngredients: filters.selectedIngredients,
				prices: filters.prices,
			};

			// Проверяем, изменились ли фильтры (кроме sortBy)
			const prevFilters = prevFiltersRef.current;
			const hasFiltersChanged =
				!prevFilters ||
				JSON.stringify(Array.from(prevFilters.sizes)) !==
					JSON.stringify(Array.from(currentFilters.sizes)) ||
				JSON.stringify(Array.from(prevFilters.pizzaTypes)) !==
					JSON.stringify(Array.from(currentFilters.pizzaTypes)) ||
				JSON.stringify(Array.from(prevFilters.selectedIngredients)) !==
					JSON.stringify(Array.from(currentFilters.selectedIngredients)) ||
				JSON.stringify(prevFilters.prices) !== JSON.stringify(currentFilters.prices);

			// Обновляем URL только если изменились фильтры
			if (hasFiltersChanged) {
				// Получаем текущий sortBy из URL или используем значение из filters
				const currentParams = new URLSearchParams(window.location.search);
				const currentSortBy = currentParams.get("sortBy") || filters.sortBy || "alphabet-asc";

				const params: any = {
					...filters.prices,
					pizzaTypes: Array.from(filters.pizzaTypes),
					sizes: Array.from(filters.sizes),
					ingredients: Array.from(filters.selectedIngredients),
					sortBy: currentSortBy,
				};

				const query = qs.stringify(params, {
					arrayFormat: "comma",
				});

				router.push(`?${query}`, {
					scroll: false,
				});

				prevFiltersRef.current = currentFilters;
			}
		}

		isMounted.current = true;
	}, [filters.sizes, filters.pizzaTypes, filters.selectedIngredients, filters.prices]);

	// Отдельный эффект для обновления sortBy в URL
	React.useEffect(() => {
		if (isMounted.current && filters.sortBy) {
			const currentParams = new URLSearchParams(window.location.search);
			currentParams.set("sortBy", filters.sortBy);

			router.push(`?${currentParams.toString()}`, {
				scroll: false,
			});
		}
	}, [filters.sortBy]);
};
