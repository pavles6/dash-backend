import { Resolver, Mutation, Arg } from 'type-graphql'
import bcrypt from 'bcryptjs'

import { User } from '../../entity/User'
import { ChangePasswordInput } from './changePassword/ChangePasswordInput'

@Resolver()
export class ChangePasswordResolver {
  @Mutation(() => Boolean)
  async changePassword(
    @Arg('data') { password }: ChangePasswordInput
  ): Promise<boolean> {
    const userId = ''

    if (!userId) return false

    const user = await User.findOne({ where: { id: userId } })

    if (!user) return false

    user.password = await bcrypt.hash(password, 12)

    await user.save()

    return true
  }
}
