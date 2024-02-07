import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/router'

import { useForm } from 'react-hook-form'
import { z } from 'zod'

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O username precisa ter no mínimo 3 letras' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O username pode ter apenas letras e hifens',
    })
    .transform((username) => username.toLowerCase()),
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  })

  const router = useRouter()

  async function handlePreRegister(data: ClaimUsernameFormData) {
    const { username } = data
    await router.push(`/register?username=${username}`)
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(handlePreRegister)}
        className="mt-4 grid grid-cols-[1fr_auto] gap-2 rounded-md bg-zinc-200 p-4"
      >
        <Input placeholder="call.com/seu-usuário" {...register('username')} />
        <Button type="submit" className="col-auto " disabled={isSubmitting}>
          Reservar <ArrowRight className="ml-2 h-4 w-4 " />
        </Button>
      </form>
      <div className="mt-2">
        {errors.username ? (
          <span className="text-sm text-red-600">
            {errors.username.message}
          </span>
        ) : (
          <span className="text-sm text-zinc-500">
            Digite o nome do usuário
          </span>
        )}
      </div>
    </>
  )
}
