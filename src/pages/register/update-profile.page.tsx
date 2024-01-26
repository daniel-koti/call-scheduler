import { MultiStep } from '@/components/multistep'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth/next'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { buildNextAuthOptions } from '../api/auth/[...nextauth].api'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { AvatarFallback } from '@radix-ui/react-avatar'
import { getFirstAndLastLetterName } from '@/utils/get-first-and-last-letter-name'
import { api } from '@/lib/axios'
import { useRouter } from 'next/router'

const updateProfileSchema = z.object({
  bio: z.string(),
})

type UpdateProfileData = z.infer<typeof updateProfileSchema>

export default function UpdateProfile() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileSchema),
  })

  const session = useSession()
  const router = useRouter()

  async function handleUpdateProfile(data: UpdateProfileData) {
    await api.put('/users/profile', {
      bio: data.bio,
    })

    await router.push(`/schedule/${session.data?.user.username}`)
  }

  return (
    <main className="mx-auto mb-4 mt-20 max-w-xl px-4 py-0">
      <div className="py-0">
        <strong className="text-base">Defina sua disponibilidade</strong>
        <p className="mb-6 text-zinc-800">
          Por último, uma breve descrição e uma foto de perfil.
        </p>
      </div>

      <MultiStep currentStep={4} steps={4} />

      <form
        onSubmit={handleSubmit(handleUpdateProfile)}
        className="mt-6 flex flex-col gap-4 rounded-[6px] border border-zinc-200 bg-zinc-100 p-6"
      >
        <label className="flex flex-col gap-2">
          <span>Foto de perfil</span>
          <Avatar>
            <AvatarImage src={session.data?.user.avatar_url} />
            <AvatarFallback className="flex w-32 items-center justify-center bg-zinc-400">
              {getFirstAndLastLetterName(session.data?.user?.name)}
            </AvatarFallback>
          </Avatar>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm text-zinc-900">Sobre você</span>
          <Textarea
            className="resize-none"
            placeholder="Seu nome"
            {...register('bio')}
          />
          <span className="text-xs">
            Fale um pouco sobre você. Isto será exibido em sua página pessoal.
          </span>
        </label>

        <Button isLoading={isSubmitting} disabled={isSubmitting}>
          Finalizar{' '}
        </Button>
      </form>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  return {
    props: {
      session,
    },
  }
}
