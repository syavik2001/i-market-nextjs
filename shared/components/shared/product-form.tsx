"use client";

import { ProductWithRelations } from "@/@types/prisma";
import React from "react";
import toast from "react-hot-toast";
import { ChoosePizzaForm } from "./choose-pizza-form";
import { ChooseProductForm } from "./choose-product-form";
import { useCartStore } from "@/shared/store";

interface Props {
	product: ProductWithRelations;
	onSubmit?: VoidFunction;
}

export const ProductForm: React.FC<Props> = ({ product, onSubmit: _onSubmit }) => {
	const [addCartItem, loading] = useCartStore((state) => [state.addCartItem, state.loading]);

	const firstItem = product.items[0];
	const isPizzaForm = Boolean(firstItem.pizzaType);

	const onSubmit = async (productItemId?: number, ingredients?: number[], quantity: number = 1) => {
		try {
			const itemId = productItemId ?? firstItem.id;

			await addCartItem({
				productItemId: itemId,
				ingredients,
				quantity,
			});

			toast.success(product.name + " додано до кошика");

			_onSubmit?.();
		} catch (err) {
			toast.error("Не вдалося додати товар до кошика");
			console.error(err);
		}
	};

	if (isPizzaForm) {
		return (
			<ChoosePizzaForm
				imageUrl={product.imageUrl}
				name={product.name}
				ingredients={product.ingredients}
				items={product.items}
				onSubmit={onSubmit}
				loading={loading}
			/>
		);
	}

	return (
		<ChooseProductForm product={product} onClose={_onSubmit || (() => {})} onSubmit={onSubmit} />
	);
};
