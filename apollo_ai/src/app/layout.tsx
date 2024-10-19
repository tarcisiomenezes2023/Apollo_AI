import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import {
  ClerkProvider,
  SignIn,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'


export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className="flex flex-col h-screen p-2 px-2 md:p-4 md:px-12">
        <header className="flex items-center justify-between">
          <Link href="/" className="flex items-center font-bold gap-8">
            <img src="/logo3.png" alt="Logo" className="lg:h-16 lg:w-16 h-10 w-10" />
            <span 
            className="ml-1 text-xl lg:text-4xl font-bold
            transition duration-500 hover:bg-gradient-to-r hover:from-[#33ff28] 
            hover:to-[#e55571] hover:bg-clip-text hover:text-transparent">
              Homepage
            </span>
          </Link>
          <div className="users">
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </header>
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </body>
    </html>
    </ClerkProvider>
  );
}