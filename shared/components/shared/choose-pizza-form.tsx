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
		<div className={cn(className, "flex flex-col 1100:flex-row flex-1")}>
			<PizzaImage imageUrl={imageUrl} size={size} className="h-[30%] 1100:h-auto 1100:flex-1" />

			<div className="w-full 1100:w-[490px] bg-[#f7f6f5] p-2 1100:p-7 h-[70%] 1100:h-auto flex flex-col">
				<div className="">
					<Title text={name} size="md" className="font-extrabold mb-1 text-lg 1100:text-xl" />
					<p className="text-gray-400 text-sm 1100:text-base">{textDetaills}</p>
					<div className="flex flex-col gap-3 1100:gap-4 mt-2 1100:mt-5">
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
				</div>
				<div className="flex-1 min-h-0">
					<div className="bg-gray-50 p-3 1100:p-5 rounded-md h-full max-h-[34vh] sm:max-h-none overflow-auto scrollbar mt-2 1100:mt-5">
						<div className="flex gap-2 sm:gap-3 flex-wrap 1100:grid 1100:grid-cols-3 1100:gap-3">
							{ingredients.map((ingredient) => (
								<IngredientItem
									key={ingredient.id}
									name={ingredient.name}
									price={ingredient.price}
									imageUrl={ingredient.imageUrl}
									onClick={() => addIngredient(ingredient.id)}
									active={selectedIngredients.has(ingredient.id)}
									className="w-24 h-32 text-[10px] md:w-28 md:h-32 md:text-xs 1100:w-32 1100:h-36 1100:text-sm"
									imageClassName="w-16 h-16 md:w-20 md:h-20 1100:w-20 1100:h-20 object-contain mx-auto"
								/>
							))}
						</div>
					</div>
				</div>
				<div className="mt-auto pt-2 1100:pt-6">
					<div className="mb-2 1100:mb-6">
						<h4 className="font-bold mb-1 1100:mb-3 text-sm 1100:text-base">Кількість</h4>
						<CountButton value={quantity} onClick={handleQuantityChange} />
					</div>
					<Button
						loading={loading}
						onClick={handleClickAdd}
						className="h-[50px] 1100:h-[55px] px-6 1100:px-10 text-base rounded-[18px] w-full">
						Додати до кошика за {finalPrice} грн
					</Button>
				</div>
			</div>
		</div>
	);
};
