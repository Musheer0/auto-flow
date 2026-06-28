'use client'

import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <SignIn
      routing="path"
      path="/sign-in"
      signUpUrl="/sign-up"
      appearance={{
        elements: {
          rootBox: 'w-full',
          card: 'w-full shadow-none border border-border rounded-xl p-6',
          headerTitle: 'text-xl font-semibold tracking-tight',
          headerSubtitle: 'text-sm text-muted-foreground',
          socialButtonsBlockButton:
            'border-border bg-background text-foreground hover:bg-muted rounded-lg h-10 text-sm font-medium',
          socialButtonsBlockButtonText: 'text-foreground font-medium',
          dividerLine: 'bg-border',
          dividerText: 'text-xs text-muted-foreground',
          formFieldLabel: 'text-sm font-medium text-foreground mb-1.5',
          formFieldInput:
            'h-10 rounded-lg border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
          formButtonPrimary:
            'h-10 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/80 active:translate-y-px',
          footerActionText: 'text-sm text-muted-foreground',
          footerActionLink:
            'text-sm font-medium text-foreground hover:text-foreground/80',
          identityPreviewText: 'text-sm text-foreground',
          identityPreviewEditButton: 'text-sm text-primary',
          formFieldError: 'text-xs text-destructive',
          otpCodeFieldInput:
            'h-12 w-12 rounded-lg border-border text-foreground text-lg',
          alert: 'rounded-lg bg-destructive/10 text-destructive text-sm p-3',
          alertText: 'text-destructive',
          alertIcon: 'text-destructive',
        },
      }}
    />
  )
}
