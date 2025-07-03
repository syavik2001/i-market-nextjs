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
}

export const IngredientItem: React.FC<Props> = ({
	className,
	active,
	price,
	name,
	imageUrl,
	onClick,
}) => {
	return (
		<div
			className={cn(
				"flex items-center flex-col p-1 rounded-md w-28 sm:w-32 text-center relative cursor-pointer shadow-md bg-white",
				{ "border border-primary": active },
				className,
			)}
			onClick={onClick}>
			{active && (
				<CircleCheck className="absolute top-1 right-1 sm:top-2 sm:right-2 text-primary w-4 h-4 sm:w-5 sm:h-5" />
			)}
			<img width={90} height={90} className="sm:w-[110px] sm:h-[110px]" src={imageUrl} />
			<span className="text-xs mb-1">{name}</span>
			<span className="font-bold text-sm">{price} грн</span>
		</div>
	);
};
