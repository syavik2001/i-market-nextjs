"use client";

import { cn } from "@/shared/lib/utils";
import { useCategoryStore } from "@/shared/store/category";
import { Category } from "@prisma/client";
import React from "react";

interface Props {
	items: Category[];
	className?: string;
}

export const Categories: React.FC<Props> = ({ items, className }) => {
	const categoryActiveId = useCategoryStore((state) => state.activeId);
	const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);

	// Устанавливаем активную категорию при загрузке страницы на основе hash
	React.useEffect(() => {
		if (typeof window !== "undefined") {
			const hash = window.location.hash.slice(1); // Убираем #
			if (hash) {
				const category = items.find((item) => item.name === hash);
				if (category) {
					setActiveCategoryId(category.id);
				}
			}
		}
	}, [items, setActiveCategoryId]);

	const handleCategoryClick = (
		e: React.MouseEvent<HTMLAnchorElement>,
		categoryId: number,
		categoryName: string,
	) => {
		e.preventDefault();

		// Устанавливаем активную категорию
		setActiveCategoryId(categoryId);

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

	return (
		<div
			className={cn(
				"inline-flex gap-1 bg-gray-50 p-1 rounded-2xl overflow-x-auto scrollbar-hide max-w-full pt-2 pb-2 min-h-[56px]",
				className,
			)}>
			{items.map(({ name, id }, index) => (
				<a
					className={cn(
						"flex items-center font-bold h-11 rounded-2xl px-5 cursor-pointer transition-all duration-200",
						categoryActiveId === id && "bg-white shadow-md shadow-gray-200 text-primary",
						categoryActiveId !== id && "hover:bg-gray-100",
					)}
					href={`#${name}`}
					onClick={(e) => handleCategoryClick(e, id, name)}
					key={index}>
					{name}
				</a>
			))}
		</div>
	);
};
