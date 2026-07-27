import { ImageResponse } from "next/og";
import { profile } from "@/content/data";
import { OG_IMAGE_ALT } from "@/lib/seo";

// Site-wide social card. Next serves this for Open Graph and, absent a
// twitter-image, for Twitter/X too. Generated at build time — no binary asset
// to keep in sync. Uses the warm palette from tailwind.config.ts.
export const alt = OG_IMAGE_ALT;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					backgroundColor: "#faf8f5",
					padding: "72px 80px",
					borderBottom: "16px solid #b0542c",
				}}
			>
				<div style={{ display: "flex", flexDirection: "column" }}>
					<div
						style={{
							fontSize: 96,
							fontWeight: 700,
							color: "#1f2421",
							letterSpacing: "-0.02em",
						}}
					>
						{profile.name}
					</div>
					<div
						style={{
							marginTop: 24,
							fontSize: 40,
							lineHeight: 1.3,
							color: "#6b665f",
							maxWidth: 900,
						}}
					>
						{profile.tagline}
					</div>
				</div>
				<div style={{ display: "flex", alignItems: "center", gap: 20 }}>
					<div
						style={{
							width: 14,
							height: 14,
							borderRadius: 999,
							backgroundColor: "#b0542c",
						}}
					/>
					<div style={{ fontSize: 30, color: "#6b665f" }}>{profile.positioning}</div>
				</div>
			</div>
		),
		size,
	);
}
