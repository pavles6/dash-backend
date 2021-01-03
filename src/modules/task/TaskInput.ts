import { IsDate, IsEnum, IsUUID, Length } from 'class-validator'
import { Field, InputType } from 'type-graphql'
import { TaskPriority, TaskType } from '../../entity/task/TaskTypes'

@InputType()
export class TaskInput {
  @Field()
  @IsUUID()
  userId: string

  @Field()
  @Length(3, 120)
  title: string

  @Field()
  @IsEnum(TaskType)
  taskType: TaskType

  @Field()
  @IsEnum(TaskPriority)
  taskPriority: TaskPriority

  @Field()
  @IsDate()
  invokeAt: Date
}
