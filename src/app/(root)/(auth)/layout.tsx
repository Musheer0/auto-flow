import React from 'react'
import Link from 'next/link'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-muted px-4 py-12">
      
      <div className="w-full max-w-md">{children}</div>
      <p className="mt-8 text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} AutoFlow Clone. All rights reserved.
      </p>
    </div>
  )
}

export default AuthLayout
