import { prisma } from "@/prisma/prisma-client";
import { updateCartTotalAmount } from "@/shared/lib/update-cart-total-amount";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Принудительно делаем роут динамическим
export const dynamic = "force-dynamic";

const MAX_ITEM_QUANTITY = 99;

const updateQuantitySchema = z.object({
	quantity: z.number().int().min(1).max(MAX_ITEM_QUANTITY),
});

/* Находим позицию только внутри корзины текущего токена */
const findOwnCartItem = (id: number, token: string) =>
	prisma.cartItem.findFirst({
		where: {
			id,
			cart: { token },
		},
	});

const parseItemId = (value: string) => {
	const id = Number(value);
	return Number.isInteger(id) && id > 0 ? id : null;
};

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
	try {
		const id = parseItemId(params.id);
		const token = req.cookies.get("cartToken")?.value;

		if (!id) {
			return NextResponse.json({ error: "Invalid cart item id" }, { status: 400 });
		}

		if (!token) {
			return NextResponse.json({ error: "Cart token not found" }, { status: 401 });
		}

		const parsed = updateQuantitySchema.safeParse(await req.json().catch(() => null));

		if (!parsed.success) {
			return NextResponse.json({ error: "Invalid quantity" }, { status: 400 });
		}

		const cartItem = await findOwnCartItem(id, token);

		if (!cartItem) {
			return NextResponse.json({ error: "Cart item not found" }, { status: 404 });
		}

		await prisma.cartItem.update({
			where: {
				id: cartItem.id,
			},
			data: {
				quantity: parsed.data.quantity,
			},
		});

		const updatedUserCart = await updateCartTotalAmount(token);

		return NextResponse.json(updatedUserCart);
	} catch (error) {
		console.log("[CART_PATCH] Server error", error);
		return NextResponse.json({ message: "Failed to update cart" }, { status: 500 });
	}
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
	try {
		const id = parseItemId(params.id);
		const token = req.cookies.get("cartToken")?.value;

		if (!id) {
			return NextResponse.json({ error: "Invalid cart item id" }, { status: 400 });
		}

		if (!token) {
			return NextResponse.json({ error: "Cart token not found" }, { status: 401 });
		}

		const cartItem = await findOwnCartItem(id, token);

		if (!cartItem) {
			return NextResponse.json({ error: "Cart item not found" }, { status: 404 });
		}

		await prisma.cartItem.delete({
			where: {
				id: cartItem.id,
			},
		});

		const updatedUserCart = await updateCartTotalAmount(token);

		return NextResponse.json(updatedUserCart);
	} catch (error) {
		console.log("[CART_DELETE] Server error", error);
		return NextResponse.json({ message: "Failed to delete cart item" }, { status: 500 });
	}
}
