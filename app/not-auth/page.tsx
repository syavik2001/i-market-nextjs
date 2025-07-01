import Link from "next/link";
import { Button } from "@/shared/components/ui/button";

export default function NotAuthPage() {
	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center">
			<div className="text-center">
				<div className="mb-8">
					<img src="/assets/images/lock.png" alt="Lock" className="w-24 h-24 mx-auto mb-4" />
					<h1 className="text-3xl font-bold mb-4">Доступ заборонено</h1>
					<p className="text-gray-600 mb-8">
						Для доступу до цієї сторінки потрібно увійти в систему
					</p>
				</div>

				<div className="space-y-4">
					<Link href="/">
						<Button className="w-full">Повернутися на головну</Button>
					</Link>
					<Link href="/api/auth/signin">
						<Button variant="outline" className="w-full">
							Увійти в систему
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
