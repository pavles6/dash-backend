import { verify } from 'jsonwebtoken'
import { MiddlewareFn } from 'type-graphql'
import { ResolverContext } from '../types/ResolverContext'
import { logAndFail } from './log-and-fail'

export const isAuth: MiddlewareFn<ResolverContext> = async (
  { context },
  next
) => {
  if (!context.userId) {
    const token = context.req.get('Authorization')

    if (!token) logAndFail(context.req, 'Auth failed, no token supplied.')

    try {
      const data = verify(
        token as string,
        process.env.ACCESS_TOKEN_SECRET as string
      )
      context.userId = (data as any).userId
    } catch {
      logAndFail(context.req, 'Auth failed beacuse of bad token.')
    }
  }
  return next()
}
