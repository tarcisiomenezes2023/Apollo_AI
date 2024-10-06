import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";


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
    <html lang="en">
      <body className="flex flex-col h-screen !p-4 !px-16">
        <header className="flex items-center justify-between">
          <Link href="/" className="flex items-center font-bold gap-8">
            <img src="/logo3.png" alt="Logo" className="h-16 w-16" />
            <span 
            className="ml-1 text-4xl font-bold
            transition duration-500 hover:bg-gradient-to-r hover:from-[#33ff28] 
            hover:to-[#e55571] hover:bg-clip-text hover:text-transparent">
              Homepage
            </span>
          </Link>
          <div className="">Users</div>
        </header>
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}