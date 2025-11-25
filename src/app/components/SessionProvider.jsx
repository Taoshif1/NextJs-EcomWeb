'use client';

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';

// This component wraps our app to provide authentication throughout
export default function SessionProvider({ children }) {
  return (
    <NextAuthSessionProvider>
      {children}
    </NextAuthSessionProvider>
  );
}