import { Arg, Mutation, Resolver } from 'type-graphql'
import { User } from '../../entity/User'
import { redis } from '../../redis'
import { RedisPrefix } from '../../types/RedisPrefix'
import { generateVerificationCode } from '../../utils/generate-verification-code'
import { sendEmail } from '../../utils/send-email'

@Resolver()
export class ForgotPasswordResolver {
  @Mutation(() => Boolean)
  async forgotPassword(@Arg('email') email: string): Promise<boolean> {
    const user = await User.findOne({ where: { email } })

    if (!user) return false

    const code = generateVerificationCode()
    console.log(`${RedisPrefix.PasswordChangeRequest}${code} -> ${user.email}`)
    try {
      await redis.set(
        RedisPrefix.PasswordChangeRequest + code,
        user.id,
        'ex',
        60 * 60 * 24 // expires in 1 day
      )
    } catch (error) {
      throw error
    }

    await sendEmail(
      'Reset your password',
      user.email,
      `Verify it's you by using code: ${code}`
    )

    return true
  }
}
