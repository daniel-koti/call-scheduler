import '@/styles/globals.css'

import { Toaster } from '@/components/ui/sonner'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <Toaster closeButton theme="system" />
    </SessionProvider>
  )
}
