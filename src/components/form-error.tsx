interface FormErrorProps {
  description: string
}

export function FormError({ description }: FormErrorProps) {
  return <span className="text-sm font-medium text-red-700">{description}</span>
}
