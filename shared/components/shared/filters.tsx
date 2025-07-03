"use client";

import React from "react";
import { Title } from "./title";
import { Input } from "../ui";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { useIngredients } from "@/shared/hooks";
import { useFiltersContext } from "@/shared/hooks/use-filters-context";

interface Props {
	className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
	const filters = useFiltersContext();
	const { ingredients, loading } = useIngredients();

	const items = ingredients.map((item) => ({ value: String(item.id), text: item.name }));

	const updatePrices = (prices: number[]) => {
		filters.setPrices("priceFrom", prices[0]);
		filters.setPrices("priceTo", prices[1]);
	};

	return (
		<div className={className}>
			<Title text="Фільтрація" size="sm" className="mb-5 font-bold" />

			{/* Верхние чекбоксы */}
			<CheckboxFiltersGroup
				title="Тип тіста"
				name="pizzaTypes"
				className="mb-5"
				onClickCheckbox={filters.setPizzaTypes}
				selected={filters.pizzaTypes}
				items={[
					{ text: "Тонке", value: "1" },
					{ text: "Традиційне", value: "2" },
				]}
			/>

			<CheckboxFiltersGroup
				title="Розміри"
				name="sizes"
				className="mb-5"
				onClickCheckbox={filters.setSizes}
				selected={filters.sizes}
				items={[
					{ text: `20 см`, value: "20" },
					{ text: `30 см`, value: "30" },
					{ text: `40 см`, value: "40" },
				]}
			/>

			{/* Фильтр цен */}
			<div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
				<p className="font-bold mb-3">Ціна від і до:</p>
				<div className="flex gap-3 mb-5">
					<Input
						type="number"
						placeholder="0"
						min={0}
						max={1000}
						value={String(filters.prices.priceFrom)}
						onChange={(e) => filters.setPrices("priceFrom", Number(e.target.value))}
					/>
					<Input
						type="number"
						min={100}
						max={1000}
						placeholder="1000"
						value={String(filters.prices.priceTo)}
						onChange={(e) => filters.setPrices("priceTo", Number(e.target.value))}
					/>
				</div>
				<div className="max-w-[250px] w-full">
					<RangeSlider
						min={0}
						max={1000}
						step={10}
						value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 1000]}
						onValueChange={updatePrices}
					/>
				</div>
			</div>

			<CheckboxFiltersGroup
				title="Інгредієнти"
				name="ingredients"
				className="mt-5"
				limit={6}
				defaultItems={items.slice(0, 6)}
				items={items}
				loading={loading}
				onClickCheckbox={filters.setSelectedIngredients}
				selected={filters.selectedIngredients}
			/>
		</div>
	);
};
