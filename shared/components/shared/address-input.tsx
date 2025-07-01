"use client";

import React, { useEffect } from "react";
import { useAddressAutocomplete } from "@/shared/lib/useAddressAutocomplete";

interface Props {
	onChange?: (value: string) => void;
}

export const AdressInput: React.FC<Props> = ({ onChange }) => {
	const { inputRef, value, setValue, ready } = useAddressAutocomplete();

	// Проброс значения наружу
	useEffect(() => {
		onChange?.(value);
	}, [value]);

	return (
		<input
			ref={inputRef}
			disabled={!ready}
			value={value}
			onChange={(e) => setValue(e.target.value)}
			placeholder="Введіть адресу"
			className="w-full px-4 py-3 text-base border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
		/>
	);
};
