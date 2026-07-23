"use client";

import { useEffect, useState } from "react";
import { FiCornerDownRight } from "react-icons/fi";
import { categoryMeta } from "@/content/data";
import { categoryStyle } from "@/components/ui/categoryStyle";

// Sticky in-page nav for the portfolio sections. Progressive enhancement over
// plain "#id" anchors: it scroll-spies the section you're in (aria-current) and,
// on click, moves keyboard focus into the target section for screen-reader users.
export default function PortfolioJumpNav() {
	const [activeId, setActiveId] = useState<string>("");

	useEffect(() => {
		const sections = categoryMeta
			.map((c) => document.getElementById(c.id))
			.filter((el): el is HTMLElement => el !== null);
		if (sections.length === 0) return;

		// The "current" section is the last one whose top has scrolled past a line
		// just below the two sticky bars (header ≈64px + this nav ≈45px). Computed
		// straight from the scroll handler; setActiveId with an unchanged value is a
		// no-op re-render, so this stays cheap without extra throttling.
		const compute = () => {
			const line = 130; // px from viewport top
			let current = sections[0].id;
			for (const el of sections) {
				if (el.getBoundingClientRect().top <= line) current = el.id;
			}
			setActiveId(current);
		};

		compute(); // set initial state
		window.addEventListener("scroll", compute, { passive: true });
		window.addEventListener("resize", compute, { passive: true });
		return () => {
			window.removeEventListener("scroll", compute);
			window.removeEventListener("resize", compute);
		};
	}, []);

	const handleJump = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
		const el = document.getElementById(id);
		if (!el) return; // fall back to the native anchor jump
		e.preventDefault();
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
		history.replaceState(null, "", `#${id}`);
		setActiveId(id);
		// Move focus into the section so keyboard/SR users land where they jumped.
		el.focus({ preventScroll: true });
	};

	return (
		<nav
			aria-label="Jump to section"
			className="sticky top-16 z-30 -mx-5 border-y border-border bg-bg/90 px-5 py-2.5 backdrop-blur-sm sm:-mx-8 sm:px-8"
		>
			<div className="flex items-center gap-3 text-sm">
				<span className="flex shrink-0 items-center gap-1.5 font-medium text-ink">
					<FiCornerDownRight className="h-4 w-4 text-muted" aria-hidden />
					Jump to
				</span>
				<span aria-hidden className="h-5 w-px shrink-0 bg-border" />
				<ul className="flex gap-x-1 overflow-x-auto whitespace-nowrap">
					{categoryMeta.map((c) => {
						const active = activeId === c.id;
						return (
							<li key={c.id}>
								<a
									href={`#${c.id}`}
									aria-current={active ? "true" : undefined}
									onClick={(e) => handleJump(e, c.id)}
									className={
										"inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-colors " +
										(active
											? "bg-accent-soft font-medium text-accent"
											: "text-muted hover:bg-surface hover:text-ink")
									}
								>
									<span
										className={`h-2 w-2 rounded-full ${categoryStyle[c.id].dot}`}
										aria-hidden
									/>
									{c.label}
								</a>
							</li>
						);
					})}
				</ul>
			</div>
		</nav>
	);
}
