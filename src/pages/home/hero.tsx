import { ClaimUsernameForm } from './components/claim-username-form'

export function Hero() {
  return (
    <div className="max-w-[480px] px-2">
      <h1 className="text-5xl font-bold text-zinc-900 sm:text-6xl">
        Agendamento descomplicado
      </h1>
      <p className="mt-4 text-lg text-zinc-600">
        Conecte o seu calendário e permita que as pessoas marquem agendamentos
        no seu tempo livre.
      </p>

      <ClaimUsernameForm />
    </div>
  )
}
