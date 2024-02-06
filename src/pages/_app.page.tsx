import '@/lib/dayjs'
import '@/styles/globals.css'

import type { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from '@/components/ui/sonner'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/react-query'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <DefaultSeo
          openGraph={{
            type: 'website',
            locale: 'pt-br',
            url: 'https://www.callscheduler.com/',
            siteName: 'Call Scheduler',
          }}
        />
        <Component {...pageProps} />
        <Toaster closeButton theme="system" />
      </SessionProvider>
    </QueryClientProvider>
  )
}
