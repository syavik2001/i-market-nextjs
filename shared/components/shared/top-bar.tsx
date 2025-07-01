"use client";

import { cn } from "@/shared/lib/utils";
import React from "react";
import { Container } from "./container";
import { Categories } from "./categories";
import { SortPopup } from "./sort-popup";
import { Category } from "@prisma/client";
import { useFiltersContext } from "@/shared/hooks/use-filters-context";

interface Props {
	categories: Category[];
	className?: string;
}

export const TopBar: React.FC<Props> = ({ categories, className }) => {
	const filters = useFiltersContext();

	return (
		<div className={cn("sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10", className)}>
			<Container className="flex items-center justify-between ">
				<Categories items={categories} />
				<SortPopup filters={filters} />
			</Container>
		</div>
	);
};
