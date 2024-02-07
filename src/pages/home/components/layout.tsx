import { ReactNode } from 'react'

interface HomeLayoutProps {
  children: ReactNode
}

export function HomeLayout(props: HomeLayoutProps) {
  return (
    <div className="relative flex h-screen w-full  items-center justify-center bg-white bg-dot-black/[0.2] dark:bg-black dark:bg-dot-white/[0.2]">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      {props.children}
    </div>
  )
}
