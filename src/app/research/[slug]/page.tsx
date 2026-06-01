import type { Metadata } from "next";
import { loadDetail, detailParamsForGroup } from "@/content/mdx";
import DetailStandalone from "@/components/DetailStandalone";

const GROUP = "research" as const;

export function generateStaticParams() {
	return detailParamsForGroup(GROUP);
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
	const doc = loadDetail(GROUP, params.slug);
	return { title: doc?.meta.title, description: doc?.meta.description };
}

export default function Page({ params }: { params: { slug: string } }) {
	return <DetailStandalone group={GROUP} slug={params.slug} />;
}
