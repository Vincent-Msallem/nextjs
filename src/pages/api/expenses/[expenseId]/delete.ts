// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@lib/db-connection'
import { validate } from '@middleware/validateResource'
import { Params } from '@/schema/expenses.schema'
import type { ResponseData } from '@interfaces/response'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
): Promise<void> {
  try {
    const { expenseId } = req.query as Params

    await prisma.expenses.delete({
      where: {
        id: +expenseId!,
      },
    })

    res.status(201).json({ message: 'Expense deleted!' })
  } catch (e) {
    return res.status(500).json({ message: 'Server error' })
  }
}

export default validate(null, handler, true, ['DELETE'])
