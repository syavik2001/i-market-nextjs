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
		<div className={cn(className, "flex flex-1")}>
			<div className="flex items-center justify-center flex-1 relative w-full">
				<img
					src={product.imageUrl}
					alt={product.name}
					className="relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]"
				/>
			</div>

			<div className="w-[490px] bg-[#f7f6f5] p-7">
				<Title text={product.name} size="md" className="font-extrabold mb-1" />

				<p className="text-gray-400">
					{product.ingredients.map((ingredient) => ingredient.name).join(", ")}
				</p>

				{/* Количество */}
				<div className="mb-6 mt-5">
					<h4 className="font-bold mb-3">Кількість</h4>
					<CountButton value={quantity} onClick={handleQuantityChange} />
				</div>

				{/* Дополнительные ингредиенты (если есть) */}
				{product.ingredients.length > 0 && (
					<div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
						<h4 className="font-bold mb-3">Додаткові інгредієнти</h4>
						<div className="grid grid-cols-3 gap-3">
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
				)}

				{/* Кнопка добавления */}
				<Button
					onClick={handleAddToCart}
					className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
					Додати до кошика за {totalPrice} грн
				</Button>
			</div>
		</div>
	);
};
