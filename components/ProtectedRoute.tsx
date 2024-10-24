'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PocketBase from 'pocketbase';
import React, { ReactNode } from 'react';

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

// Define the type for the children prop
interface ProtectedRouteProps {
  children: ReactNode; // ReactNode represents any valid JSX or component children
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();

  useEffect(() => {
    // Check if the user is authenticated
     const isAuthenticated = 
     
      pb.authStore.isValid;       //For TEsting purposes put true
    
    if (!isAuthenticated) {
      router.push('/signin'); // Redirect to signin page if not authenticated
    }
  }, [router]);

  // Render the children only if the user is authenticated
  return <>{children}</>;
}
