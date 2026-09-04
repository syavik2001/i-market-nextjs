import { z } from "zod";
import { dictionaries } from "./locales";

export const getCheckoutFormSchema = (t: typeof dictionaries.uk) =>
	z.object({
		firstName: z.string().min(2, { message: t.checkout.validation?.firstNameMin || "Ім'я має містити не менше 2-х символів" }),
		lastName: z.string().min(2, { message: t.checkout.validation?.lastNameMin || "Прізвище має містити не менше 2-х символів" }),
		email: z.string().email({ message: t.checkout.validation?.emailInvalid || "Введіть коректну пошту" }),
		phone: z.string().min(10, { message: t.checkout.validation?.phoneInvalid || "Введіть коректний номер телефону" }),
		address: z.string().min(5, { message: t.checkout.validation?.addressInvalid || "Введіть коректну адресу" }),
		comment: z.string().optional(),
	});

export const checkoutFormSchema = getCheckoutFormSchema(dictionaries.uk);

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
