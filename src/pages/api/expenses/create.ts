// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@lib/db-connection'
import { validate } from '@middleware/validateResource'
import { CreateInputBody, createSchema } from '@/schema/expenses.schema'
import { getFormattedDate } from '@lib/utils'
import type { ResponseData } from '@interfaces/response'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
): Promise<void> {
  try {
    const { amount, name, description } = req.body as CreateInputBody

    await prisma.expenses.create({
      data: {
        amount: amount!,
        description: description!,
        created: new Date(getFormattedDate()),
        name: name!,
      },
    })

    return res.status(201).json({ message: 'Expense created!' })
  } catch (e) {
    return res.status(500).json({ message: 'Server error' })
  }
}

export default validate(createSchema, handler, true, ['POST'])
