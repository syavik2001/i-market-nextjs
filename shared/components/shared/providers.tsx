"use client";

import React from "react";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import NextTopLoader from "nextjs-toploader";
import { LocaleProvider } from "@/shared/store/locale";
import { Locale } from "@/shared/constants/locales";

interface Props extends React.PropsWithChildren {
	initialLocale?: Locale;
}

export const Providers: React.FC<Props> = ({ children, initialLocale = "uk" }) => {
	return (
		<LocaleProvider initialLocale={initialLocale}>
			<SessionProvider>{children}</SessionProvider>
			<Toaster />
			<NextTopLoader />
		</LocaleProvider>
	);
};
