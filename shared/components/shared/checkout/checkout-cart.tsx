import React from "react";
import { WhiteBlock } from "../white-block";
import { CheckoutItem } from "../checkout-item";
import { getCartItemDetails } from "@/shared/lib";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { CartStateItem } from "@/shared/lib/get-cart-details";
import { CheckoutItemSkeleton } from "../checkout-item-skeleton";
import { useLocaleStore } from "@/shared/store";
import { getLocalizedName } from "@/shared/lib/get-localized-name";

interface Props {
	items: CartStateItem[];
	onClickCountButton: (id: number, quantity: number, type: "plus" | "minus") => void;
	removeCartItem: (id: number) => void;
	loading?: boolean;
	className?: string;
}

export const CheckoutCart: React.FC<Props> = ({
	items,
	onClickCountButton,
	removeCartItem,
	loading,
	className,
}) => {
	const { locale, t } = useLocaleStore();

	return (
		<WhiteBlock title={t.cart.cartSectionTitle} className={className}>
			<div className="flex flex-col gap-5">
				{loading
					? [...Array(2)].map((_, index) => <CheckoutItemSkeleton key={index} />)
					: items.map((item) => (
							<CheckoutItem
								key={item.id}
								id={item.id}
								imageUrl={item.imageUrl}
								details={getCartItemDetails(
									item.ingredients,
									item.pizzaType as PizzaType,
									item.pizzaSize as PizzaSize,
									locale,
								)}
								name={getLocalizedName(item.name, item.nameEn, locale)}
								price={item.price}
								quantity={item.quantity}
								disabled={item.disabled}
								onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
								onClickRemove={() => removeCartItem(item.id)}
							/>
					  ))}
			</div>
		</WhiteBlock>
	);
};
