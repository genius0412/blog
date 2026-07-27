// Emits a JSON-LD block. Server-rendered so crawlers see it in the initial HTML.
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
	return (
		<script
			type="application/ld+json"
			// Escaping "<" keeps a stray "</script>" inside content from closing the tag.
			dangerouslySetInnerHTML={{
				__html: JSON.stringify({ "@context": "https://schema.org", ...data }).replace(
					/</g,
					"\\u003c",
				),
			}}
		/>
	);
}
