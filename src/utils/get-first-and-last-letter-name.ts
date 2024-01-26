export function getFirstAndLastLetterName(name: string | undefined) {
  if (!name) {
    return 'NF'
  }

  const names = name.split(' ')

  if (names.length === 1) {
    return names[0]
  }

  const firstName = names[0]
  const lastName = names[names.length - 1]

  return firstName[0] + lastName[0]
}
