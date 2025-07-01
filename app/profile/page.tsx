"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ProfileForm } from "@/shared/components/shared/profile-form";
import { Header } from "@/shared/components/shared";

export default function ProfilePage() {
	const { data: session, status } = useSession();

	if (status === "loading") {
		return <div>Завантаження...</div>;
	}

	if (!session) {
		redirect("/not-auth");
	}

	// Создаем объект пользователя из сессии
	const userData = {
		id: Number(session.user.id),
		email: session.user.email || "",
		fullName: session.user.fullName || session.user.name || "",
		password: "",
		role: session.user.role,
		verified: null,
		provider: null,
		providerId: null,
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<Header hasSearch={false} hasCart={false} />

			<div className="container mx-auto max-w-2xl py-10">
				<h1 className="text-3xl font-bold mb-8">Мій профіль</h1>
				<ProfileForm data={userData} />
			</div>
		</div>
	);
}
