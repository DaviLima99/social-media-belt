import { logger } from "@/lib/logger"
import prisma from "@/lib/prisma"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextApiHandler } from "next"
import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"


const authOptions: NextAuthOptions = {
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
    session: { strategy: "jwt"},
    callbacks: {
        async jwt({ token, user, account, profile, isNewUser }) {
            if(isNewUser) {
                console.log("Criando novo usuário")
                const tenants = await prisma.tenant.findFirst({
                    where: {
                        userId: user.id
                    }
                })

                if (!tenants) {
                    await prisma.tenant.create({
                        data: {
                            userId: user.id,
                            plan: 'free',
                            slug: 'meutenant',
                            image: '',
                            name: 'Meu Tenant'
                        }
                    })
                }
            }
            

            return token;
        }
    },
    debug: true,
    logger: {
        error: (code, metadata) => {
          logger.error(code, metadata);
        },
        warn: (code) => {
          logger.warn(code);
        },
        debug: (code, metadata) => {
          logger.debug(code, metadata);
        }
    }
}

const authHandler: NextApiHandler = (req, res) =>
  NextAuth(req, res, authOptions);
export default authHandler;