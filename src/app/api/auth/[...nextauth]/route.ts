
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     const contentType = req.headers.get("content-type") || "";

//     if (!contentType.includes("application/json")) {
//       return NextResponse.json(
//         { error: "Expected application/json" },
//         { status: 400 }
//       );
//     }

//     const body = await req.json();
//     console.log("SIGN-UP body received:", body);

//     // You can call Resend here if needed

//     return NextResponse.json({ success: true, message: "Signup complete" });
//   } catch (error) {
//     console.error("Error parsing JSON:", error);
//     return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
//   }
// }


import NextAuth  from 'next-auth/next';
// import NextAuth from 'next-auth';
import { authOptions } from './options';



const handler = NextAuth(authOptions);
 export {handler as POST , handler as GET}
