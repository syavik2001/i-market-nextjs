import { cn } from "@/shared/lib/utils";
import { useLocaleStore } from "@/shared/store";

interface Props {
	value: number;
	className?: string;
}

export const CartItemDetailsPrice: React.FC<Props> = ({ value, className }) => {
	const { t } = useLocaleStore();
	return <h2 className={cn("font-bold text-sm sm:text-base", className)}>{value} {t.common.currency}</h2>;
};
