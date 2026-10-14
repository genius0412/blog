/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		return [
			// The résumé was served as /resume.pdf until it was renamed so that
			// downloads save with a descriptive filename; keep old links working.
			{ source: "/resume.pdf", destination: "/Dohun_Kim_Resume.pdf", permanent: true },
		];
	},
};

export default nextConfig;
