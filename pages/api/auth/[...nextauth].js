import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import Auth0Provider from "next-auth/providers/auth0";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./lib/mongodb";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../models/User";
import db from "../../../utils/db";
import bcrypt from "bcryptjs";

db.connectDb();
export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "jsmith@example.com",
        },

        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials.email;
        const password = credentials.password;
        console.log(email, password);
        const user = await User.findOne({ email });

        if (user) {
          return signInUser({ password, user });
        } else {
          throw new Error(
            "No account found with this email. Please sign up first."
          );
        }
      },
    }),

    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),

    TwitterProvider({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_ID_SECRET,
      version: "2.0",
    }),
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER,
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      const user = await User.findById(token.sub).select("-password");
      session.user.id = user._id;
      session.user.role = user.role;
      session.user.image = user.image;
      return session;
    },
  },

  pages: {
    signIn: "/signin",
  },

  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRET,
};

const signInUser = async ({ password, user }) => {
  if (!user.password) {
    ("This account was created using a social login (Google, Facebook, etc.). Please sign in with that provider instead.");
  }

  const testPassword = await bcrypt.compare(password, user.password);
  if (!testPassword) {
    throw new Error("Invalid email or password. Please try again.");
  }
  return user;
};

export default NextAuth(authOptions);
