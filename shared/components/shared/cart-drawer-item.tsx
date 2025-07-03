import { cn } from "@/shared/lib/utils";
import React from "react";

import * as CartItem from "./cart-item-details";
import { CartItemProps } from "./cart-item-details/cart-item-details.types";
import { CountButton } from "./count-button";
import { Trash2Icon } from "lucide-react";

interface Props extends CartItemProps {
	onClickCountButton?: (type: "plus" | "minus") => void;
	onClickRemove?: () => void;
	className?: string;
}

export const CartDrawerItem: React.FC<Props> = ({
	imageUrl,
	name,
	price,
	quantity,
	details,
	disabled,
	onClickCountButton,
	onClickRemove,
	className,
}) => {
	return (
		<div
			className={cn(
				"flex bg-white p-3 sm:p-5 gap-3 sm:gap-6",
				{
					"opacity-50 pointer-events-none": disabled,
				},
				className,
			)}>
			<CartItem.Image src={imageUrl} />

			<div className="flex-1 min-w-0">
				<CartItem.Info name={name} details={details} />

				<hr className="my-2 sm:my-3" />

				<div className="flex items-center justify-between">
					<CountButton onClick={onClickCountButton} value={quantity} />

					<div className="flex items-center gap-2 sm:gap-3">
						<CartItem.Price value={price} />
						<Trash2Icon
							onClick={onClickRemove}
							className="text-gray-400 cursor-pointer hover:text-gray-600 w-4 h-4 sm:w-4 sm:h-4"
							size={16}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
