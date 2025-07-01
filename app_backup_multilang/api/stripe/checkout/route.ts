import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/shared/lib/stripe";

const secretKey = process.env.STRIPE_SECRET_KEY;
if (!secretKey) {
	throw new Error("STRIPE_SECRET_KEY is not defined");
}

export async function POST(req: NextRequest) {
	try {
		const { orderId, description, amount } = await req.json();

		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			mode: "payment",
			line_items: [
				{
					price_data: {
						currency: "uah",
						product_data: {
							name: description || "Оплата заказа",
						},
						unit_amount: amount * 100,
					},
					quantity: 1,
				},
			],
			metadata: {
				order_id: orderId?.toString() || "no-order",
			},
			success_url: process.env.STRIPE_SUCCESS_URL || "http://localhost:3000/?paid=success",
			cancel_url: process.env.STRIPE_CANCEL_URL || "http://localhost:3000/?paid=fail",
		});

		return NextResponse.json({ url: session.url });
	} catch (error) {
		console.error("[Stripe Checkout Error]", error);
		return NextResponse.json({ error: "Ошибка при создании оплаты" }, { status: 500 });
	}
}
