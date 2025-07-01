import {
	Container,
	FiltersWrapper,
	Title,
	ProductsGroupList,
	Stories,
	Header,
	TopBar,
} from "@/shared/components/shared";
import { Suspense } from "react";
import { GetSearchParams, findPizzas } from "@/shared/lib/find-pizzas";
import { FiltersProvider } from "@/shared/hooks/use-filters-context";

// Клиентский компонент для показа toast
import dynamic from "next/dynamic";
const HomeClientToast = dynamic(() => import("./toast-client"), { ssr: false });

// Добавляем кэширование
export const revalidate = 300; // Кэшируем на 5 минут

export default async function Home({ searchParams }: { searchParams: GetSearchParams }) {
	const categories = await findPizzas(searchParams);

	return (
		<FiltersProvider>
			<HomeClientToast />
			<div className="min-h-screen bg-gray-50">
				<Header />
				<TopBar categories={categories.filter((category) => category.products.length > 0)} />

				<Container className="mt-10">
					<Title text="Всі піци" size="lg" className="font-extrabold" />
				</Container>

				<Stories />

				<Container className="mt-10 pb-14">
					<div className="flex gap-[80px]">
						{/* Фильтрация */}
						<div className="w-[250px]">
							<Suspense fallback={<div className="animate-pulse h-96 bg-gray-200 rounded"></div>}>
								<FiltersWrapper />
							</Suspense>
						</div>

						{/* Список товаров */}
						<div className="flex-1">
							<div className="flex flex-col gap-16">
								{categories.map(
									(category) =>
										category.products.length > 0 && (
											<ProductsGroupList
												key={category.id}
												title={category.name}
												categoryId={category.id}
												items={category.products}
											/>
										),
								)}
							</div>
						</div>
					</div>
				</Container>
			</div>
		</FiltersProvider>
	);
}
