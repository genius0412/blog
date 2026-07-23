import { notFound } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { loadDetail, type DetailGroup } from "@/content/mdx";
import DetailContent from "./DetailContent";
import Footer from "./Footer";

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

	return (
		<>
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
