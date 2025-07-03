"use client";

import React from "react";
import Image from "next/image";

import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/shared/components/ui/sheet";
import Link from "next/link";
import { Button } from "../ui";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CartDrawerItem } from "./cart-drawer-item";
import { getCartItemDetails } from "@/shared/lib/get-cart-item-details";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { Title } from "./title";
import { cn } from "@/shared/lib/utils";
import { useCart } from "@/shared/hooks/use-cart";

export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
	const { totalAmount, updateItemQuantity, items, removeCartItem } = useCart();
	const [redirecting, setRedirecting] = React.useState(false);

	const onClickCountButton = (id: number, quantity: number, type: "plus" | "minus") => {
		const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
		updateItemQuantity(id, newQuantity);
	};

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>

			<SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE] w-full sm:w-[400px] lg:w-[500px]">
				<div className={cn("flex flex-col h-full", !totalAmount && "justify-center")}>
					{totalAmount > 0 && (
						<SheetHeader className="px-4 sm:px-6">
							<SheetTitle className="text-lg sm:text-xl">
								У кошику <span className="font-bold">{items.length} товарів</span>
							</SheetTitle>
						</SheetHeader>
					)}

					{!totalAmount && (
						<div className="flex flex-col items-center justify-center w-full sm:w-72 mx-auto px-4">
							<Image
								src="/assets/images/empty-box.png"
								alt="Empty cart"
								width={120}
								height={120}
								className="w-20 h-20 sm:w-[120px] sm:h-[120px]"
							/>
							<Title
								size="sm"
								text="Кошик порожній"
								className="text-center font-bold my-2 text-base sm:text-lg"
							/>
							<p className="text-center text-neutral-500 mb-5 text-sm sm:text-base px-4">
								Додайте хоча б одну піцу, щоб зробити замовлення
							</p>

							<SheetClose>
								<Button className="w-full sm:w-56 h-12 text-base" size="lg">
									<ArrowLeft className="w-5 mr-2" />
									Повернутися назад
								</Button>
							</SheetClose>
						</div>
					)}

					{totalAmount > 0 && (
						<>
							<div className="-mx-4 sm:-mx-6 mt-3 sm:mt-5 overflow-auto flex-1">
								{items.map((item) => (
									<div key={item.id} className="mb-2 sm:mb-3">
										<CartDrawerItem
											id={item.id}
											imageUrl={item.imageUrl}
											details={getCartItemDetails(
												item.ingredients,
												item.pizzaType as PizzaType,
												item.pizzaSize as PizzaSize,
											)}
											disabled={item.disabled}
											name={item.name}
											price={item.price}
											quantity={item.quantity}
											onClickCountButton={(type) =>
												onClickCountButton(item.id, item.quantity, type)
											}
											onClickRemove={() => removeCartItem(item.id)}
										/>
									</div>
								))}
							</div>

							<SheetFooter className="-mx-4 sm:-mx-6 bg-white p-4 sm:p-8">
								<div className="w-full">
									<div className="flex mb-3 sm:mb-4">
										<span className="flex flex-1 text-base sm:text-lg text-neutral-500">
											Разом
											<div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
										</span>

										<span className="font-bold text-base sm:text-lg">{totalAmount} грн</span>
									</div>

									<Link href="/checkout">
										<Button
											onClick={() => setRedirecting(true)}
											loading={redirecting}
											type="submit"
											className="w-full h-12 sm:h-14 text-base">
											Оформити замовлення
											<ArrowRight className="w-5 ml-2" />
										</Button>
									</Link>
								</div>
							</SheetFooter>
						</>
					)}
				</div>
			</SheetContent>
		</Sheet>
	);
};
