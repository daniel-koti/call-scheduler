import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight } from 'lucide-react'

export default function Register() {
  return (
    <main className="mx-auto mb-4 mt-20 max-w-xl px-4 py-0">
      <div className="px-6 py-0">
        <strong className="text-base">Bem-vindo ao Ignite Call</strong>
        <p className="mb-6 text-zinc-800">
          Precisamos de algumas informações para criar o seu perfil! Ah, você
          pode editar essas informações depois.
        </p>
      </div>

      <form className="mt-6 flex flex-col gap-4 rounded bg-zinc-200 p-6">
        <label className="flex flex-col gap-2">
          <span className="text-sm text-zinc-900">Nome de usuário</span>
          <Input prefix="ignite.com/" placeholder="seu-usuario" />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm text-zinc-900">Nome completo</span>
          <Input placeholder="Seu nome" />
        </label>

        <Button>
          Próximo passo <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </form>
    </main>
  )
}
