import type { Metadata } from "next";
import { detailParamsForGroup } from "@/content/mdx";
import { detailMetadata } from "@/lib/detailSeo";
import DetailStandalone from "@/components/DetailStandalone";

const GROUP = "projects" as const;

export function generateStaticParams() {
	return detailParamsForGroup(GROUP);
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
	return detailMetadata(GROUP, params.slug);
}

export default function Page({ params }: { params: { slug: string } }) {
	return <DetailStandalone group={GROUP} slug={params.slug} />;
}
