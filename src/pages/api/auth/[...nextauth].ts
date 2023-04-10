import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
		}),
		CredentialsProvider({
			name: "Todo Login",
			credentials: {
				username: {
					label: "username",
					placeholder: "username",
					type: "string",
				},
				password: { label: "password", placeholder: "***", type: "password" },
			},
			async authorize(credentials, req) {
				const { username, password } = credentials as any;
				try {
					const res = await axios.post("http://localhost:8000/auth/login", {
						username,
						password,
					});
					console.log(res.data);
					return username ?? null;
				} catch (e) {
					console.log(e);
				}
			},
		}),
	],
	secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);
