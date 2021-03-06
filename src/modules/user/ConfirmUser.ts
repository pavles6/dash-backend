import { Resolver, Mutation, Ctx, Arg } from 'type-graphql'
import { User } from '../../entity/User'
import { redis } from '../../redis'
import { RedisPrefix } from '../../types/RedisPrefix'
import { ResolverContext } from '../../types/ResolverContext'

@Resolver()
export class ConfirmUserResolver {
  @Mutation(() => Boolean)
  async confirmUser(
    @Ctx() ctx: ResolverContext,
    @Arg('code') code: string
  ): Promise<boolean> {
    const userId = await redis.get(RedisPrefix.AccountConfirmation + code)

    if (!userId) return false

    const user = (await User.findOne({ where: { id: userId } })) as User

    user.confirmed = true

    await user.save()

    await redis.del(RedisPrefix.AccountConfirmation + code)

    ctx.userId = userId

    return true
  }
}
