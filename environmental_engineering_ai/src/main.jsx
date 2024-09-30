import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import Homepage from './routes/homepage/Homepage.jsx';
import RootLayout from './layouts/rootLayout/RootLayout.jsx';
import DashboardLayout from './layouts/dashboardLayout/DashboardLayout.jsx';
import DashboardPage from "./routes/dashboardePage/DashboardPage.jsx"
import ChatPage from './routes/chatPage/ChatPage.jsx';
import SignInPage from './routes/signInPage/SignInPage.jsx';
import SignUpPage from './routes/SignUpPage/SignUpPage.jsx';
import Mate_layout from './layouts/matelayout/Mate_layout.jsx';
import Courses from './routes/courses/Courses.jsx';
import Material from './routes/courses/materials/Material.jsx';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  if (PUBLISHABLE_KEY) {
    console.log(PUBLISHABLE_KEY)
  } else {
  throw new Error('Missing Publishable Key');
  }
}

const router = createBrowserRouter([
  {
    element: <RootLayout />, 
    children: [
      {
        path: '/', 
        element: <Homepage />,
      },
      {
        path: '/sign-in/*',
        element: <SignInPage />,
      },
      {
        path: '/sign-up/*',
        element: <SignUpPage />,
      },
      {
        element: <Mate_layout />, 
        children: [
          {
            path: '/courses', 
            element: <Courses />,
          },
          {
            path: '/courses/materials/:id',  
            element: <Material />,
          },
        ],
      },
      {
        element: <DashboardLayout />, 
        children: [
          {
            path: '/dashboard', 
            element: <DashboardPage />,
          },
          {
            path: '/dashboard/chats/:id', 
            element: <ChatPage />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
    </ClerkProvider>
  </React.StrictMode>
);