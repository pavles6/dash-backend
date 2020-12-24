import { Resolver, Mutation, Arg } from 'type-graphql'
import { User } from '../../entity/User'
import { redis } from '../../redis'
import { EmailType } from '../../types/EmailType'
import { RedisPrefix } from '../../types/RedisPrefix'
import { generateCode } from '../../utils/generate-code'
import { sendEmail } from '../../utils/send-email'
import { RegisterInput } from './register/RegisterInput'

@Resolver()
export class RegisterResolver {
  @Mutation(() => User)
  async register(@Arg('data') data: RegisterInput): Promise<User> {
    const user = await User.create(data).save()

    const code = generateCode()
    console.log(code)
    try {
      await redis.set(
        RedisPrefix.AccountConfirmation + code,
        user.id,
        'ex',
        60 * 60 * 24 // expires in 1 day
      )
    } catch (error) {
      throw error
    }

    await sendEmail(user.email, code, EmailType.AccountConfirmation)

    return user
  }
}
