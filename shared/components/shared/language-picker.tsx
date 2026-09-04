"use client";

import React from "react";
import { useLocaleStore } from "@/shared/store";
import { cn } from "@/shared/lib/utils";

interface Props {
	className?: string;
}

export const LanguagePicker: React.FC<Props> = ({ className }) => {
	const { locale, setLocale } = useLocaleStore();

	return (
		<div className={cn("inline-flex items-center bg-gray-100 p-1 rounded-full border border-gray-200 text-xs font-semibold select-none", className)}>
			<button
				type="button"
				onClick={() => setLocale("uk")}
				className={cn(
					"px-2.5 py-1 rounded-full transition-all duration-200 flex items-center gap-1",
					locale === "uk"
						? "bg-white text-primary shadow-sm font-bold"
						: "text-gray-500 hover:text-gray-900"
				)}
			>
				<span>🇺🇦</span> UA
			</button>
			<button
				type="button"
				onClick={() => setLocale("en")}
				className={cn(
					"px-2.5 py-1 rounded-full transition-all duration-200 flex items-center gap-1",
					locale === "en"
						? "bg-white text-primary shadow-sm font-bold"
						: "text-gray-500 hover:text-gray-900"
				)}
			>
				<span>🇬🇧</span> EN
			</button>
		</div>
	);
};
