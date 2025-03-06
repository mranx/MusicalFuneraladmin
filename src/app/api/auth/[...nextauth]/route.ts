import { authOptions } from "@/app/api/utils/authOptions"; // ✅ Import from utils
import NextAuth from "next-auth/next";

// ✅ Correct NextAuth export for App Router
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
