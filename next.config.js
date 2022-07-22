/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["firebasestorage.googleapis.com"],
	},
	webpack: (config, options) => {
		config.module.rules.push({
			test: /\.pdf$/,
			use: [
				{
					loader: "file-loader",
				}
			]
		});
		return config;
	}
};
module.exports = nextConfig;