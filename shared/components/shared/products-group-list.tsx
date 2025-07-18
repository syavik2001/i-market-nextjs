"use client";

import React from "react";
import { Title } from "./title";
import { ProductCard } from "./product-card";
import { cn } from "@/shared/lib/utils";
import { useIntersection } from "react-use";
import { useCategoryStore } from "@/shared/store/category";
//import { CategoryProducts } from '@/@types/prisma';
import { ProductWithRelations } from "@/@types/prisma";
interface Props {
	title: string;
	items: ProductWithRelations[];
	className?: string;
	listClassName?: string;
	categoryId: number;
}

export const ProductsGroupList: React.FC<Props> = ({
	title,
	items,
	listClassName,
	categoryId,
	className,
}) => {
	const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
	const intersectionRef = React.useRef(null);
	const intersection = useIntersection(intersectionRef, {
		threshold: 0.3,
		rootMargin: "-100px 0px -50px 0px",
	});

	React.useEffect(() => {
		if (intersection?.isIntersecting) {
			setActiveCategoryId(categoryId);
		}
	}, [categoryId, intersection?.isIntersecting, setActiveCategoryId]);

	return (
		<div
			className={cn("scroll-mt-[120px] lg:scroll-mt-32", className)}
			id={title}
			ref={intersectionRef}>
			<Title text={title} size="lg" className="font-extrabold mb-5" />
			<div
				className={cn(
					"grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-8 lg:gap-10 xl:gap-[50px] justify-items-center sm:justify-items-stretch",
					listClassName,
				)}>
				{items.map((product, i) => (
					<ProductCard
						key={product.id}
						id={product.id}
						name={product.name}
						imageUrl={product.imageUrl}
						price={product.items[0].price}
						ingredients={product.ingredients}
						product={product}
					/>
				))}
			</div>
		</div>
	);
};
