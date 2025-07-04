import { cn } from "@/shared/lib/utils";
import { CircleCheck } from "lucide-react";
import React from "react";

interface Props {
	imageUrl: string;
	name: string;
	price: number;
	active?: boolean;
	onClick?: () => void;
	className?: string;
	imageClassName?: string;
}

export const IngredientItem: React.FC<Props> = ({
	className,
	imageClassName,
	active,
	price,
	name,
	imageUrl,
	onClick,
}) => {
	return (
		<div
			className={cn(
				"flex items-center flex-col p-0.5 rounded-md text-center relative cursor-pointer shadow-md bg-white",
				{ "border border-primary": active },
				className,
			)}
			onClick={onClick}>
			{active && <CircleCheck className="absolute top-0.5 right-0.5 text-primary w-3 h-3" />}
			<img
				width={90}
				height={90}
				className={cn("object-contain", imageClassName)}
				src={imageUrl}
				alt={name}
			/>
			<span className="leading-tight">{name}</span>
			<span className="font-bold">{price} грн</span>
		</div>
	);
};
