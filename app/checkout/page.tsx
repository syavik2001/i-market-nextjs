"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GooglePlacesProvider } from "@/shared/lib/GooglePlacesProvider";

import {
	CheckoutSidebar,
	Container,
	Title,
	CheckoutAddressForm,
	CheckoutCart,
	CheckoutPersonalForm,
	Header,
} from "@/shared/components/shared";
import { CheckoutFormValues, checkoutFormSchema } from "@/shared/constants";
import { useCart } from "@/shared/hooks";
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";
import React from "react";
import { useSession } from "next-auth/react";
import { Api } from "@/shared/services/api-client";

export default function CheckoutPage() {
	const [submitting, setSubmitting] = React.useState(false);
	const { totalAmount, updateItemQuantity, items, removeCartItem, loading } = useCart();
	const { data: session } = useSession();

	const form = useForm<CheckoutFormValues>({
		resolver: zodResolver(checkoutFormSchema),
		defaultValues: {
			email: "",
			firstName: "",
			lastName: "",
			phone: "",
			address: "",
			comment: "",
		},
	});

	React.useEffect(() => {
		async function fetchUserInfo() {
			const data = await Api.auth.getMe();
			const [firstName, lastName] = data.fullName.split(" ");

			form.setValue("firstName", firstName);
			form.setValue("lastName", lastName);
			form.setValue("email", data.email);
		}

		if (session) {
			fetchUserInfo();
		}
	}, [session]);

	const onSubmit = async (data: CheckoutFormValues) => {
		try {
			setSubmitting(true);

			const url = await createOrder(data);

			toast.success("Замовлення успішно оформлено! 📝 Перехід на оплату... ", {
				icon: "✅",
			});

			if (url) {
				location.href = url;
			}
		} catch (err) {
			console.log(err);
			setSubmitting(false);
			toast.error("Не вдалося створити замовлення", {
				icon: "❌",
			});
		}
	};

	const onClickCountButton = (id: number, quantity: number, type: "plus" | "minus") => {
		const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
		updateItemQuantity(id, newQuantity);
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<Header hasSearch={false} hasCart={false} />

			<Container className="mt-4 sm:mt-6 md:mt-10">
				<Title
					text="Оформлення замовлення"
					className="font-extrabold mb-4 sm:mb-8 text-2xl sm:text-[32px] md:text-[36px]"
				/>

				<FormProvider {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className="flex flex-col 1100:flex-row gap-4 1100:gap-10 items-start">
							{/* Левая часть */}
							<div className="flex flex-col gap-4 1100:gap-10 flex-1 mb-8 1100:mb-20 w-full">
								<CheckoutCart
									onClickCountButton={onClickCountButton}
									removeCartItem={removeCartItem}
									items={items}
									loading={loading}
								/>

								<CheckoutPersonalForm className={loading ? "opacity-40 pointer-events-none" : ""} />
								<GooglePlacesProvider>
									<CheckoutAddressForm
										className={loading ? "opacity-40 pointer-events-none" : ""}
									/>
								</GooglePlacesProvider>
							</div>

							{/* Правая часть */}
							<div className="w-full 1100:w-[450px] 1100:sticky 1100:top-4 1100:self-start">
								<CheckoutSidebar totalAmount={totalAmount} loading={loading || submitting} />
							</div>
						</div>
					</form>
				</FormProvider>
			</Container>
		</div>
	);
}
