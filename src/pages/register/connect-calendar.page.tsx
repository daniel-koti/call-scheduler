import { MultiStep } from '@/components/multistep'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowRight, Globe2 } from 'lucide-react'
import { signIn, useSession } from 'next-auth/react'

export default function ConnectCalendar() {
  const session = useSession()

  return (
    <main className="mx-auto mb-4 mt-20 max-w-xl px-4 py-0">
      <div className="py-0">
        <strong className="text-base">Conecte a sua agenda!</strong>
        <p className="mb-6 text-zinc-800">
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </p>
      </div>

      <MultiStep currentStep={2} steps={4} />

      <Card className="mt-4 flex flex-col bg-zinc-100 p-4">
        <Card className="mb-2 flex items-center justify-between border-zinc-200 bg-transparent p-4">
          <span className="text-sm font-medium text-zinc-900">
            Google Calendar
          </span>
          <Button variant="destructive" onClick={() => signIn('google')}>
            Conectar
            <Globe2 className="ml-2 h-4 w-4" />
          </Button>
        </Card>
        <Button disabled>
          Próximo passo <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </Card>

      <pre>{JSON.stringify(session.data)}</pre>
    </main>
  )
}
