import { Arg, Query, Resolver } from 'type-graphql'
import { Task } from '../../entity/Task'
import { User } from '../../entity/User'

@Resolver()
export class GetTasksResolver {
  @Query(() => Task, { nullable: true })
  async getTasks(@Arg('id') id: string) {
    const user = await User.findOne({ id })
    return await Task.find({ user })
  }
}
