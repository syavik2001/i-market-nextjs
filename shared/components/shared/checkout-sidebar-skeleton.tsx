import { cn } from "@/shared/lib/utils";
import React from "react";

interface Props {
	className?: string;
}

export const CheckoutSidebarSkeleton: React.FC<Props> = ({ className }) => {
	return (
		<div className={cn("flex items-center justify-between my-4", className)}>
			<span className="flex flex-1 text-lg text-neutral-500">
				<div className="w-20 h-5 bg-gray-200 rounded animate-pulse" />
				<div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
			</span>
			<div className="w-16 h-5 bg-gray-200 rounded animate-pulse" />
		</div>
	);
};
