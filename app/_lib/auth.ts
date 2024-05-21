import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import { db } from "./prisma";
import GoogleProvider from "next-auth/providers/google";
import { Adapter } from "next-auth/adapters";

interface SessionUser {
  id?: string; // Defina o tipo de id conforme necessário
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          access_type: "offline",
          prompt: "consent",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      let updatedUser: SessionUser = { ...session.user };
      if (user?.id) {
        updatedUser.id = user.id;
      }
      session.user = updatedUser;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
