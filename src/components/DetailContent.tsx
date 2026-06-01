import Markdown from "markdown-to-jsx";
import type { DetailDoc } from "@/content/mdx";
import LinkList from "./ui/LinkList";

// Renders a detail document in the order specified by §6:
// title + date → description → role → links → body → people → log.
export default function DetailContent({ doc }: { doc: DetailDoc }) {
	const { meta, body } = doc;

	return (
		<article>
			<header>
				<div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
					<h1 className="font-serif text-3xl font-semibold text-ink sm:text-4xl">
						{meta.title}
					</h1>
					{meta.date ? <span className="text-muted">{meta.date}</span> : null}
				</div>
				{meta.description ? (
					<p className="mt-3 text-lg leading-relaxed text-muted">{meta.description}</p>
				) : null}
				{meta.role ? (
					<p className="mt-2 text-sm font-medium text-ink">
						<span className="text-muted">Role: </span>
						{meta.role}
					</p>
				) : null}
				{meta.links?.length ? (
					<div className="mt-4">
						<LinkList links={meta.links} />
					</div>
				) : null}
			</header>

			<hr className="my-6 border-border" />

			<div className="prose-warm">
				<Markdown>{body}</Markdown>
			</div>

			{meta.people?.length ? (
				<section className="mt-8">
					<h2 className="font-serif text-lg font-semibold text-ink">People & credits</h2>
					<ul className="mt-2 list-disc space-y-1 pl-5 text-muted">
						{meta.people.map((p) => (
							<li key={p}>{p}</li>
						))}
					</ul>
				</section>
			) : null}

			{meta.log?.length ? (
				<section className="mt-8">
					<h2 className="font-serif text-lg font-semibold text-ink">Work log</h2>
					<ul className="mt-3 space-y-3">
						{meta.log.map((entry, i) => (
							<li key={`${entry.date}-${i}`} className="flex gap-3 text-sm">
								<span className="shrink-0 font-mono text-muted">{entry.date}</span>
								<span className="text-ink">{entry.entry}</span>
							</li>
						))}
					</ul>
				</section>
			) : null}
		</article>
	);
}
