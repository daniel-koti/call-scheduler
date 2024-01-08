import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight } from 'lucide-react'

export function ClaimUsernameForm() {
  return (
    <form className="mt-4 grid grid-cols-[1fr_auto] gap-2 rounded-md bg-zinc-200 p-4">
      <Input placeholder="call.com/usuario" />
      <Button className="col-auto bg-emerald-600 hover:bg-emerald-800">
        Reservar <ArrowRight className="ml-2 h-4 w-4 " />
      </Button>
    </form>
  )
}
