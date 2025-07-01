"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/shared/lib/utils";
import { Globe } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";

interface Props {
	className?: string;
}

export const LanguageSwitcher: React.FC<Props> = ({ className }) => {
	const locale = useLocale();
	const router = useRouter();
	const pathname = usePathname();
	const t = useTranslations();
	const [open, setOpen] = React.useState(false);

	const languages = [
		{ code: "uk", name: t("ukrainian"), flag: "🇺🇦" },
		{ code: "en", name: t("english"), flag: "🇺🇸" },
	];

	const currentLanguage = languages.find((lang) => lang.code === locale);

	const handleLanguageChange = (newLocale: string) => {
		// Создаем новый путь с новой локалью
		const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
		router.push(newPath);
		setOpen(false);
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<button
					className={cn(
						"inline-flex items-center gap-2 bg-gray-50 px-4 h-11 rounded-2xl cursor-pointer hover:bg-gray-100 transition-colors",
						className,
					)}>
					<Globe className="w-4 h-4" />
					<span className="text-sm font-medium">{currentLanguage?.flag}</span>
				</button>
			</PopoverTrigger>
			<PopoverContent className="w-48">
				<div className="space-y-1">
					{languages.map((language) => (
						<button
							key={language.code}
							className={cn(
								"w-full flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 transition-colors",
								locale === language.code && "bg-gray-100",
							)}
							onClick={() => handleLanguageChange(language.code)}>
							<span className="text-lg">{language.flag}</span>
							<span className="text-sm font-medium">{language.name}</span>
						</button>
					))}
				</div>
			</PopoverContent>
		</Popover>
	);
};
