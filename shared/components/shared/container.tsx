import { cn } from "@/shared/lib/utils";
import React from "react";

interface Props {
	className?: string;
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({ className, children }) => {
	return (
		<div className={cn("mx-auto max-w-[1280px] px-2 sm:px-4 md:px-8", className)}>{children}</div>
	);
};
