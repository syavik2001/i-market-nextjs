"use client";

import React, { useState } from "react";
import { FiltersProvider } from "@/shared/hooks/use-filters-context";
import { Filters } from "./filters";
import { Sheet, SheetContent } from "@/shared/components/ui/sheet";

interface Props {
	className?: string;
	open?: boolean;
	setOpen?: (open: boolean) => void;
}

export const FiltersWrapper: React.FC<Props> = ({ className, open, setOpen }) => {
	return (
		<div className={className}>
			{/* Мобильная версия: только SheetContent, без кнопки */}
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetContent
					side="left"
					className="max-w-[90vw] w-[340px] p-4 bg-yellow-50/95 max-h-[100vh] h-full overflow-y-auto">
					<FiltersProvider>
						<Filters />
					</FiltersProvider>
				</SheetContent>
			</Sheet>

			{/* Десктопная версия */}
			<div className="hidden lg:block">
				<FiltersProvider>
					<Filters />
				</FiltersProvider>
			</div>
		</div>
	);
};
