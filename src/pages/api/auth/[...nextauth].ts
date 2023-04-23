import prisma from "@/lib/prisma"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"


export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID ? process.env.GITHUB_ID : "",
            clientSecret: process.env.GITHUB_SECRET ? process.env.GITHUB_SECRET : "",
        }),
    ],
    theme: {
        colorScheme: "light",
    },
    callbacks: {}
}

export default NextAuth(authOptions)