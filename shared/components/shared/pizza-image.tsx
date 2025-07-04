import { cn } from "@/shared/lib/utils";
import React from "react";

interface Props {
	className?: string;
	imageUrl: string;
	size: 20 | 30 | 40;
}

export const PizzaImage: React.FC<Props> = ({ imageUrl, size, className }) => {
	return (
		<div
			className={cn(
				"flex items-center justify-center flex-1 relative w-full p-2 sm:p-3 1100:p-0",
				className,
			)}>
			<img
				src={imageUrl}
				alt="Logo"
				className={cn(
					"relative 1100:left-2 1100:top-2 transition-all z-10 duration-300 object-contain",
					{
						"w-[100px] h-[100px] 480:w-[140px] 480:h-[140px] 639:w-[160px] 639:h-[160px] sm:w-[180px] sm:h-[180px] 1100:w-[300px] 1100:h-[300px]":
							size === 20,
						"w-[120px] h-[120px] 480:w-[160px] 480:h-[160px] 639:w-[200px] 639:h-[200px] sm:w-[220px] sm:h-[220px] 1100:w-[400px] 1100:h-[400px]":
							size === 30,
						"w-[140px] h-[140px] 480:w-[180px] 480:h-[180px] 639:w-[220px] 639:h-[220px] sm:w-[240px] sm:h-[240px] 1100:w-[500px] 1100:h-[500px]":
							size === 40,
					},
				)}
			/>

			<div className="hidden 1100:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200 w-[280px] h-[280px] sm:w-[300px] sm:h-[300px] 1100:w-[450px] 1100:h-[450px]" />
			<div className="hidden 1100:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-100 w-[230px] h-[230px] sm:w-[250px] sm:h-[250px] 1100:w-[370px] 1100:h-[370px]" />
		</div>
	);
};
