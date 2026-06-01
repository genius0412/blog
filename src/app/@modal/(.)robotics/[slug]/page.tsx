import DetailModalBody from "@/components/DetailModalBody";

export default function InterceptedRobotics({ params }: { params: { slug: string } }) {
	return <DetailModalBody group="robotics" slug={params.slug} />;
}
