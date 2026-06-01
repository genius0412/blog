import type { IconType } from "react-icons";
import {
	FiActivity,
	FiBookOpen,
	FiBookmark,
	FiCode,
	FiCpu,
	FiDivideSquare,
	FiMusic,
	FiTerminal,
} from "react-icons/fi";
import type { Category } from "@/content/data";

// Per-category accent (icon + color) used to make sections skimmable.
// Colors are written as literal Tailwind classes so they survive purge —
// never build these strings dynamically.
export type CategoryStyle = {
	Icon: IconType;
	text: string; // icon / label color
	bg: string; // soft fill for the icon chip
	border: string; // chip border
	barL: string; // card left-accent border color
	dot: string; // nav / line-item dot
};

export const categoryStyle: Record<Category, CategoryStyle> = {
	research: { Icon: FiBookOpen, text: "text-indigo-700", bg: "bg-indigo-50", border: "border-indigo-200", barL: "border-l-indigo-400", dot: "bg-indigo-500" },
	robotics: { Icon: FiCpu, text: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200", barL: "border-l-amber-400", dot: "bg-amber-500" },
	math: { Icon: FiDivideSquare, text: "text-blue-700", bg: "bg-blue-50", border: "border-blue-200", barL: "border-l-blue-400", dot: "bg-blue-500" },
	cp: { Icon: FiTerminal, text: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200", barL: "border-l-emerald-400", dot: "bg-emerald-500" },
	software: { Icon: FiCode, text: "text-violet-700", bg: "bg-violet-50", border: "border-violet-200", barL: "border-l-violet-400", dot: "bg-violet-500" },
	music: { Icon: FiMusic, text: "text-rose-700", bg: "bg-rose-50", border: "border-rose-200", barL: "border-l-rose-400", dot: "bg-rose-500" },
	athletics: { Icon: FiActivity, text: "text-teal-700", bg: "bg-teal-50", border: "border-teal-200", barL: "border-l-teal-400", dot: "bg-teal-500" },
	education: { Icon: FiBookmark, text: "text-stone-600", bg: "bg-stone-100", border: "border-stone-200", barL: "border-l-stone-400", dot: "bg-stone-400" },
};
