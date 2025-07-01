"use client";

import React, { createContext, useContext } from "react";
import { useFilters, Filters } from "./use-filters";
import { useQueryFilters } from "./use-query-filters";

interface FiltersContextType extends Filters {
	setSortBy: (value: string) => void;
	setPrices: (name: keyof { priceFrom?: number; priceTo?: number }, value: number) => void;
	setPizzaTypes: (value: string) => void;
	setSizes: (value: string) => void;
	setSelectedIngredients: (value: string) => void;
}

const FiltersContext = createContext<FiltersContextType | null>(null);

export const FiltersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const filters = useFilters();

	// Используем useQueryFilters в провайдере
	useQueryFilters(filters);

	return <FiltersContext.Provider value={filters}>{children}</FiltersContext.Provider>;
};

export const useFiltersContext = (): FiltersContextType => {
	const context = useContext(FiltersContext);
	if (!context) {
		throw new Error("useFiltersContext must be used within a FiltersProvider");
	}
	return context;
};
