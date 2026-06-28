import { TRPCReactProvider } from '@/trpc/client';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
   <TRPCReactProvider>
    {children}
   </TRPCReactProvider>
  );
};

export default Layout;