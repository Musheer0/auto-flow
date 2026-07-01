import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider appearance={{ theme: shadcn }}>
      <TooltipProvider>
        <NuqsAdapter>{children}</NuqsAdapter>
      </TooltipProvider>
    </ClerkProvider>
  );
};

export default Layout;
