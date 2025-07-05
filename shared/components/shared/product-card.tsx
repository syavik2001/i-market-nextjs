"use client";

import { Button } from "../ui";
import { Title } from "./title";
import { cn } from "@/shared/lib/utils";
import { Plus } from "lucide-react";
import { Ingredient } from "@prisma/client";
import { useProductModalStore } from "@/shared/store/product-modal";
import { ProductWithRelations } from "@/@types/prisma";

interface Props {
	id: number;
	name: string;
	price: number;
	imageUrl: string;
	ingredients: Ingredient[];
	product: ProductWithRelations;
	className?: string;
}

export const ProductCard: React.FC<Props> = ({
	id,
	name,
	price,
	imageUrl,
	ingredients,
	product,
	className,
}) => {
	const { openModal } = useProductModalStore();

	const handleClick = () => {
		openModal(product);
	};

	return (
		<div className={cn(className, "flex flex-col h-[240px] sm:h-[400px] w-full")}>
			<div className="flex flex-col h-full cursor-pointer" onClick={handleClick}>
				<div className="flex justify-center p-2 sm:p-6 bg-secondary rounded-lg h-[140px] sm:h-[260px]">
					<img
						className="w-[120px] h-[120px] sm:w-[200px] sm:h-[200px] object-contain"
						src={imageUrl}
						alt={name}
					/>
				</div>

				<Title text={name} size="sm" className="mb-1 mt-1 sm:mt-3 font-bold text-sm sm:text-base" />

				<p className="text-[10px] sm:text-sm text-gray-400 flex-1">
					{ingredients
						.slice(0, 3)
						.map((ingredient) => ingredient.name)
						.join(", ")}
					{ingredients.length > 3 && "..."}
				</p>

				<div className="flex justify-between items-center mt-1 sm:mt-4">
					<span className="text-sm sm:text-[20px]">
						від <b>{price} грн</b>
					</span>

					<Button
						variant="secondary"
						className="text-xs sm:text-base font-bold px-2 sm:px-4 py-1 sm:py-2">
						<Plus size={16} className="mr-1" />
						Додати
					</Button>
				</div>
			</div>
		</div>
	);
};
