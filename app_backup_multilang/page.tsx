import { redirect } from "next/navigation";

export default function RootPage() {
	// Middleware автоматически обработает редирект
	// Но на всякий случай добавим fallback
	redirect("/uk");
}
