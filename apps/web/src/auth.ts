import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "database";
import { z } from "zod";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          
          const admin = await prisma.adminUser.findUnique({
            where: { email },
          });

          if (!admin || !admin.isActive) return null;

          const passwordsMatch = await bcrypt.compare(password, admin.passwordHash);

          if (passwordsMatch) {
            // Update last login
            await prisma.adminUser.update({
              where: { id: admin.id },
              data: { lastLoginAt: new Date() }
            });
            
            return {
              id: admin.id.toString(),
              email: admin.email,
              role: admin.role,
            };
          }
        }
        
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id as string;
      }
      return session;
    }
  },
  pages: {
    signIn: "/admin/login",
  },
  session: { strategy: "jwt" },
});
