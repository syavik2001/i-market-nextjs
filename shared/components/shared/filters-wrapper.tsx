"use client";

import React from "react";
import { FiltersProvider } from "@/shared/hooks/use-filters-context";
import { Filters } from "./filters";

interface Props {
	className?: string;
}

export const FiltersWrapper: React.FC<Props> = ({ className }) => {
	return (
		<FiltersProvider>
			<Filters className={className} />
		</FiltersProvider>
	);
};
