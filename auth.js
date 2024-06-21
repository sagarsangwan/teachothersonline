import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./lib/prisma"

const providers = [
    Google
]

export const providerMap = providers.map((provider) => {
    if (typeof provider === "function") {
        const providerData = provider()
        return { id: providerData.id, name: providerData.name }
    } else {
        return { id: provider.id, name: provider.name }
    }
})
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers,
    // pages: {                             will do it later
    //     signIn: "/signin",
    // },
    adapter: PrismaAdapter(prisma),
    callbacks: {

        async session({ session, user }) {

            // Add custom fields to session object
            session.user.id = user.id;
            session.user.role = user.role;
            return session;
        },
    }
})