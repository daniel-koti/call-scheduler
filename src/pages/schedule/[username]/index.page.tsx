import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { prisma } from '@/lib/prisma'
import { getFirstAndLastLetterName } from '@/utils/get-first-and-last-letter-name'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ScheduleForm } from './ScheduleForm'
import { NextSeo } from 'next-seo'

interface ScheduleProps {
  user: {
    name: string
    bio: string
    avatarUrl: string
  }
}

export default function Schedule({ user }: ScheduleProps) {
  return (
    <>
      <NextSeo title={`Agendar com ${user.name} | Call Scheduler`} />
      <section className="mx-auto mb-4 mt-20 max-w-[852px] px-4">
        <header className="flex flex-col items-center">
          <Avatar>
            <AvatarImage src={user.avatarUrl} />
            <AvatarFallback className="flex items-center justify-center bg-zinc-400">
              {getFirstAndLastLetterName(user.name)}
            </AvatarFallback>
          </Avatar>
          <strong className="text-2xl font-semibold text-zinc-900">
            {user.name}
          </strong>
          <span className="text-sm text-zinc-500">{user.bio}</span>
        </header>

        <ScheduleForm />
      </section>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const username = String(params?.username)

  const user = await prisma.user.findUnique({ where: { username } })

  if (!user) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      user: {
        name: user.name,
        bio: user.bio,
        avatarUrl: user.avatar_url,
      },
    },
    revalidate: 60 * 60 * 24, // 1 day
  }
}
