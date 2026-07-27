import { notFound } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { loadDetail, type DetailGroup } from "@/content/mdx";
import DetailContent from "./DetailContent";
import Footer from "./Footer";
import JsonLd from "./JsonLd";
import { detailYear } from "@/lib/detailSeo";
import { SITE_NAME, SITE_URL, absoluteUrl, markdownToPlainText, truncateForMeta } from "@/lib/seo";

// Full standalone page for a detail route — rendered on direct visit / refresh
// / new tab (spec §5.5).
export default function DetailStandalone({
	group,
	slug,
}: {
	group: DetailGroup;
	slug: string;
}) {
	const doc = loadDetail(group, slug);
	if (!doc) notFound();

	const url = absoluteUrl(`/${group}/${slug}`);
	const description = doc.meta.description?.trim()
		? truncateForMeta(doc.meta.description)
		: truncateForMeta(markdownToPlainText(doc.body));
	const year = detailYear(doc.meta.date);

	return (
		<>
			{/* Structured data lives on the standalone route only — the intercepted
			    modal renders at whatever URL the visitor was already on. */}
			<JsonLd
				data={{
					"@graph": [
						{
							"@type": doc.meta.kind === "research" ? "ScholarlyArticle" : "CreativeWork",
							"@id": `${url}#work`,
							mainEntityOfPage: url,
							url,
							name: doc.meta.title,
							headline: doc.meta.title,
							description,
							inLanguage: "en-US",
							author: { "@type": "Person", name: SITE_NAME, url: SITE_URL },
							...(year ? { datePublished: year } : {}),
							...(doc.meta.links?.length
								? { sameAs: doc.meta.links.map((l) => l.href) }
								: {}),
						},
						{
							"@type": "BreadcrumbList",
							itemListElement: [
								{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
								{
									"@type": "ListItem",
									position: 2,
									name: "Portfolio",
									item: absoluteUrl("/portfolio"),
								},
								{ "@type": "ListItem", position: 3, name: doc.meta.title, item: url },
							],
						},
					],
				}}
			/>
			<main id="main-content" tabIndex={-1} className="mx-auto max-w-3xl px-5 pb-16 pt-10 sm:px-8">
				<Link
					href="/portfolio"
					className="inline-flex items-center gap-1 text-sm text-muted hover:text-accent"
				>
					<FiArrowLeft className="h-4 w-4" />
					Back to portfolio
				</Link>
				<div className="mt-6">
					<DetailContent doc={doc} />
				</div>
			</main>
			<Footer />
		</>
	);
}
