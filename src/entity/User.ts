import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm'
import bcrypt from 'bcryptjs'
import { ObjectType, Field, ID } from 'type-graphql'
import { Task } from './Task'
import { Achievement } from './Achievement'

@ObjectType()
@Entity('users')
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column('varchar', { length: 255, unique: true })
  email: string

  @Column('text')
  password: string

  @Column('bool', { default: false })
  confirmed: boolean

  @Field()
  @Column('varchar', { length: 30 })
  name: string

  @Field(() => [Task], { nullable: true })
  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[]

  @Field(() => [Achievement], { nullable: true })
  @OneToMany(() => Achievement, (achievement) => achievement.user)
  achievements: Achievement[]

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12)
  }
}
