// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@lib/db-connection'
import { validate } from '@middleware/validateResource'
import type { ResponseData } from '@interfaces/response'
import { Expense } from '@interfaces/expense'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData<Expense[]>>
): Promise<void> {
  try {
    const expenses = await prisma.expenses.findMany()

    const data: Expense[] | any = expenses.map((expense) => ({
      id: expense.id,
      name: expense.name,
      amount: expense.amount,
      description: expense.description,
      created: expense.created,
    }))

    res.status(201).json({ message: 'Expenses found', data })
  } catch (e) {
    return res.status(500).json({ message: 'Server error' })
  }
}

export default validate(null, handler, false, ['GET'])
