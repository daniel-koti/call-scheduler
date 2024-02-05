import { FormError } from '@/components/form-error'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { api } from '@/lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { Calendar, Clock } from 'lucide-react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const confirmFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome precisa ter no mínimo 3 caracteres' }),
  email: z.string().email({ message: 'Digite um e-mail válido' }),
  comments: z.string().nullable(),
})

type ConfirmFormData = z.infer<typeof confirmFormSchema>

interface ConfirmStepProps {
  schedulingDate: Date
  onCancelConfirmation: () => void
}

export function ConfirmStep({
  schedulingDate,
  onCancelConfirmation,
}: ConfirmStepProps) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmFormSchema),
  })

  const router = useRouter()
  const username = String(router.query.username)

  async function handleConfirmScheduling(data: ConfirmFormData) {
    const { name, email, comments } = data

    try {
      await api.post(`/users/${username}/schedule`, {
        name,
        email,
        comments,
        date: schedulingDate,
      })

      toast.success('Agendamento criado com sucesso!')
      onCancelConfirmation()
    } catch (error) {
      toast.error('Não foi possível criar o agendamento!')
    }
  }

  const describedDate = dayjs(schedulingDate).format('DD[ de ]MMMM[ de ]YYYY')
  const describedTime = dayjs(schedulingDate).format('HH:mm[h]')

  return (
    <form
      onSubmit={handleSubmit(handleConfirmScheduling)}
      className="border-200 mx-auto mt-4 flex max-w-[540px] flex-col gap-4 rounded-[6px] border bg-zinc-100 p-4"
    >
      <header className="mb-2 flex items-center gap-4 border-b border-zinc-300 pb-6">
        <strong className="inline-flex items-center gap-2 font-medium">
          <Calendar className="h-5 w-5 text-zinc-500" />
          {describedDate}
        </strong>
        <strong className="inline-flex items-center gap-2 font-medium">
          <Clock className="h-5 w-5 text-zinc-500" />
          {describedTime}
        </strong>
      </header>

      <label className="flex flex-col gap-2">
        <span className="text-sm">Nome completo</span>
        <Input placeholder="Seu nome" {...register('name')} />
        {errors.name && <FormError description={errors.name.message ?? ''} />}
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-sm">Endereço de e-mail</span>
        <Input
          type="email"
          placeholder="john@example.com"
          {...register('email')}
        />
        {errors.email && <FormError description={errors.email.message ?? ''} />}
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-sm">Observações (opcional)</span>
        <Textarea
          placeholder="Insira alguns comentários"
          className="resize-none"
          {...register('comments')}
        />
      </label>

      <div className="mt-2 flex items-center justify-end gap-2">
        <Button onClick={onCancelConfirmation} variant="ghost" type="button">
          Cancelar
        </Button>
        <Button disabled={isSubmitting} isLoading={isSubmitting} type="submit">
          Confirmar
        </Button>
      </div>
    </form>
  )
}
