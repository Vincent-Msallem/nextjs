import { Method } from '@interfaces/method.interface'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

import { ObjectShape, OptionalObjectSchema } from 'yup/lib/object'

export function validate(
  schema: {
    body?: OptionalObjectSchema<ObjectShape>
    params?: OptionalObjectSchema<ObjectShape>
  } | null,
  handler: NextApiHandler,
  isSecure: boolean,
  method: Method[]
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      if (!method.includes(req.method as Method))
        return res.status(405).send('Method not allowed.')

      if (schema) {
        if (schema.body) {
          req.body = await schema.body
            ?.camelCase()
            .validate(req.body, { stripUnknown: true })
        }
        if (schema.params)
          req.query = await schema.params!.camelCase().validate(req.query)
      }

      req.body = {
        ...req.body,
      }
      await handler(req, res)
    } catch (error) {
      return res.status(409).json(error)
    }
  }
}
