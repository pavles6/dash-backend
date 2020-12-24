import { Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'
import { User } from '../../entity/User'
import { ResolverContext } from '../../types/ResolverContext'
import { isAuth } from '../../utils/is-auth'

// this is used for situations like when user changes a password or to log out from all devices

@Resolver()
export class InvalidateTokensResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async invalidateTokens(@Ctx() { userId }: ResolverContext) {
    const user = (await User.findOne({ id: userId as string })) as any

    user.count++

    return true
  }
}
