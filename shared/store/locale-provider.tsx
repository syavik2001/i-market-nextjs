"use client";

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import { dictionaries, Locale } from "../constants/locales";

export interface LocaleContextProps {
	locale: Locale;
	t: typeof dictionaries.uk;
	setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextProps>({
	locale: "uk",
	t: dictionaries.uk,
	setLocale: () => {},
});

export const LocaleProvider: React.FC<{
	initialLocale?: Locale;
	children: React.ReactNode;
}> = ({ initialLocale = "uk", children }) => {
	const [locale, setLocaleState] = useState<Locale>(initialLocale);

	useEffect(() => {
		if (typeof window !== "undefined") {
			const saved = localStorage.getItem("locale") as Locale;
			if (saved && (saved === "uk" || saved === "en") && saved !== locale) {
				setLocaleState(saved);
			}
		}
	}, []);

	const setLocale = useCallback((newLocale: Locale) => {
		setLocaleState(newLocale);
		if (typeof window !== "undefined") {
			localStorage.setItem("locale", newLocale);
			document.cookie = `locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
		}
	}, []);

	const t = useMemo(() => dictionaries[locale] || dictionaries.uk, [locale]);

	const value = useMemo(() => ({ locale, t, setLocale }), [locale, t, setLocale]);

	return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};

export const useLocaleStore = <T = LocaleContextProps>(selector?: (state: LocaleContextProps) => T): T => {
	const context = useContext(LocaleContext);
	if (selector) {
		return selector(context);
	}
	return context as unknown as T;
};
