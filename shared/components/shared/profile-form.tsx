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

interface Props {
	data: User;
}

export const ProfileForm: React.FC<Props> = ({ data }) => {
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

			toast.success("Дані оновлено 📝", {
				icon: "✅",
			});
		} catch (error) {
			return toast.error("Помилка при оновленні даних", {
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
			<Title text={`Особисті дані | #${data.fullName}`} size="md" className="font-bold" />

			<FormProvider {...form}>
				<form
					className="flex flex-col gap-4 sm:gap-5 w-full mt-6 sm:mt-10"
					onSubmit={form.handleSubmit(onSubmit)}>
					<FormInput name="email" label="E-Mail" required />
					<FormInput name="fullName" label="Повне ім'я" required />

					<FormInput type="password" name="password" label="Новий пароль" required />
					<FormInput type="password" name="confirmPassword" label="Повторіть пароль" required />

					<Button
						disabled={form.formState.isSubmitting}
						className="text-base mt-6 sm:mt-10 w-full"
						type="submit">
						Зберегти
					</Button>

					<Button
						onClick={onClickSignOut}
						variant="secondary"
						disabled={form.formState.isSubmitting}
						className="text-base w-full"
						type="button">
						Вийти
					</Button>
				</form>
			</FormProvider>
		</Container>
	);
};
