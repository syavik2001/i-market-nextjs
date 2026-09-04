"use client";

import { cn } from "@/shared/lib/utils";
import { useCategoryStore } from "@/shared/store/category";
import { Category } from "@prisma/client";
import React from "react";
import { ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";
import { useLocaleStore } from "@/shared/store";
import { getLocalizedName } from "@/shared/lib/get-localized-name";

interface Props {
	items: Category[];
	className?: string;
}

export const CategoriesDropdown: React.FC<Props> = ({ items, className }) => {
	const categoryActiveId = useCategoryStore((state) => state.activeId);
	const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
	const { locale } = useLocaleStore();
	const [open, setOpen] = React.useState(false);

	// Устанавливаем активную категорию при загрузке страницы на основе hash
	React.useEffect(() => {
		if (typeof window !== "undefined") {
			const hash = window.location.hash.slice(1); // Убираем #
			if (hash) {
				const category = items.find((item) => item.name === hash || item.nameEn === hash);
				if (category) {
					setActiveCategoryId(category.id);
				}
			}
		}
	}, [items, setActiveCategoryId]);

	const handleCategoryClick = (
		e: React.MouseEvent<HTMLDivElement>,
		categoryId: number,
		categoryName: string,
	) => {
		e.preventDefault();

		// Устанавливаем активную категорию
		setActiveCategoryId(categoryId);
		setOpen(false);

		// Кастомный скролл с учётом высоты TopBar
		const targetElement = document.getElementById(categoryName);
		if (targetElement) {
			const rect = targetElement.getBoundingClientRect();
			const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			// Определяем отступ: 180px для мобильных, 140px для lg+
			const offset = window.innerWidth < 1023 ? 180 : 140;
			const top = rect.top + scrollTop - offset;
			window.scrollTo({ top, behavior: "smooth" });
		}
	};

	const activeCategory = items.find((item) => item.id === categoryActiveId);
	const activeCategoryDisplayName =
		activeCategory && getLocalizedName(activeCategory.name, activeCategory.nameEn, locale);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<div
					className={cn(
						"inline-flex items-center gap-2 bg-gray-50 px-4 h-[52px] rounded-2xl cursor-pointer hover:bg-gray-100 transition-colors",
						className,
					)}>
					<span className="font-bold">{locale === "en" ? "Categories" : "Категорії"}</span>
					{activeCategory && (
						<span className="text-primary font-bold">• {activeCategoryDisplayName}</span>
					)}
					<ChevronDown className="w-4 h-4" />
				</div>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-2">
				<div className="flex flex-col gap-1">
					{items.map((item, index) => {
						const displayName = getLocalizedName(item.name, item.nameEn, locale);
						return (
							<div
								key={index}
								className={cn(
									"flex items-center font-bold h-10 rounded-xl px-4 cursor-pointer transition-all duration-200",
									categoryActiveId === item.id && "bg-yellow-50 text-primary",
									categoryActiveId !== item.id && "hover:bg-gray-50",
								)}
								onClick={(e) => handleCategoryClick(e, item.id, item.name)}>
								{displayName}
							</div>
						);
					})}
				</div>
			</PopoverContent>
		</Popover>
	);
};
