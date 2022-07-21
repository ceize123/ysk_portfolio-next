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
		async signIn({ user, account, profile, email, credentials }) {
			
			const isAllowedToSignIn = (profile.login === "YSK530" && profile.id === 108098846)
				|| (profile.login === "ceize123" && profile.id === 64736206);
			if (isAllowedToSignIn) {
				return true;
			} else {
			// Return false to display a default error message
				return false;
			// Or you can return a URL to redirect to:
			// return '/unauthorized'
			}
		}
	},
	secret: process.env.SECRET,
});