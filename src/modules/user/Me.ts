import { Resolver, Query, Ctx, UseMiddleware } from 'type-graphql'
import { User } from '../../entity/User'
import { ResolverContext } from '../../types/ResolverContext'

import { isAuth } from '../../utils/is-auth'

@Resolver()
export class MeResolver {
  @UseMiddleware(isAuth)
  @Query(() => User, { nullable: true })
  async me(@Ctx() { userId }: ResolverContext): Promise<User | undefined> {
    return await User.findOne({ where: { id: userId } })
  }
}
