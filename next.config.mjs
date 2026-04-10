import withPWA from "@ducanh2912/next-pwa"

const withPWANext = withPWA({
	dest: "public",
	disable: process.env.NODE_ENV === "development",
	fallbacks: {
		document: "/~offline",
	},
	cacheOnFrontEndNav: true,
	aggressiveFrontEndNavCaching: true,
	reloadOnOnline: true,
})

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	output: "export",
	images: {
		unoptimized: true,
	},
}

export default withPWANext(nextConfig)
