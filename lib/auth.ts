import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { instance } from "./instance";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ account, profile, user, credentials, email }) {
      await instance.post("/user", user);
      return true; // Do different verification for other providers that don't have `email_verified`
    },
  },
});
