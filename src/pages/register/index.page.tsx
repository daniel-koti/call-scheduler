import { FormError } from '@/components/form-error'
import { MultiStep } from '@/components/multistep'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { api } from '@/lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { ArrowRight } from 'lucide-react'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O username precisa ter no mínimo 3 letras' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O username pode ter apenas letras e hifens',
    })
    .transform((username) => username.toLowerCase()),
  name: z.string().min(3, { message: 'O nome precisa ter no mínimo 3 letras' }),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  const router = useRouter()

  useEffect(() => {
    if (router.query.username) {
      setValue('username', String(router.query?.username))
    }
  }, [router.query?.username, setValue])

  async function handleRegister(data: RegisterFormData) {
    try {
      await api.post('/users', {
        name: data.name,
        username: data.username,
      })
      toast.success('Usuário criado')

      await router.push('/register/connect-calendar')
    } catch (error) {
      if (error instanceof AxiosError && error?.response?.data?.message) {
        return toast.error(error.response.data.message)
      }

      toast.error('Erro interno! Tente novamente mais tarde')
    }
  }

  return (
    <>
      <NextSeo title="Crie uma conta | Call Scheduler" />
      <main className="mx-auto mb-4 mt-20 max-w-xl animate-appear-from-top px-4 py-0">
        <div className="py-0">
          <strong className="text-2xl font-semibold">
            Bem-vindo ao Call Scheduler
          </strong>
          <p className="mb-6 text-zinc-800">
            Precisamos de algumas informações para criar o seu perfil! Ah, você
            pode editar essas informações depois.
          </p>
        </div>

        <MultiStep currentStep={1} steps={4} />

        <form
          onSubmit={handleSubmit(handleRegister)}
          className="mt-6 flex flex-col gap-4 rounded bg-zinc-100 p-6"
        >
          <label className="flex flex-col gap-2">
            <span className="text-sm text-zinc-900">Nome de usuário</span>
            <Input
              prefix="ignite.com/"
              placeholder="seu-usuario"
              {...register('username')}
            />

            {errors.username && (
              <FormError description={errors.username.message as string} />
            )}
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm text-zinc-900">Nome completo</span>
            <Input placeholder="Seu nome" {...register('name')} />

            {errors.name && (
              <FormError description={errors.name.message as string} />
            )}
          </label>

          <Button isLoading={isSubmitting} disabled={isSubmitting}>
            Próximo passo{' '}
            {!isSubmitting && <ArrowRight className="ml-1 h-4 w-4" />}
          </Button>
        </form>
      </main>
    </>
  )
}
