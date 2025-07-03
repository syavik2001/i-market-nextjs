"use client";

import React from "react";
import { Search, X } from "lucide-react";
import { useClickAway, useDebounce } from "react-use";
import { cn } from "@/shared/lib/utils";
import { Api } from "@/shared/services/api-client";
import { Product } from "@prisma/client";
import { useProductModalStore } from "@/shared/store/product-modal";

interface Props {
	className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
	const [searchQuery, setSearchQuery] = React.useState("");
	const [focused, setFocused] = React.useState(false);
	const [products, setProducts] = React.useState<Product[]>([]);
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);
	const ref = React.useRef(null);
	const { openModal } = useProductModalStore();

	useClickAway(ref, () => {
		setFocused(false);
		setProducts([]);
		setError(null);
	});

	useDebounce(
		async () => {
			if (!searchQuery.trim()) {
				setProducts([]);
				setError(null);
				return;
			}

			setLoading(true);
			setError(null);

			try {
				const response = await Api.products.search(searchQuery);
				setProducts(response);
			} catch (error) {
				console.error("Search error:", error);
				setError("Помилка пошуку");
				setProducts([]);
			} finally {
				setLoading(false);
			}
		},
		300,
		[searchQuery],
	);

	const onClickItem = async (product: Product) => {
		setFocused(false);
		setSearchQuery("");
		setProducts([]);
		setError(null);

		// Получаем полные данные продукта для модалки
		try {
			const fullProduct = await Api.products.getById(product.id);
			openModal(fullProduct);
		} catch (error) {
			console.error("Ошибка при получении данных продукта:", error);
		}
	};

	return (
		<>
			{focused && <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30" />}

			<div
				ref={ref}
				className={cn("flex rounded-2xl w-full justify-between relative h-11 z-30", className)}>
				<Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
				<input
					className="rounded-2xl outline-none w-full bg-gray-100 pl-11 h-11 pr-10"
					type="text"
					placeholder="Знайти піцу..."
					spellCheck="false"
					onFocus={() => setFocused(true)}
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>

				{/* Кнопка-крестик для очистки поля */}
				{searchQuery && (
					<button
						type="button"
						className="absolute top-1/2 right-3 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 focus:outline-none group"
						onClick={() => setSearchQuery("")}
						aria-label="Очистити поле пошуку">
						<X className="h-5 w-5 transition-transform duration-200 group-hover:rotate-90" />
					</button>
				)}

				{focused && (products.length > 0 || loading || error) && (
					<div
						className={cn(
							"absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 z-30",
						)}>
						{loading && <div className="px-3 py-2 text-gray-500">Пошук...</div>}

						{error && <div className="px-3 py-2 text-red-500">{error}</div>}

						{products.length > 0 && !loading && !error && (
							<>
								{products.map((product) => (
									<div
										onClick={() => onClickItem(product)}
										key={product.id}
										className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10 cursor-pointer">
										<img className="rounded-sm h-8 w-8" src={product.imageUrl} alt={product.name} />
										<span>{product.name}</span>
									</div>
								))}
							</>
						)}

						{products.length === 0 && !loading && !error && searchQuery.trim() && (
							<div className="px-3 py-2 text-gray-500">Нічого не знайдено</div>
						)}
					</div>
				)}
			</div>
		</>
	);
};
