"use server";

import Stripe from "stripe";

interface Props {
	description: string;
	orderId: number;
	amount: number; // в гривнах (например, 250 = 250.00 грн)
}
console.log("🔥 STRIPE_SECRET_KEY", process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: "2025-05-28.basil",
});

export async function createPayment(details: Props) {
	const session = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		mode: "payment",
		line_items: [
			{
				price_data: {
					currency: "uah",
					product_data: {
						name: details.description,
					},
					unit_amount: details.amount * 100, // копейки
				},
				quantity: 1,
			},
		],
		metadata: {
			order_id: details.orderId.toString(),
		},
		success_url: process.env.STRIPE_SUCCESS_URL || "http://localhost:3000/?paid=success",
		cancel_url: process.env.STRIPE_CANCEL_URL || "http://localhost:3000/?paid=fail",
	});

	// Возвращаем id сессии и URL для редиректа
	return {
		id: session.id,
		url: session.url,
	};
}
