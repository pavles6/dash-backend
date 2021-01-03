import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  AfterInsert,
} from 'typeorm'
import { ObjectType, Field, ID } from 'type-graphql'
import { TaskPriority, TaskType } from './task/TaskTypes'
import { User } from './User'

@ObjectType()
@Entity('tasks')
export class Task extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.tasks)
  user: User

  @Field()
  @Column('varchar', { length: 255 })
  title: string

  @Field()
  @Column('enum', { enum: TaskType })
  taskType: TaskType

  @Field()
  @Column('enum', { enum: TaskPriority })
  taskPriority: TaskPriority

  @Field()
  @Column('timestamp')
  invokeAt: Date

  @Field({ nullable: true })
  @Column('boolean', { default: false })
  done: boolean

  @AfterInsert()
  scheduleTask(): void {
    switch (this.taskType) {
      case TaskType.OneTime:
        // ....
        break
      case TaskType.Repeatable:
        // ....
        break
    }
  }
}
