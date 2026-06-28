import { ClerkProvider } from '@clerk/nextjs'
import { shadcn } from '@clerk/themes'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider appearance={{ theme: shadcn }}>
      {children}
    </ClerkProvider>
  )
}

export default Layout;