"use client";

import Link from "next/link";
import Image from "next/image";
import ProfilePicture from "../../public/images/profile.jpg";
import { useActivePath } from "./useActivePath";

type NavItem = { href: string; name: string };

const navItems: NavItem[] = [
	{ href: "/portfolio", name: "Portfolio" },
	{ href: "/blog", name: "Blog" },
	{ href: "/resume", name: "Résumé" },
];

const Header = () => {
	const checkActivePath = useActivePath();

	const onHome = checkActivePath("/");

	return (
		<header className="sticky top-0 z-40 w-full border-b border-border bg-bg/85 backdrop-blur-sm">
			<div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8">
				<Link
					href="/"
					aria-current={onHome ? "page" : undefined}
					className="flex items-center gap-3 rounded-md"
				>
					<Image
						src={ProfilePicture}
						alt=""
						aria-hidden
						className="h-9 w-9 rounded-full border border-border object-cover"
					/>
					<span className="font-serif text-lg font-semibold text-ink">Dohun Kim</span>
				</Link>

				<nav aria-label="Primary" className="flex items-center gap-5 sm:gap-7">
					{navItems.map((item) => {
						const active = checkActivePath(item.href);
						return (
							<Link
								key={item.href}
								href={item.href}
								aria-current={active ? "page" : undefined}
								className={
									"rounded-md text-sm transition-colors sm:text-base " +
									(active
										? "font-semibold text-accent"
										: "text-muted hover:text-ink")
								}
							>
								{item.name}
							</Link>
						);
					})}
				</nav>
			</div>
		</header>
	);
};

export default Header;
