import { FormError } from '@/components/form-error'
import { MultiStep } from '@/components/multistep'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowRight, Check, Globe2 } from 'lucide-react'
import { signIn, useSession } from 'next-auth/react'
import { NextSeo } from 'next-seo'

import { useRouter } from 'next/router'

export default function ConnectCalendar() {
  const session = useSession()
  const router = useRouter()

  const hasAuthError = !!router.query.error

  const isSignedIn = session.status === 'authenticated'

  async function handleConnectCalendar() {
    await signIn('google')
  }

  async function handleNavigateToNextStep() {
    await router.push('/register/time-intervals')
  }

  return (
    <>
      <NextSeo
        title="Conecte a sua agenda do google | Call Scheduler"
        noindex
      />
      <main className="mx-auto mb-4 mt-20 max-w-xl animate-appear-from-top px-4 py-0">
        <div className="py-0">
          <strong className="text-2xl font-semibold">
            Conecte a sua agenda!
          </strong>
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
            {isSignedIn ? (
              <Button disabled>
                Conectado <Check className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleConnectCalendar}>
                Conectar
                <Globe2 className="ml-2 h-4 w-4" />
              </Button>
            )}
          </Card>

          {hasAuthError && (
            <FormError description="Falha ao se comunicar com o Google, verifique se você habilitou as permissões de acesso" />
          )}

          <Button
            onClick={handleNavigateToNextStep}
            disabled={!isSignedIn}
            className="mt-2"
          >
            Próximo passo <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </Card>
      </main>
    </>
  )
}
