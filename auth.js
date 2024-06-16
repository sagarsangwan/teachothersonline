import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./lib/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],
    adapter: PrismaAdapter(prisma),
    callbacks: {

        async session({ session, user }) {
            // Add custom fields to session object
            session.user.id = user.id;
            session.user.role = user.role;
            session.user.Teacher = user.Teacher
            session.user.Student = user.Student
            return session;
        },
    }
})