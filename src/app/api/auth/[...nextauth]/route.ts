// import  NextAuth from 'next-auth/next';
// import { authOptions } from './options';

// const handler = NextAuth(authOptions)

// export {handler as GET ,handler as POST}
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("SIGN-UP body received:", body);

  // You can call Resend here if needed

  return NextResponse.json({ success: true, message: 'Signup complete' });
}
