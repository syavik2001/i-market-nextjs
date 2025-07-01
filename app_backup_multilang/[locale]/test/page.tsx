import { useTranslations } from "next-intl";

export default function TestPage() {
	const t = useTranslations();

	return (
		<div className="p-8">
			<h1 className="text-2xl font-bold mb-4">Тест переводов</h1>
			<div className="space-y-2">
				<p>
					<strong>Корзина:</strong> {t("cart")}
				</p>
				<p>
					<strong>Профиль:</strong> {t("profile")}
				</p>
				<p>
					<strong>Сортировка:</strong> {t("sort")}
				</p>
				<p>
					<strong>Фильтр:</strong> {t("filter")}
				</p>
				<p>
					<strong>Поиск:</strong> {t("search")}
				</p>
				<p>
					<strong>Добавить:</strong> {t("add")}
				</p>
				<p>
					<strong>От:</strong> {t("from")}
				</p>
			</div>
		</div>
	);
}
