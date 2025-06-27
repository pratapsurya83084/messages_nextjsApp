'use client'
import { SessionProvider } from "next-auth/react"
import Component from "@/app/(auth)/sign-in/page"
import { ReactNode } from "react"
export default function AuthProvider({
  children,
}:{children:React.ReactNode}) {
  return (
    <SessionProvider >
    {children}
    </SessionProvider>
  )
}