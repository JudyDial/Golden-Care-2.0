"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();

  useEffect(() => {
    // Wait until loading completes before checking authentication    
    if (!loading) {
      if (!isAuthenticated) {
        router.push('/Login'); // Redirect to login if not authenticated
      } else if (user.user_type === 'patient') {
        router.push('/user/Dashboard'); // Redirect to subscriber page if user is a subscriber
      }
      else if (user.user_type === 'provider') {
        router.push('/provider/Dashboard'); // Redirect to subscriber page if user is a subscriber
      }
    }
  }, [isAuthenticated, user, loading, router]);

  // Optionally, render a loading state until user information is fully loaded
  if (loading || !isAuthenticated || user.user_type !== 'admin') {
    return null; // Avoid rendering the layout while redirecting
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Pass dynamic sidebar items as props */}
      <main className="flex-1 p-4">
        {children}
      </main>
    </div>
  );
};
export default AdminLayout;


