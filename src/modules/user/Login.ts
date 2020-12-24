import bcrypt from 'bcryptjs'
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { User } from '../../entity/User'
import { ResolverContext } from '../../types/ResolverContext'
import { createTokens } from '../../utils/create-tokens'

@Resolver()
export class LoginResolver {
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { userId, res }: ResolverContext
  ): Promise<User | null> {
    if (userId) return null

    const user = await User.findOne({ where: { email } })
    if (!user) {
      return null
    }

    const valid = await bcrypt.compare(password, user.password)

    if (!valid) {
      return null
    }

    if (!user.confirmed) throw new Error('You have not confirmed your account.')

    const { accessToken, refreshToken } = createTokens(user)

    res.cookie('access_token', accessToken)
    res.cookie('refresh_token', refreshToken)

    return user
  }
}
