import { TRPCReactProvider } from "@/trpc/client";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <TRPCReactProvider>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </TRPCReactProvider>
  );
};

export default Layout;
