// import NextAuth from "next-auth"
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import prisma from "./lib/prisma";
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),

  providers: [Google],
  callbacks: {
    async session({ session, user }) {
      // Include extra fields in the session object
      session.user.id = user.id;
      session.user.role = user.role;
      return session;
    },
  },
});
