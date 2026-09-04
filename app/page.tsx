import {
	Container,
	FiltersWrapper,
	Title,
	ProductsGroupList,
	Stories,
	Header,
	TopBar,
	HomeTitle,
} from "@/shared/components/shared";

import { Suspense } from "react";
import { GetSearchParams, findPizzas } from "@/shared/lib/find-pizzas";
import { FiltersProvider } from "@/shared/hooks/use-filters-context";

// Клиентский компонент для показа toast
import nextDynamic from "next/dynamic";
const HomeClientToast = nextDynamic(() => import("./toast-client"), { ssr: false });

// Режим динамического рендеринга для правильного SSR перевода по куки
export const dynamic = "force-dynamic";

export default async function Home({ searchParams }: { searchParams: GetSearchParams }) {
	const categories = await findPizzas(searchParams);

	return (
		<FiltersProvider>
			<HomeClientToast />
			<div className="min-h-screen bg-gray-50">
				<Header />
				<TopBar categories={categories.filter((category) => category.products.length > 0)} />

				<Container className="mt-10">
					<HomeTitle className="font-extrabold" />
				</Container>

				<Stories />

				<Container className="mt-10 pb-14">
					<div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-[80px]">
						{/* Фильтрация — только на lg+ */}
						<div className="hidden lg:block w-[250px] flex-shrink-0">
							<Suspense fallback={<div className="animate-pulse h-96 bg-gray-200 rounded"></div>}>
								<FiltersWrapper />
							</Suspense>
						</div>

						{/* Список товаров */}
						<div className="flex-1 min-w-0">
							<div className="flex flex-col gap-16">
								{categories.map(
									(category) =>
										category.products.length > 0 && (
											<ProductsGroupList
												key={category.id}
												title={category.name}
												nameEn={category.nameEn}
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
