"use client";

import React from "react";
import { Button } from "../ui";
import { CountButton } from "./count-button";
import { IngredientItem } from "./ingredient-item";
import { Ingredient, ProductItem } from "@prisma/client";
import { usePizzaOptions } from "@/shared/hooks/use-pizza-options";
import { calcTotalPizzaPrice } from "@/shared/lib/calc-total-pizza-price";
import { useCart } from "@/shared/hooks/use-cart";
import { cn } from "@/shared/lib/utils";
import { Title } from "./title";
import { GroupVariants } from "./group-variants";
import { PizzaSize, PizzaType, pizzaTypes } from "@/shared/constants/pizza";
import { getPizzaDetails } from "@/shared/lib/get-pizza-details";
import { PizzaImage } from "./pizza-image";

interface Props {
	imageUrl: string;
	name: string;
	ingredients: Ingredient[];
	items: ProductItem[];
	onSubmit: (productItemId: number, ingredients: number[], quantity: number) => void;
	loading?: boolean;
	className?: string;
}

/**
 * Форма выбора ПИЦЦЫ
 */
export const ChoosePizzaForm: React.FC<Props> = ({
	name,
	items,
	imageUrl,
	ingredients,
	onSubmit,
	loading,
	className,
}) => {
	const {
		size,
		type,
		selectedIngredients,
		availableSizes,
		currentItemId,
		setSize,
		setType,
		addIngredient,
	} = usePizzaOptions(items);

	const { totalPrice, textDetaills } = getPizzaDetails(
		type,
		size,
		items,
		ingredients,
		selectedIngredients,
	);

	const [quantity, setQuantity] = React.useState(1);

	const handleClickAdd = () => {
		if (currentItemId) {
			onSubmit(currentItemId, Array.from(selectedIngredients), quantity);
		}
	};

	const handleQuantityChange = (type: "plus" | "minus") => {
		if (type === "plus") {
			setQuantity((prev) => prev + 1);
		} else if (type === "minus" && quantity > 1) {
			setQuantity((prev) => prev - 1);
		}
	};

	const finalPrice = totalPrice * quantity;

	return (
		<div className={cn(className, "flex flex-1")}>
			<PizzaImage imageUrl={imageUrl} size={size} />

			<div className="w-[490px] bg-[#f7f6f5] p-7">
				<Title text={name} size="md" className="font-extrabold mb-1" />

				<p className="text-gray-400">{textDetaills}</p>

				<div className="flex flex-col gap-4 mt-5">
					<GroupVariants
						items={availableSizes}
						value={String(size)}
						onClick={(value: string) => setSize(Number(value) as PizzaSize)}
					/>

					<GroupVariants
						items={pizzaTypes}
						value={String(type)}
						onClick={(value: string) => setType(Number(value) as PizzaType)}
					/>
				</div>

				<div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
					<div className="grid grid-cols-3 gap-3">
						{ingredients.map((ingredient) => (
							<IngredientItem
								key={ingredient.id}
								name={ingredient.name}
								price={ingredient.price}
								imageUrl={ingredient.imageUrl}
								onClick={() => addIngredient(ingredient.id)}
								active={selectedIngredients.has(ingredient.id)}
							/>
						))}
					</div>
				</div>

				<div className="mb-6">
					<h4 className="font-bold mb-3">Кількість</h4>
					<CountButton value={quantity} onClick={handleQuantityChange} />
				</div>

				<Button
					loading={loading}
					onClick={handleClickAdd}
					className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
					Додати до кошика за {finalPrice} грн
				</Button>
			</div>
		</div>
	);
};
