import fs from "fs";
import path from "path";
import { ImageResponse } from "next/og";
import { profile } from "@/content/data";
import { OG_IMAGE_ALT } from "@/lib/seo";

// Site-wide social card. Next serves this for Open Graph and, absent a
// twitter-image, for Twitter/X too. Prerendered at build time (it must stay a
// static route — it reads from disk and from the network).
//
// Deliberately dark: a link preview sits inside someone else's chat bubble, and
// the site's cream background disappeared against the white cards iMessage and
// Slack draw. Palette matches tailwind.config.ts, with the accent lifted from
// #b0542c to #e0824c so it carries on an ink ground.
export const alt = OG_IMAGE_ALT;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#1f2421";
const CREAM = "#faf8f5";
const MUTED = "#a49d94";
const ACCENT = "#e0824c";
const HAIRLINE = "rgba(250,248,245,0.14)";

/** Width of the portrait panel on the right edge. */
const PHOTO_W = 424;

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

/** The portrait, inlined as a data URI. Null if it can't be read, in which case
 *  the layout closes up and runs full-width instead. */
function loadPortrait(): string | null {
	try {
		const file = path.join(process.cwd(), "public/images/profile.jpg");
		return `data:image/jpeg;base64,${fs.readFileSync(file).toString("base64")}`;
	} catch {
		return null;
	}
}

export default async function OpengraphImage() {
	// Same two families the site uses (next/font in layout.tsx). Fetched in
	// parallel; either may come back null and the card still renders.
	const [serif, sans] = await Promise.all([
		loadFont("Fraunces:opsz,wght@9..144,700"),
		loadFont("Inter:wght@400;600"),
	]);
	const fonts = [
		...(serif ? [{ name: "Fraunces", data: serif, weight: 700 as const, style: "normal" as const }] : []),
		...(sans ? [{ name: "Inter", data: sans, weight: 400 as const, style: "normal" as const }] : []),
	];
	// Referencing a family that failed to load would leave satori without a
	// match, so only name it when it's actually present.
	const serifFamily = serif ? "Fraunces" : undefined;
	const sansFamily = sans ? "Inter" : undefined;

	const portrait = loadPortrait();
	const stats = profile.stats.slice(0, 6);
	const contentRight = portrait ? PHOTO_W - 40 : 0;

	return new ImageResponse(
		(
			<div
				style={{
					position: "relative",
					width: "100%",
					height: "100%",
					display: "flex",
					backgroundColor: INK,
					// Warm bloom behind the wordmark. Satori only parses the
					// `circle at x% y%` form — an explicit `900px 500px at ...` throws.
					backgroundImage:
						"radial-gradient(circle at 12% -18%, rgba(224,130,76,0.30), rgba(31,36,33,0) 52%)",
					fontFamily: sansFamily,
				}}
			>
				{/* Portrait, bled off the right edge and faded into the ground so it
				    reads as part of the card rather than a pasted-on box. */}
				{portrait ? (
					<div
						style={{
							position: "absolute",
							top: 0,
							right: 0,
							bottom: 0,
							width: PHOTO_W,
							display: "flex",
						}}
					>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src={portrait}
							alt=""
							width={PHOTO_W}
							height={size.height}
							style={{ width: PHOTO_W, height: size.height, objectFit: "cover" }}
						/>
						<div
							style={{
								position: "absolute",
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								display: "flex",
								backgroundImage:
									"linear-gradient(to right, rgba(31,36,33,1) 2%, rgba(31,36,33,0.62) 38%, rgba(31,36,33,0.28) 100%)",
							}}
						/>
					</div>
				) : null}

				{/* Content column */}
				<div
					style={{
						position: "relative",
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
						width: "100%",
						padding: "62px 72px 56px",
						paddingRight: 72 + contentRight,
					}}
				>
					{/* Eyebrow */}
					<div style={{ display: "flex", alignItems: "center", gap: 14 }}>
						<div style={{ display: "flex", width: 34, height: 3, backgroundColor: ACCENT }} />
						<div
							style={{
								fontSize: 20,
								letterSpacing: "0.2em",
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
								fontSize: 92,
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
								marginTop: 20,
								fontSize: 29,
								lineHeight: 1.3,
								color: MUTED,
								maxWidth: 620,
							}}
						>
							{profile.tagline}
						</div>
					</div>

					{/* Stat grid — hairline-ruled cells rather than detached pills, so it
					    reads as one spec sheet instead of six floating chips. */}
					<div
						style={{
							display: "flex",
							flexWrap: "wrap",
							borderTop: `1px solid ${HAIRLINE}`,
							borderLeft: `1px solid ${HAIRLINE}`,
						}}
					>
						{stats.map((s) => (
							<div
								key={s.label}
								style={{
									display: "flex",
									flexDirection: "column",
									// Top-aligned, not centered: labels run one or two lines, and
									// centering each cell independently leaves the values on a
									// row sitting at different heights.
									justifyContent: "flex-start",
									width: "33.333%",
									height: 112,
									padding: "24px 22px 0",
									borderRight: `1px solid ${HAIRLINE}`,
									borderBottom: `1px solid ${HAIRLINE}`,
								}}
							>
								<div
									style={{
										fontFamily: serifFamily,
										fontSize: 38,
										fontWeight: 700,
										color: ACCENT,
										lineHeight: 1,
									}}
								>
									{s.value}
								</div>
								<div style={{ marginTop: 9, fontSize: 17, color: MUTED, lineHeight: 1.2 }}>
									{s.label}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		),
		{ ...size, ...(fonts.length ? { fonts } : {}) },
	);
}
