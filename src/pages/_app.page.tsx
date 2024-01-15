import '@/styles/globals.css'
import { Toaster } from '@/components/ui/sonner'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster closeButton theme="system" />
    </>
  )
}
