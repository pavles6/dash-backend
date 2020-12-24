import { sign } from 'jsonwebtoken'
import { User } from '../entity/User'

export const createTokens = (user: User) => {
  const accessToken = sign(
    { userId: user.id },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: '15m' }
  )

  const refreshToken = sign(
    { userId: user.id, count: user.refreshTokenCount },
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn: '7d' }
  )

  return { accessToken, refreshToken }
}
