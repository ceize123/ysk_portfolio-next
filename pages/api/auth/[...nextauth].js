import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";

export default NextAuth({
	providers: [
		GitHubProvider({
			secret: process.env.SECRET,
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET
		})
	],
	database: process.env.MONGO_URL,
	session: {
		jwt: true // ask next auth library to use jwt for session management, not db
	},
});