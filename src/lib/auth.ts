import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import dbClient from "@/config/db.config";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Email",
            credentials: {
                email: { type: "text", label: "Email", placeholder: "ex - zhon@gmail.com" },
                password: { type: "password", label: "Password" }
            },
            async authorize(credentials) {
                if (!credentials) return null;

                try {
                    const user = await dbClient.user.findFirst({ where: { email: credentials.email } });
                    if (!user || !await bcrypt.compare(credentials.password, user.password)) return null;

                    return {
                        id: `${user.id}`,
                        name: `${user.firstname} ${user.lastname}`,
                        email: user.email,
                        password: user.password
                    }
                } catch (err) {
                    console.log(err);
                    return null;
                }
            },
        })
    ],
    callbacks: {
        async jwt({ user, token }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.password = user.password;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.name = token.name as string;
                session.user.email = token.email as string;
            }
            return session;
        }
    },
    session: {
        strategy: "jwt",
        maxAge: 7 * 24 * 60 * 60
    },
    secret: process.env.AUTH_SECRET
}