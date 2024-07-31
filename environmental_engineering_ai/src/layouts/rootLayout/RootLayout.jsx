import { Outlet } from 'react-router-dom';
import './RootLayout.css';
import { Link } from 'react-router-dom';
import { SignedIn, UserButton } from '@clerk/clerk-react';

const RootLayout = () => {
  return (
    <div className="rootlayout">
      <header>
        <Link to="/" className="logo">
          <img src="/Logo2.png" alt="Logo" />
          <span>Apollo</span>
        </Link>
        <div className="user">
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;