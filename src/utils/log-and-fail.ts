import { Request } from 'express'

export function logAndFail(req: Request, message: string) {
  console.log(
    `[${
      req.ip || req.headers['x-forwarded-for']
    }] ${new Date().toISOString()} -> ${message}`
  )

  throw new Error('Looks like something went wrong, please try again later.')
}
