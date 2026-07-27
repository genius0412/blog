// Live player/match counts for the DSIM card.
//
// DSIM's game server already exposes an unauthenticated, CORS-enabled
// `/api/stats` (playdsim.com calls it on page load), so this reads that rather
// than reaching into DSIM's Postgres directly — no credentials in this repo,
// and no coupling to a schema that belongs to another project.
//
// Server-only: called from server components, never shipped to the client.

const STATS_URL = "https://dohun-sim-decode.fly.dev/api/stats";

/** How long a fetched count stays fresh, in seconds. */
const REVALIDATE = 3600;

/** How long to wait before giving up, in ms. A slow game server must never
 *  stall or fail a build of this site. */
const TIMEOUT_MS = 5000;

export type DsimStats = {
	/** registered accounts */
	users: number;
	/** matches played, all modes and both games */
	games: number;
};

/**
 * Current DSIM totals, or null if the game server is unreachable, slow, or
 * returns something unexpected. Callers must treat null as "show no counts"
 * rather than falling back to a stale hardcoded number.
 */
export async function getDsimStats(): Promise<DsimStats | null> {
	try {
		const res = await fetch(STATS_URL, {
			signal: AbortSignal.timeout(TIMEOUT_MS),
			next: { revalidate: REVALIDATE },
		});
		if (!res.ok) return null;

		const data: unknown = await res.json();
		const users = Number((data as { users?: unknown })?.users);
		const games = Number((data as { games?: unknown })?.games);
		// A zeroed payload is what the server sends when its DB is disabled —
		// treat it as "no data" instead of rendering "0 players".
		if (!Number.isFinite(users) || !Number.isFinite(games)) return null;
		if (users <= 0 || games <= 0) return null;

		return { users, games };
	} catch {
		return null;
	}
}

const count = (n: number) => n.toLocaleString("en-US");

/** The two chips shown on the DSIM card, newest numbers first. */
export function dsimStatBadges(stats: DsimStats): string[] {
	return [
		`${count(stats.users)} players`,
		`${count(stats.games)} matches played`,
	];
}
