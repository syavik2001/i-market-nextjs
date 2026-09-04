"use client";

import React from "react";
import { WhiteBlock } from "../white-block";
import { FormInput } from "../form";
import { useLocaleStore } from "@/shared/store";

interface Props {
	className?: string;
}

export const CheckoutPersonalForm: React.FC<Props> = ({ className }) => {
	const { t } = useLocaleStore();

	return (
		<WhiteBlock title={t.checkout.personalInfo} className={className}>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 1100:gap-5">
				<FormInput name="firstName" className="text-sm 1100:text-base" placeholder={t.checkout.firstName} />
				<FormInput name="lastName" className="text-sm 1100:text-base" placeholder={t.checkout.lastName} />
				<FormInput name="email" className="text-sm 1100:text-base" placeholder={t.checkout.email} />
				<FormInput name="phone" className="text-sm 1100:text-base" placeholder={t.checkout.phone} />
			</div>
		</WhiteBlock>
	);
};
