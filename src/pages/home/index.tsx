import { Hero } from './hero'
import Image from 'next/image'

import previewImage from '@/assets/app-preview.png'

export default function Home() {
  return (
    <section className="h-screen flex flex-col md:flex-row items-center justify-center gap-5 ml-auto max-w-[calc(100vw-(100vw-1160px)/2)]">
      <Hero />

      <div className="pr-8 overflow-hidden hidden md:block">
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
  )
}
