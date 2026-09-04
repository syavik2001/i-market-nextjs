"use client";

import React from "react";
import { SortPopup } from "./sort-popup";
import { Sheet, SheetContent } from "@/shared/components/ui/sheet";
import { Filters } from "@/shared/hooks/use-filters";

import { useLocaleStore } from "@/shared/store";

interface Props {
	className?: string;
	open?: boolean;
	setOpen?: (open: boolean) => void;
	filters: Filters & {
		setSortBy: (value: string) => void;
	};
}

export const SortWrapper: React.FC<Props> = ({ className, open, setOpen, filters }) => {
	const { t } = useLocaleStore();

	return (
		<div className={className}>
			{/* Мобильная версия: только SheetContent, без кнопки */}
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetContent side="left" className="max-w-[340px] w-full p-4 bg-yellow-50/95">
					<div className="font-bold text-lg mb-4 text-left">{t.sort.title}</div>
					<SortPopup filters={filters} isSheet={true} className="items-start text-left" />
				</SheetContent>
			</Sheet>

			{/* Десктопная версия */}
			<div className="hidden lg:block">
				<SortPopup filters={filters} />
			</div>
		</div>
	);
};
