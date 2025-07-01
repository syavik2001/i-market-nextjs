import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/shared/lib/stripe";
import { prisma } from "@/prisma/prisma-client";
import { OrderSuccessTemplate } from "@/shared/components/shared/email-temapltes/order-success";
import { sendEmail } from "@/shared/lib";
import { CartItemDTO } from "@/shared/services/dto/cart.dto";
import { OrderStatus } from "@prisma/client";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
	console.log("🔥 Webhook triggered");
	const signature = req.headers.get("stripe-signature");
	if (!signature) {
		console.error("❌ Stripe signature отсутствует");
		return new NextResponse("Missing Stripe signature", { status: 400 });
	}

	let event: Stripe.Event;

	try {
		const rawBody = await req.arrayBuffer();
		event = stripe.webhooks.constructEvent(
			Buffer.from(rawBody),
			signature,
			process.env.STRIPE_WEBHOOK_SECRET!,
		);
	} catch (err) {
		console.error("❌ Webhook signature verification failed:", err);
		return new NextResponse("Invalid signature", { status: 400 });
	}

	// ✅ Успешная оплата
	if (event.type === "checkout.session.completed") {
		console.log("✅ Webhook: checkout.session.completed получен");
		const session = event.data.object as Stripe.Checkout.Session;
		const orderId = Number(session.metadata?.order_id);
		console.log("🧾 Order ID из metadata:", orderId);

		const order = await prisma.order.findFirst({
			where: { id: orderId },
		});

		if (order) {
			const updatedOrder = await prisma.order.update({
				where: { id: order.id },
				data: { status: OrderStatus.SUCCEEDED },
			});
			console.log("🎉 Статус заказа обновлён:", updatedOrder.status);

			const items = JSON.parse(order.items as string) as CartItemDTO[];

			await sendEmail(
				order.email,
				"Next Pizza / Ваш заказ успешно оформлен 🎉",
				OrderSuccessTemplate({ orderId: order.id, items }),
			);
		}
	}

	return new NextResponse("Webhook received", { status: 200 });
}
