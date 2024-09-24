import { Link, Outlet } from "react-router-dom"
import { SignedIn, UserButton } from '@clerk/clerk-react';
import "./RootLayout.css"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

const RootLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <div className="rootLayout">
      <header>
        <Link to="/" className="logo">
        <img src="/logo3.png" alt="Logo" />
        <span>Homepage</span>
        </Link>
        <div className="users">
          <SignedIn>
            <UserButton />
          </SignedIn>
          </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
    </QueryClientProvider>
  )
}

export default RootLayout