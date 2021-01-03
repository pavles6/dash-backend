import { Arg, Mutation, Resolver } from 'type-graphql'
import { Task } from '../../entity/Task'
import { User } from '../../entity/User'
import { TaskInput } from './TaskInput'

@Resolver()
export class CreateTaskResolver {
  @Mutation(() => Task)
  async createTask(
    @Arg('data')
    { invokeAt, taskPriority, taskType, title, userId }: TaskInput
  ) {
    const user = await User.findOne({ id: userId })

    if (!user) return null

    return await Task.create({
      invokeAt,
      taskPriority,
      taskType,
      title,
      user,
    }).save()
  }
}
