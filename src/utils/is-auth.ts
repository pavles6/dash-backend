import { verify } from 'jsonwebtoken'
import { MiddlewareFn } from 'type-graphql'
import { User } from '../entity/User'
import { ResolverContext } from '../types/ResolverContext'
import { createTokens } from './create-tokens'

const authErrorMessage = 'Authentication failed.'

export const isAuth: MiddlewareFn<ResolverContext> = async (
  { context },
  next
) => {
  if (!context.userId) {
    const accessToken = context.req.cookies['access_token']
    const refresh_token = context.req.cookies['refresh_token']

    if (!refresh_token && !accessToken) {
      throw new Error(authErrorMessage)
    }

    try {
      const data = verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET as string
      ) as any

      context.userId = data.userId
    } catch (e) {
      // here error is being thrown 100% beacuse of the bad token

      if (!refresh_token) {
        throw new Error(authErrorMessage)
      }

      try {
        const { userId, count } = verify(
          refresh_token,
          process.env.REFRESH_TOKEN_SECRET as string
        ) as any

        const user = await User.findOne({ where: { id: userId } })

        // token has been invalidated
        if (!user || user?.refreshTokenCount !== count) {
          throw new Error(authErrorMessage)
        }

        await user.save()

        const { accessToken, refreshToken } = createTokens(user)

        // sending a new refresh token here means that every user that is using
        // the app in the last 7 days of last use will be still logged in for next
        // 7 days on the device which has refresh token
        context.res.cookie('access_token', accessToken)
        context.res.cookie('refresh_token', refreshToken)

        context.userId = userId
      } catch (error) {
        throw new Error(authErrorMessage)
      }
    }
  }

  return next()
}
