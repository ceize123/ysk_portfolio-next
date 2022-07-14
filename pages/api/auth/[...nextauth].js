import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";

// https://medium.com/@prodmxle/setting-up-nextauth-js-application-and-deploying-it-via-vercel-d6b02bf98397
export default NextAuth({

	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET
		})
	],
	callbacks: {
		async redirect({ url, baseUrl }) {
		// Allows relative callback URLs
			if (url.startsWith("/")) return `${baseUrl}${url}`;
			// Allows callback URLs on the same origin
			else if (new URL(url).origin === baseUrl) return url;
			return baseUrl;
		}
	},
	secret: process.env.SECRET,
});