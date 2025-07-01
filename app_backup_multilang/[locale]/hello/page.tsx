export default function HelloPage() {
	return (
		<div className="p-8">
			<h1 className="text-3xl font-bold text-green-600">✅ Роутинг работает!</h1>
			<p className="mt-4 text-lg">
				Если вы видите это сообщение, значит структура приложения настроена правильно.
			</p>
			<div className="mt-6 p-4 bg-blue-50 rounded-lg">
				<h2 className="font-semibold">Доступные страницы:</h2>
				<ul className="mt-2 space-y-1">
					<li>
						• <code>/uk</code> - Главная страница (украинский)
					</li>
					<li>
						• <code>/en</code> - Главная страница (английский)
					</li>
					<li>
						• <code>/uk/hello</code> - Эта страница
					</li>
					<li>
						• <code>/uk/simple</code> - Простая тестовая страница
					</li>
				</ul>
			</div>
		</div>
	);
}
