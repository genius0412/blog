import { ImageResponse } from "next/og";
import { profile } from "@/content/data";
import { OG_IMAGE_ALT } from "@/lib/seo";

// Site-wide social card. Next serves this for Open Graph and, absent a
// twitter-image, for Twitter/X too. Generated at build time.
//
// Deliberately dark: a link preview sits inside someone else's chat bubble, and
// the site's cream background disappeared against the white cards iMessage and
// Slack draw. Ink ground + terracotta accent keeps the brand while actually
// holding an edge. Palette matches tailwind.config.ts, with the accent lifted
// from #b0542c to #e0824c so it carries on a dark ground.
export const alt = OG_IMAGE_ALT;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#1f2421";
const CREAM = "#faf8f5";
const MUTED = "#a9a29a";
const ACCENT = "#e0824c";

/**
 * Fetch one Google font as a TTF that satori can parse.
 *
 * Satori can't read woff2, which is what the css2 endpoint serves to modern
 * clients — hence the ancient user-agent, which makes it fall back to truetype.
 * Returns null on any failure: the card must still render (in satori's default
 * font) if the network is unavailable, so a build never breaks over a webfont.
 */
async function loadFont(query: string): Promise<ArrayBuffer | null> {
	try {
		const css = await fetch(`https://fonts.googleapis.com/css2?family=${query}&display=swap`, {
			headers: {
				"User-Agent":
					"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/533.20.25 (KHTML, like Gecko) Version/5.1 Safari/533.20.27",
			},
			signal: AbortSignal.timeout(5000),
		});
		if (!css.ok) return null;
		const url = (await css.text()).match(/src:\s*url\((https:[^)]+)\)/)?.[1];
		if (!url) return null;
		const font = await fetch(url, { signal: AbortSignal.timeout(5000) });
		return font.ok ? await font.arrayBuffer() : null;
	} catch {
		return null;
	}
}

export default async function OpengraphImage() {
	// Three strongest credentials, straight from the profile data.
	const stats = profile.stats.slice(0, 3);

	// Same two families the site uses (next/font in layout.tsx). Fetched in
	// parallel; either may come back null and the card still renders.
	const [serif, sans] = await Promise.all([
		loadFont("Fraunces:opsz,wght@9..144,700"),
		loadFont("Inter:wght@400"),
	]);
	const fonts = [
		...(serif ? [{ name: "Fraunces", data: serif, weight: 700 as const, style: "normal" as const }] : []),
		...(sans ? [{ name: "Inter", data: sans, weight: 400 as const, style: "normal" as const }] : []),
	];
	// Referencing a family that failed to load would leave satori without a
	// match, so only name it when it's actually present.
	const serifFamily = serif ? "Fraunces" : undefined;
	const sansFamily = sans ? "Inter" : undefined;

	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					backgroundColor: INK,
					// Warm bloom in the top corner, so the ground isn't a flat slab.
					// Satori only parses the `circle at x% y%` form — an explicit
					// `900px 500px at ...` size throws at build time.
					backgroundImage:
						"radial-gradient(circle at 88% 0%, rgba(224,130,76,0.34), rgba(31,36,33,0) 55%)",
					padding: "70px 76px",
					fontFamily: sansFamily,
				}}
			>
				{/* Wordmark rule */}
				<div style={{ display: "flex", alignItems: "center", gap: 16 }}>
					<div style={{ display: "flex", width: 40, height: 4, backgroundColor: ACCENT }} />
					<div
						style={{
							fontSize: 22,
							letterSpacing: "0.18em",
							color: MUTED,
							textTransform: "uppercase",
						}}
					>
						dohunkim.xyz
					</div>
				</div>

				{/* Name + tagline */}
				<div style={{ display: "flex", flexDirection: "column" }}>
					<div
						style={{
							fontFamily: serifFamily,
							fontSize: 104,
							fontWeight: 700,
							color: CREAM,
							letterSpacing: "-0.025em",
							lineHeight: 1,
						}}
					>
						{profile.name}
					</div>
					<div
						style={{
							marginTop: 26,
							fontSize: 38,
							lineHeight: 1.25,
							color: MUTED,
							maxWidth: 860,
						}}
					>
						{profile.tagline}
					</div>
				</div>

				{/* Credential row */}
				<div style={{ display: "flex", gap: 18 }}>
					{stats.map((s) => (
						<div
							key={s.label}
							style={{
								display: "flex",
								flexDirection: "column",
								padding: "20px 28px",
								borderRadius: 18,
								backgroundColor: "rgba(250,248,245,0.05)",
								border: "1px solid rgba(250,248,245,0.12)",
							}}
						>
							<div
								style={{
									fontFamily: serifFamily,
									fontSize: 40,
									fontWeight: 700,
									color: ACCENT,
									lineHeight: 1,
								}}
							>
								{s.value}
							</div>
							<div style={{ marginTop: 10, fontSize: 21, color: MUTED }}>{s.label}</div>
						</div>
					))}
				</div>
			</div>
		),
		{ ...size, ...(fonts.length ? { fonts } : {}) },
	);
}
