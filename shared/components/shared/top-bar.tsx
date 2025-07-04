"use client";

import { cn } from "@/shared/lib/utils";
import React, { useState } from "react";
import { Container } from "./container";
import { Categories } from "./categories";
import { CategoriesDropdown } from "./categories-dropdown";
import { Category } from "@prisma/client";
import { useFiltersContext } from "@/shared/hooks/use-filters-context";
import { Button } from "@/shared/components/ui/button";
import { Sheet, SheetTrigger } from "@/shared/components/ui/sheet";
import { FiltersWrapper } from "./filters-wrapper";
import { SortWrapper } from "./sort-wrapper";

interface Props {
	categories: Category[];
	className?: string;
}

export const TopBar: React.FC<Props> = ({ categories, className }) => {
	const filters = useFiltersContext();
	const [openFilters, setOpenFilters] = useState(false);
	const [openSort, setOpenSort] = useState(false);

	return (
		<div
			className={cn(
				"sticky top-0 bg-white py-5 max-sm:py-2 shadow-lg shadow-black/5 z-10",
				className,
			)}>
			<Container>
				<div className="flex items-center justify-center lg:justify-between overflow-x-auto gap-2 sm:gap-4 scrollbar-hide">
					{/* Категории: выпадающее меню на <640px, обычные на >=640px */}
					<div className="hidden sm:block">
						<Categories items={categories} />
					</div>
					<div className="block sm:hidden">
						<CategoriesDropdown items={categories} />
					</div>
					{/* Сортировка только на lg+ */}
					<div className="hidden lg:flex items-center gap-2">
						<SortWrapper filters={filters} />
					</div>
				</div>
				{/* Сортировка и фильтры для <lg */}
				<div className="flex lg:hidden items-center gap-2 mt-4 max-sm:mt-1 justify-center">
					<Sheet open={openSort} onOpenChange={setOpenSort}>
						<SheetTrigger asChild>
							<Button variant="outline">Сортування</Button>
						</SheetTrigger>
					</Sheet>
					<Sheet open={openFilters} onOpenChange={setOpenFilters}>
						<SheetTrigger asChild>
							<Button variant="outline">Фільтри</Button>
						</SheetTrigger>
					</Sheet>
				</div>
				<div className="lg:hidden">
					<FiltersWrapper open={openFilters} setOpen={setOpenFilters} />
					<SortWrapper open={openSort} setOpen={setOpenSort} filters={filters} />
				</div>
			</Container>
		</div>
	);
};
