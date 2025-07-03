"use client";

import React from "react";
import { Button } from "../ui";
import { CountButton } from "./count-button";
import { IngredientItem } from "./ingredient-item";
import { Ingredient } from "@prisma/client";

import { cn } from "@/shared/lib/utils";
import { Title } from "./title";

interface Props {
	product: {
		id: number;
		name: string;
		imageUrl: string;
		ingredients: Ingredient[];
		items: { id: number; price: number }[];
	};
	onClose: () => void;
	className?: string;
	onSubmit?: (productItemId: number, ingredients?: number[], quantity?: number) => void;
}

/**
 * Форма выбора ПРОДУКТА (не пиццы)
 */
export const ChooseProductForm: React.FC<Props> = ({ product, onClose, className, onSubmit }) => {
	const [quantity, setQuantity] = React.useState(1);
	const [selectedIngredients, setSelectedIngredients] = React.useState<number[]>([]);

	const totalPrice =
		(product.items[0].price +
			selectedIngredients.reduce((acc, ingredientId) => {
				const ingredient = product.ingredients.find((i) => i.id === ingredientId);
				return acc + (ingredient?.price || 0);
			}, 0)) *
		quantity;

	const handleAddToCart = () => {
		try {
			onSubmit?.(product.items[0].id, selectedIngredients, quantity);
			onClose();
		} catch (error) {
			console.error("Не вдалося додати товар до кошика", error);
		}
	};

	const handleQuantityChange = (type: "plus" | "minus") => {
		if (type === "plus") {
			setQuantity((prev) => prev + 1);
		} else if (type === "minus" && quantity > 1) {
			setQuantity((prev) => prev - 1);
		}
	};

	return (
		<div className={cn(className, "flex flex-col 1100:flex-row flex-1")}>
			<div className="flex items-center justify-center relative w-full p-2 sm:p-3 1100:p-0 h-[30%] 1100:h-auto 1100:flex-1">
				<img
					src={product.imageUrl}
					alt={product.name}
					className="relative 1100:left-2 1100:top-2 transition-all z-10 duration-300 w-[200px] h-[200px] sm:w-[220px] sm:h-[220px] 1100:w-[350px] 1100:h-[350px]"
				/>
			</div>

			<div className="w-full 1100:w-[490px] bg-[#f7f6f5] p-4 1100:p-7 h-[70%] 1100:h-auto flex flex-col">
				<div className="">
					<Title
						text={product.name}
						size="md"
						className="font-extrabold mb-1 text-lg 1100:text-xl"
					/>
					<p className="text-gray-400 text-sm 1100:text-base">
						{product.ingredients.map((ingredient) => ingredient.name).join(", ")}
					</p>
				</div>
				{product.ingredients.length > 0 && (
					<div className="flex-1 min-h-0">
						<div className="bg-gray-50 p-3 1100:p-5 rounded-md h-full overflow-auto scrollbar mt-4 1100:mt-5">
							<h4 className="font-bold mb-2 1100:mb-3 text-sm 1100:text-base">
								Додаткові інгредієнти
							</h4>
							<div className="flex gap-2 sm:gap-3 flex-wrap 1100:grid 1100:grid-cols-3 1100:gap-3">
								{product.ingredients.map((ingredient) => (
									<IngredientItem
										key={ingredient.id}
										name={ingredient.name}
										price={ingredient.price}
										imageUrl={ingredient.imageUrl}
										active={selectedIngredients.includes(ingredient.id)}
										onClick={() => {
											const newSelected = selectedIngredients.includes(ingredient.id)
												? selectedIngredients.filter((id) => id !== ingredient.id)
												: [...selectedIngredients, ingredient.id];
											setSelectedIngredients(newSelected);
										}}
									/>
								))}
							</div>
						</div>
					</div>
				)}
				<div className="mt-auto pt-4 1100:pt-6">
					{/* Количество */}
					<div className="mb-4 1100:mb-6">
						<h4 className="font-bold mb-2 1100:mb-3 text-sm 1100:text-base">Кількість</h4>
						<CountButton value={quantity} onClick={handleQuantityChange} />
					</div>
					{/* Кнопка добавления */}
					<Button
						onClick={handleAddToCart}
						className="h-[50px] 1100:h-[55px] px-6 1100:px-10 text-base rounded-[18px] w-full">
						Додати до кошика за {totalPrice} грн
					</Button>
				</div>
			</div>
		</div>
	);
};
