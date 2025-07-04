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
		<div className={cn(className, "flex flex-col h-[280px] sm:h-[400px] w-[220px] sm:w-auto")}>
			<div className="flex flex-col h-full cursor-pointer" onClick={handleClick}>
				<div className="flex justify-center p-3 sm:p-6 bg-secondary rounded-lg h-[180px] sm:h-[260px]">
					<img
						className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px]"
						src={imageUrl}
						alt={name}
					/>
				</div>

				<Title text={name} size="sm" className="mb-1 mt-2 sm:mt-3 font-bold" />

				<p className="text-xs sm:text-sm text-gray-400 flex-1">
					{ingredients
						.slice(0, 3)
						.map((ingredient) => ingredient.name)
						.join(", ")}
					{ingredients.length > 3 && "..."}
				</p>

				<div className="flex justify-between items-center mt-1 sm:mt-4">
					<span className="text-base sm:text-[20px]">
						від <b>{price} грн</b>
					</span>

					<Button variant="secondary" className="text-base font-bold">
						<Plus size={20} className="mr-1" />
						Додати
					</Button>
				</div>
			</div>
		</div>
	);
};
