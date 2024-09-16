import { Link, Outlet } from "react-router-dom"
import { SignedIn, UserButton } from '@clerk/clerk-react';
import "./RootLayout.css"

const RootLayout = () => {
  return (
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
  )
}

export default RootLayout