import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
	try {
		const product = await prisma.product.findFirst({
			where: {
				id: Number(params.id),
			},
			include: {
				ingredients: true,
				items: true,
			},
		});

		if (!product) {
			return NextResponse.json({ message: "Продукт не найден" }, { status: 404 });
		}

		return NextResponse.json(product);
	} catch (error) {
		console.log("[PRODUCT_GET] Server error", error);
		return NextResponse.json({ message: "Не удалось получить продукт" }, { status: 500 });
	}
}
