"use client";
import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function HomeClientToast() {
	const searchParams = useSearchParams();
	const shownRef = useRef(false);

	// Добавляем глобальную функцию для очистки localStorage (для отладки)
	if (typeof window !== "undefined") {
		(window as any).clearPaidToast = () => {
			window.localStorage.removeItem("paid-toast-shown");
			console.log("🧹 Toast client: localStorage cleared");
		};
	}

	useEffect(() => {
		const paid = searchParams.get("paid");
		console.log("🔍 Toast client: paid parameter =", paid);

		if (!paid) {
			console.log("🔍 Toast client: no paid parameter, exiting");
			return;
		}

		if (shownRef.current) {
			console.log("🔍 Toast client: already shown in this render");
			return;
		}

		shownRef.current = true;

		if (paid === "success") {
			console.log("🎉 Toast client: showing success toast");
			toast.success("Оплата успішна! Дякуємо за замовлення.", {
				duration: 4000,
				icon: "✅",
			});
		}
		if (paid === "fail") {
			console.log("❌ Toast client: showing fail toast");
			toast.error("Оплата не вдалася. Спробуйте ще раз.", {
				duration: 4000,
				icon: "❌",
			});
		}

		// Удаляем параметр из URL без перезагрузки
		const params = new URLSearchParams(window.location.search);
		params.delete("paid");
		const newUrl = window.location.pathname + (params.toString() ? `?${params.toString()}` : "");
		window.history.replaceState({}, "", newUrl);
	}, [searchParams]);

	return null;
}
