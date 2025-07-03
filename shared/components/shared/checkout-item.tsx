"use client";

import React from "react";
import { cn } from "@/shared/lib/utils";
import { X } from "lucide-react";
import { CartItemProps } from "./cart-item-details/cart-item-details.types";
import * as CartItemDetails from "./cart-item-details";

interface Props extends CartItemProps {
	onClickCountButton?: (type: "plus" | "minus") => void;
	onClickRemove?: () => void;
	className?: string;
}

export const CheckoutItem: React.FC<Props> = ({
	name,
	price,
	imageUrl,
	quantity,
	details,
	className,
	disabled,
	onClickCountButton,
	onClickRemove,
}) => {
	return (
		<div
			className={cn(
				"flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-5",
				{
					"opacity-50 pointer-events-none": disabled,
				},
				className,
			)}>
			<div className="flex items-center gap-3 sm:gap-5 flex-1 w-full">
				<CartItemDetails.Image src={imageUrl} className="w-16 h-16 sm:w-20 sm:h-20" />
				<CartItemDetails.Info name={name} details={details} />
			</div>

			<div className="flex flex-row justify-between items-end w-full sm:flex-col sm:items-end sm:w-auto sm:mt-0 gap-1 sm:gap-2">
				<div className="flex items-center gap-2 sm:gap-2">
					<CartItemDetails.CountButton onClick={onClickCountButton} value={quantity} />
					<button type="button" onClick={onClickRemove}>
						<X className="text-gray-400 cursor-pointer hover:text-gray-600" size={20} />
					</button>
				</div>
				<CartItemDetails.Price value={price} className="sm:mb-2" />
			</div>
		</div>
	);
};
