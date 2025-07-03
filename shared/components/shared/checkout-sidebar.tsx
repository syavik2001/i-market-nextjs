"use client";

import React from "react";
import { WhiteBlock } from "./white-block";
import { CheckoutItemDetails } from "./checkout-item-details";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { Button, Skeleton } from "../ui";
import { cn } from "@/shared/lib/utils";
import { CheckoutSidebarSkeleton } from "./checkout-sidebar-skeleton";
import { CartStateItem } from "@/shared/lib/get-cart-details";

const VAT = 15;
const DELIVERY_PRICE = 60;

interface Props {
	totalAmount: number;
	loading?: boolean;
	className?: string;
}

export const CheckoutSidebar: React.FC<Props> = ({ totalAmount, loading, className }) => {
	const vatPrice = Math.round(totalAmount * 0.2);
	const totalPrice = totalAmount + DELIVERY_PRICE;

	return (
		<WhiteBlock
			className={cn("p-4 sm:p-6 md:p-6 md:sticky md:top-4 md:self-start w-full", className)}>
			<div className="bg-white rounded-2xl p-4 sm:p-8 h-fit">
				<h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Ваше замовлення</h2>
				<div className="flex flex-col gap-1">
					{loading ? (
						<Skeleton className="h-11 w-32 sm:w-48" />
					) : (
						<span className="h-11 text-2xl sm:text-[34px] font-extrabold">{totalPrice} грн</span>
					)}
				</div>
			</div>

			<div className="space-y-2 sm:space-y-4 mb-4 sm:mb-6">
				{loading ? (
					<>
						<CheckoutSidebarSkeleton />
						<CheckoutSidebarSkeleton />
						<CheckoutSidebarSkeleton />
					</>
				) : (
					<>
						<CheckoutItemDetails title="Товари" value={`${totalAmount} грн`} />
						<CheckoutItemDetails title="ПДВ" value={`${vatPrice} грн`} />
						<CheckoutItemDetails title="Доставка" value={`${DELIVERY_PRICE} грн`} />
					</>
				)}
			</div>

			<div className="border-t border-gray-200 pt-4">
				<div className="flex justify-between items-center mb-4 sm:mb-6">
					<span className="text-base sm:text-lg font-semibold">Разом до сплати</span>
					{loading ? (
						<Skeleton className="h-11 w-24 sm:w-32" />
					) : (
						<span className="h-11 text-2xl sm:text-[34px] font-extrabold">{totalPrice} грн</span>
					)}
				</div>

				<Button
					type="submit"
					loading={loading}
					className="w-full h-12 text-base font-bold"
					size="lg">
					Оплатити замовлення
				</Button>
			</div>
		</WhiteBlock>
	);
};
