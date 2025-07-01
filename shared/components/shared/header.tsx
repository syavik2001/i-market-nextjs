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
				<Container className="flex items-center gap-8 py-8">
					{/* Левая часть */}
					<Link href="/">
						<div className="flex items-center gap-4">
							<Image src="/logo.png" alt="Logo" width={35} height={35} />
							<div>
								<h1 className="text-2xl uppercase font-black">NEXT PIZZA</h1>
								<p className="text-sm text-gray-400 leading-3">найсмачнюча піца</p>
							</div>
						</div>
					</Link>

					{hasSearch && (
						<div className="w-[400px]">
							<SearchInput />
						</div>
					)}

					{/* Правая часть */}
					<div className="flex items-center gap-3 ml-auto">
						<AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
						<ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />

						{hasCart && <CartButton />}
					</div>
				</Container>
			</header>

			{/*{openAuthModal && <div>Modal Open</div>}*/}
		</>
	);
};
