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
	secret: "dCVdSHc8MRF@uFyqAS4g^y8f745t*Q@7nG^f&CgYrMzUXcZe**",
});