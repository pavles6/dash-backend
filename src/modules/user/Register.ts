import { Resolver, Mutation, Arg } from 'type-graphql'
import { Achievement } from '../../entity/Achievement'
import { User } from '../../entity/User'
import { redis } from '../../redis'
import { RedisPrefix } from '../../types/RedisPrefix'
import { generateVerificationCode } from '../../utils/generate-verification-code'
import { sendEmail } from '../../utils/send-email'
import { RegisterInput } from './register/RegisterInput'

@Resolver()
export class RegisterResolver {
  @Mutation(() => User)
  async register(@Arg('data') data: RegisterInput): Promise<User> {
    const user = await User.create(data).save()

    await Achievement.create({
      title: `Welcome ${user.name}!`,
      description: 'Start using the app by creating a new task',
      icon: 'https://img.icons8.com/color/96/000000/rocket--v1.png',
      user,
    }).save()

    const code = generateVerificationCode()
    console.log(`${RedisPrefix.AccountConfirmation}${code} -> ${user.email}`)
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

    await sendEmail(
      'Confirm your account',
      user.email,
      `Confirmation code: ${code}`
    )

    return user
  }
}
