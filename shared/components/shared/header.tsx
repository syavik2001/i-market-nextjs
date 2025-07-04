"use client";

import { cn } from "@/shared/lib/utils";
import React from "react";
import { Container } from "./container";
import Image from "next/image";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { CartButton } from "./cart-button";
import { ProfileButton } from "./profile-button";
import { AuthModal } from "./modals";

interface Props {
	hasSearch?: boolean;
	hasCart?: boolean;
	className?: string;
}

export const Header: React.FC<Props> = ({ hasSearch = true, hasCart = true, className }) => {
	const [openAuthModal, setOpenAuthModal] = React.useState(false);

	return (
		<>
			<header className={cn("border-b", className)}>
				<Container className="flex flex-col md:flex-row items-center py-4 md:py-8">
					<div className="flex flex-col sm:flex-row items-center gap-2 md:gap-4 w-full">
						{/* Desktop/Tablet: логотип и кнопки */}
						<div className="hidden sm:flex flex-row items-center gap-2 md:gap-4 w-full">
							<Link href="/">
								<div className="flex flex-row items-center gap-2 md:gap-4">
									<Image src="/logo.png" alt="Logo" width={35} height={35} />
									<div className="flex flex-col items-center md:items-start">
										<h1 className="text-xl md:text-2xl uppercase font-black whitespace-nowrap">
											NEXT PIZZA
										</h1>
										<p className="text-xs md:text-sm text-gray-400 leading-3">найсмачнюча піца</p>
									</div>
								</div>
							</Link>
							{hasSearch && (
								<div className="hidden md:block md:w-[220px] lg:w-[300px] xl:w-[400px] md:ml-6">
									<SearchInput />
								</div>
							)}
							<div className="flex flex-row items-center gap-2 md:gap-3 ml-auto">
								<AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
								<ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
								{hasCart && <CartButton />}
							</div>
						</div>
						{/* Mobile: логотип слева, кнопки справа, <500px — кнопки на новой строке */}
						<div className="sm:hidden mt-2 w-full">
							<div className="flex flex-row items-center justify-between w-full max-[499px]:mb-2">
								<Link href="/">
									<div className="flex flex-row items-center gap-2">
										<Image src="/logo.png" alt="Logo" width={35} height={35} />
										<div className="flex flex-col items-start">
											<h1 className="text-xl uppercase font-black whitespace-nowrap">NEXT PIZZA</h1>
											<p className="text-xs text-gray-400 leading-3">найсмачнюча піца</p>
										</div>
									</div>
								</Link>
								<div className="flex flex-row items-center gap-2 max-[499px]:hidden">
									<AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
									<ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
									{hasCart && <CartButton />}
								</div>
							</div>
							<div className="hidden max-[499px]:flex flex-row items-center justify-end gap-2 w-full">
								<AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
								<ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
								{hasCart && <CartButton />}
							</div>
						</div>
					</div>
					{hasSearch && (
						<div className="block md:hidden w-full max-w-full min-w-0 mx-auto mt-2">
							<SearchInput />
						</div>
					)}
				</Container>
			</header>

			{/*{openAuthModal && <div>Modal Open</div>}*/}
		</>
	);
};
