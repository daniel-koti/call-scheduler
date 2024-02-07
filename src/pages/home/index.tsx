import { Hero } from './hero'
import Image from 'next/image'

import previewImage from '@/assets/app-preview.png'
import { NextSeo } from 'next-seo'
import { HomeLayout } from './components/layout'

export default function Home() {
  return (
    <HomeLayout>
      <NextSeo
        title="Descomplique a sua agenda | Call Scheduler"
        description="Conecte o seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre"
      />
      <section className="ml-auto flex h-screen max-w-[calc(100vw-(100vw-1160px)/2)] flex-col items-center justify-center gap-4 md:flex-row">
        <Hero />

        <div className="hidden overflow-hidden pr-8 transition-all will-change-transform md:block">
          <Image
            src={previewImage}
            height={800}
            width={800}
            quality={100}
            priority
            alt="Calendar picture preview"
          />
        </div>
      </section>
    </HomeLayout>
  )
}
