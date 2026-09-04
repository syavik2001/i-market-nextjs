"use client";

import React from "react";
import Script from "next/script"; // ⬅️ добавь
import { WhiteBlock } from "../white-block";
import { FormTextarea } from "../form";
import { AdressInput } from "../address-input";
import { Controller, useFormContext } from "react-hook-form";
import { ErrorText } from "../error-text";

import { useLocaleStore } from "@/shared/store";

interface Props {
	className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
	const { control } = useFormContext();
	const { t } = useLocaleStore();

	return (
		<>
			<WhiteBlock title={t.checkout.deliveryAddress} className={className}>
				<div className="flex flex-col gap-5">
					<Controller
						control={control}
						name="address"
						render={({ field, fieldState }) => (
							<>
								<AdressInput onChange={field.onChange} />
								{fieldState.error?.message && <ErrorText text={fieldState.error.message} />}
							</>
						)}
					/>

					<FormTextarea
						name="comment"
						className="text-base"
						placeholder={t.checkout.comment}
						rows={5}
					/>
				</div>
			</WhiteBlock>
		</>
	);
};
