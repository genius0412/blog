import DetailModalBody from "@/components/DetailModalBody";

export default function InterceptedResearch({ params }: { params: { slug: string } }) {
	return <DetailModalBody group="research" slug={params.slug} />;
}
