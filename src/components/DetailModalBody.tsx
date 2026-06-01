import { notFound } from "next/navigation";
import { loadDetail, type DetailGroup } from "@/content/mdx";
import Modal from "./Modal";
import DetailContent from "./DetailContent";

// Detail content rendered inside the modal shell — used by intercepting routes
// for in-site navigation (spec §5.5).
export default function DetailModalBody({
	group,
	slug,
}: {
	group: DetailGroup;
	slug: string;
}) {
	const doc = loadDetail(group, slug);
	if (!doc) notFound();
	return (
		<Modal>
			<DetailContent doc={doc} />
		</Modal>
	);
}
