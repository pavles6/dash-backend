import bcrypt from 'bcryptjs'
import { Arg, Mutation, Resolver } from 'type-graphql'
import { User } from '../../entity/User'
import { redis } from '../../redis'
import { RedisPrefix } from '../../types/RedisPrefix'
import { ChangePasswordInput } from './changePassword/ChangePasswordInput'

@Resolver()
export class ChangePasswordResolver {
  @Mutation(() => Boolean)
  async changePassword(
    @Arg('data') { password, code }: ChangePasswordInput
  ): Promise<boolean> {
    const userId = await redis.get(RedisPrefix.PasswordChangeRequest + code)

    if (!userId) return false

    const user = (await User.findOne({ where: { id: userId } })) as User

    const hashedPassword = await bcrypt.hash(password, 12)

    if (await bcrypt.compare(hashedPassword, user.password))
      throw new Error("New password can't be same as the old password.")

    user.password = hashedPassword

    await user.save()

    await redis.del(RedisPrefix.PasswordChangeRequest + code)

    return true
  }
}
