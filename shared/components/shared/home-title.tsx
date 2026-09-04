"use client";

import React from "react";
import { Title } from "./title";
import { useLocaleStore } from "@/shared/store";

interface Props {
	className?: string;
}

export const HomeTitle: React.FC<Props> = ({ className }) => {
	const { locale } = useLocaleStore();

	return (
		<Title
			text={locale === "en" ? "All Products" : "Всі піци"}
			size="lg"
			className={className || "font-extrabold"}
		/>
	);
};
