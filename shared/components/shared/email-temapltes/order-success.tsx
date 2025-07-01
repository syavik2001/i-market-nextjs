import React from "react";
import { CartItemDTO } from "@/shared/services/dto/cart.dto";

interface Props {
	items: CartItemDTO[];
	totalAmount: number;
}

export const OrderSuccessEmail: React.FC<Props> = ({ items, totalAmount }) => {
	return (
		<div>
			<h1>Замовлення успішно оформлено!</h1>
			<p>Дякуємо за ваше замовлення. Ось деталі:</p>

			<div>
				{items.map((item) => (
					<div key={item.id}>
						{item.productItem.product.name} | {item.productItem.price} грн x {item.quantity} шт. ={" "}
						{item.productItem.price * item.quantity} грн
					</div>
				))}
			</div>

			<p>Загальна сума: {totalAmount} грн</p>
		</div>
	);
};
