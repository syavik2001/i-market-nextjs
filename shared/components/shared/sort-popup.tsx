import React from "react";

import { cn } from "@/shared/lib/utils";
import { ArrowUpDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";
import { Filters } from "@/shared/hooks/use-filters";

interface Props {
	className?: string;
	filters: Filters & {
		setSortBy: (value: string) => void;
	};
	isSheet?: boolean;
}

export const SortPopup: React.FC<Props> = ({ className, filters, isSheet }) => {
	const [open, setOpen] = React.useState(false);

	const sortOptions = [
		{ value: "alphabet-asc", label: "За алфавітом (А-Я)" },
		{ value: "alphabet-desc", label: "За алфавітом (Я-А)" },
		{ value: "price-asc", label: "Спочатку дешеві" },
		{ value: "price-desc", label: "Спочатку дорогі" },
	];

	const currentSort =
		sortOptions.find((option) => option.value === filters.sortBy) || sortOptions[0];

	const handleSortChange = (sortValue: string) => {
		filters.setSortBy(sortValue);
		setOpen(false);
	};

	if (isSheet) {
		return (
			<ul className={cn("flex flex-col gap-2", className)}>
				{sortOptions.map((option) => (
					<li
						key={option.value}
						className={cn(
							"hover:bg-secondary hover:text-primary p-2 px-4 cursor-pointer rounded-md text-center text-lg",
							filters.sortBy === option.value && "bg-secondary text-primary font-bold",
						)}
						onClick={() => handleSortChange(option.value)}>
						{option.label}
					</li>
				))}
			</ul>
		);
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<div
					className={cn(
						"inline-flex items-center gap-1 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer",
						className,
					)}>
					<ArrowUpDown className="w-4 h-4" />
					<b>Сортування</b>
					<b className="text-primary">{currentSort.label}</b>
				</div>
			</PopoverTrigger>
			<PopoverContent className="w-[240px]">
				<ul>
					{sortOptions.map((option) => (
						<li
							key={option.value}
							className={cn(
								"hover:bg-secondary hover:text-primary p-2 px-4 cursor-pointer rounded-md",
								filters.sortBy === option.value && "bg-secondary text-primary",
							)}
							onClick={() => handleSortChange(option.value)}>
							{option.label}
						</li>
					))}
				</ul>
			</PopoverContent>
		</Popover>
	);
};
