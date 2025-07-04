"use client";

import { Dialog, DialogContent } from "@/shared/components/ui/dialog";
import { cn } from "@/shared/lib/utils";
import React from "react";
import { ProductForm } from "../product-form";
import { useProductModalStore } from "@/shared/store/product-modal";

interface Props {
	className?: string;
}

export const ProductModal: React.FC<Props> = ({ className }) => {
	const { isOpen, product, closeModal } = useProductModalStore();

	if (!product) return null;

	return (
		<Dialog open={isOpen} onOpenChange={closeModal}>
			<DialogContent
				className={cn(
					"p-0 w-full max-w-[99vw] 480:max-w-[98vw] 639:max-w-[95vw] sm:max-w-[90vw] md:max-w-[80vw] 1100:max-w-[1060px] 1100:w-[1060px] h-[90vh] 639:h-[90vh] 1100:min-h-[500px] bg-white overflow-hidden",
					className,
				)}
				onOpenAutoFocus={(e) => e.preventDefault()}>
				<ProductForm product={product} onSubmit={closeModal} />
			</DialogContent>
		</Dialog>
	);
};
