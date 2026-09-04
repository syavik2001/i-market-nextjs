"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { TFormRegisterValues, formRegisterSchema } from "./modals/auth-modal/forms/schemas";
import { User } from "@prisma/client";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import { Container } from "./container";
import { Title } from "./title";
import { FormInput } from "./form";
import { Button } from "../ui";
import { updateUserInfo } from "@/app/actions";

import { useLocaleStore } from "@/shared/store";

interface Props {
	data: User;
}

export const ProfileForm: React.FC<Props> = ({ data }) => {
	const { t, locale } = useLocaleStore();
	const form = useForm({
		resolver: zodResolver(formRegisterSchema),
		defaultValues: {
			fullName: data.fullName,
			email: data.email,
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit = async (formData: TFormRegisterValues) => {
		try {
			await updateUserInfo({
				email: formData.email,
				fullName: formData.fullName,
				password: formData.password,
			});

			// Очищаем поля пароля после успешного обновления
			form.setValue("password", "");
			form.setValue("confirmPassword", "");

			toast.success(locale === "en" ? "Data updated 📝" : "Дані оновлено 📝", {
				icon: "✅",
			});
		} catch (error) {
			return toast.error(locale === "en" ? "Error updating data" : "Помилка при оновленні даних", {
				icon: "❌",
			});
		}
	};

	const onClickSignOut = () => {
		signOut({
			callbackUrl: "/",
		});
	};

	return (
		<Container className="my-4 sm:my-8 md:my-10">
			<Title text={`${t.profile.title} | #${data.fullName}`} size="md" className="font-bold" />

			<FormProvider {...form}>
				<form
					className="flex flex-col gap-4 sm:gap-5 w-full mt-6 sm:mt-10"
					onSubmit={form.handleSubmit(onSubmit)}>
					<FormInput name="email" label={t.profile.email} required />
					<FormInput name="fullName" label={t.profile.fullName} required />

					<FormInput type="password" name="password" label={t.profile.newPassword} required />
					<FormInput type="password" name="confirmPassword" label={t.profile.confirmPassword} required />

					<Button
						disabled={form.formState.isSubmitting}
						className="text-base mt-6 sm:mt-10 w-full"
						type="submit">
						{t.profile.saveChanges}
					</Button>

					<Button
						onClick={onClickSignOut}
						variant="secondary"
						disabled={form.formState.isSubmitting}
						className="text-base w-full"
						type="button">
						{t.profile.signOut}
					</Button>
				</form>
			</FormProvider>
		</Container>
	);
};
