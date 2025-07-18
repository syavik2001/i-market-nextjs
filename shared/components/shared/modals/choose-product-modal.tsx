"use client";

import { Dialog, DialogContent } from "@/shared/components/ui/dialog";
import { cn } from "@/shared/lib/utils";
import React from "react";
import { useRouter } from "next/navigation";
import { Product } from "@prisma/client";
import { ProductWithRelations } from "@/@types/prisma";
import { useCartStore } from "@/shared/store";
import toast from "react-hot-toast";
import { Title } from "../title";
import { ChooseProductForm } from "../choose-product-form";
import { ProductForm } from "../product-form";

interface Props {
	product: ProductWithRelations;
	className?: string;
	open?: boolean;
	onClose?: () => void;
}

export const ChooseProductModal: React.FC<Props> = ({
	product,
	className,
	open = true,
	onClose,
}) => {
	const router = useRouter();

	const handleClose = () => {
		if (onClose) {
			onClose();
		} else {
			router.back();
		}
	};

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent
				className={cn(
					"p-0 w-full max-w-[95vw] sm:w-[600px] md:w-[800px] lg:w-[1060px] overflow-y-auto bg-white max-639:max-h-[85dvh] max-639:min-h-[80dvh]",
					className,
				)}
				onOpenAutoFocus={(e) => e.preventDefault()}>
				<ProductForm product={product} onSubmit={handleClose} />
				{/*<ChooseProductForm imageUrl={product.imageUrl} name={product.name} />*/}
			</DialogContent>
		</Dialog>
	);
};
