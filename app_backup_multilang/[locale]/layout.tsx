import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "../../i18n";
import { Header, TopBar } from "@/shared/components/shared";
import { findPizzas } from "@/shared/lib/find-pizzas";

export default async function LocaleLayout({
	children,
	params: { locale },
}: {
	children: React.ReactNode;
	params: { locale: string };
}) {
	// Проверяем, что локаль поддерживается
	if (!locales.includes(locale as any)) {
		notFound();
	}

	// Получаем сообщения для текущей локали
	const messages = await getMessages();

	// Получаем категории для TopBar
	const categories = await findPizzas({});

	return (
		<NextIntlClientProvider messages={messages}>
			<div className="min-h-screen bg-gray-50">
				<Header />
				<TopBar categories={categories.filter((category) => category.products.length > 0)} />
				<main>{children}</main>
			</div>
		</NextIntlClientProvider>
	);
}
