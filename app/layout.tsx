import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Providers } from "@/shared/components/shared/providers";
import { ProductModal } from "@/shared/components/shared";
import { Toaster } from "react-hot-toast";
import { cookies } from "next/headers";
import { Locale } from "@/shared/constants/locales";

const nunito = Nunito({
	subsets: ["cyrillic"],
	variable: "--font-nunito",
	weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
	title: "i-market",
	description: "Pizza delivery",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const cookieStore = cookies();
	const localeCookie = cookieStore.get("locale")?.value;
	const initialLocale: Locale = localeCookie === "en" ? "en" : "uk";

	return (
		<html lang={initialLocale}>
			<head>
				<link data-rh="true" rel="icon" href="/logo.png" />
			</head>
			<body className={nunito.className}>
				<Providers initialLocale={initialLocale}>
					<Toaster position="top-center" />
					{children}
					<ProductModal />
				</Providers>
			</body>
		</html>
	);
}
