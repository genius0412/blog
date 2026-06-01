import DetailModalBody from "@/components/DetailModalBody";

export default function InterceptedProjects({ params }: { params: { slug: string } }) {
	return <DetailModalBody group="projects" slug={params.slug} />;
}
