import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight } from 'lucide-react'

export function ClaimUsernameForm() {
  return (
    <form className="grid grid-cols-[1fr_auto] gap-2 p-4 mt-4 bg-zinc-200 rounded-md">
      <Input placeholder="call.com/usuario" />
      <Button className="col-auto bg-emerald-600 hover:bg-emerald-800">
        Reservar <ArrowRight className="w-4 h-4 ml-2 " />
      </Button>
    </form>
  )
}
