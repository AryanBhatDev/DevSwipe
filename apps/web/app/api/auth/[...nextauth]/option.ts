import { NextAuthOptions } from "next-auth/";
import jwt from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@repo/db/client";

export const authOption: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },
  jwt: {
    encode: async ({ token, secret }) => {
      if (!token) return "";
      return jwt.sign(token, secret, { algorithm: "HS256" });
    },
    decode: async ({ token, secret }) => {
      if (!token) return null;
      const decode = jwt.verify(token, secret, { algorithms: ["HS256"] });
      return decode as JWT;
    },
  },
  callbacks:{
    async jwt({ token, user, account }) {
      if (user) {
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }
      if (!token.email || !token.name || !token.picture) {
        return token;
      }
      let existingUser = await prisma.user.findUnique({
        where: {
          email: token.email,
        },
      });

      if (!existingUser) {
        existingUser = await prisma.user.create({
          data: {
            email: token.email,
            name: token.name,
            profileImage: token.picture,
          },
        });
      }
      return token;
    }
  },
  pages:{
    signIn: "/auth"
  },
  secret: process.env.NEXTAUTH_SECRET,
};
