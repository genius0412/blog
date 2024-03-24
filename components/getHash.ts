const getHash = async (ip: string) => {
	const hashBuffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(ip));
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hash = hashArray.map((b) => b.toString(16).padStart(2, '0'));
	return hash;
}

export default getHash