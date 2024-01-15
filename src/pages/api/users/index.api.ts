import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

import { setCookie } from 'nookies'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    // Method not supported
    return res.status(405).end()
  }

  const { name, username } = req.body

  const userExists = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (userExists) {
    return res.status(400).json({
      message: 'Já existem um usuário com este username',
    })
  }

  const user = await prisma.user.create({
    data: {
      name,
      username,
    },
  })

  setCookie({ res }, '@callscheduler:userId', user.id, {
    maxAge: 60 * 60 * 24 * 7, // days
    path: '/', // todas as rotas podem acessar este cookie
  })

  return res.status(201).json(user)
}
