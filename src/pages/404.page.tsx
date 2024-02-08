import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center text-center">
      <div className="space-y-4 px-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            404 Not found
          </h1>
          <p className="mx-auto max-w-2xl text-gray-500 md:text-xl/relaxed dark:text-gray-400">
            Oops! Não foi possível encontrar o recurso solicitado
          </p>
        </div>
        <div className="flex flex-col justify-center gap-0 sm:flex-row sm:gap-4">
          <Link
            className="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950  dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
            href="/"
          >
            Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  )
}
