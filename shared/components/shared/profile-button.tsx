import { useSession } from "next-auth/react";
import React from "react";
import { Button } from "../ui/button";
import { CircleUser, User } from "lucide-react";
import Link from "next/link";

import { useLocaleStore } from "@/shared/store";

interface Props {
	onClickSignIn?: () => void;
	className?: string;
}

export const ProfileButton: React.FC<Props> = ({ className, onClickSignIn }) => {
	const { data: session } = useSession();
	const { t } = useLocaleStore();

	return (
		<div className={className}>
			{!session ? (
				<Button onClick={onClickSignIn} variant="outline" className="flex items-center gap-1">
					<User size={16} />
					{t.header.signIn}
				</Button>
			) : (
				<Link href="/profile">
					<Button variant="secondary" className="flex items-center gap-2">
						<CircleUser size={18} />
						{t.header.profile}
					</Button>
				</Link>
			)}
		</div>
	);
};
