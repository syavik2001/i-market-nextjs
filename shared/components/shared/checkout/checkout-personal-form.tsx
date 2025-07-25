import React from "react";
import { WhiteBlock } from "../white-block";
import { FormInput } from "../form";

interface Props {
	className?: string;
}

export const CheckoutPersonalForm: React.FC<Props> = ({ className }) => {
	return (
		<WhiteBlock title="2. Персональні дані" className={className}>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 1100:gap-5">
				<FormInput name="firstName" className="text-sm 1100:text-base" placeholder="Ім'я" />
				<FormInput name="lastName" className="text-sm 1100:text-base" placeholder="Прізвище" />
				<FormInput name="email" className="text-sm 1100:text-base" placeholder="E-Mail" />
				<FormInput name="phone" className="text-sm 1100:text-base" placeholder="Телефон" />
			</div>
		</WhiteBlock>
	);
};
