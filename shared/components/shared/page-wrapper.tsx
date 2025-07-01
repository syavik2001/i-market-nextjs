"use client";

import React from "react";
import { FiltersProvider } from "@/shared/hooks/use-filters-context";

interface CategoryWithProducts {
	id: number;
	name: string;
	createdAt: Date;
	updatedAt: Date;
	products: any[];
}

interface Props {
	categories: CategoryWithProducts[];
	children: React.ReactNode;
}

export const PageWrapper: React.FC<Props> = ({ categories, children }) => {
	return <FiltersProvider>{children}</FiltersProvider>;
};
