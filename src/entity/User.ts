import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  // AfterInsert,
  OneToMany,
  AfterLoad,
} from 'typeorm'
import bcrypt from 'bcryptjs'
import { ObjectType, Field, ID } from 'type-graphql'
import { Task } from './Task'

@ObjectType()
@Entity('users')
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('int', { default: 0 })
  refreshTokenCount: number

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

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12)
  }

  @AfterLoad()
  xD(): void {
    console.log('hey user is loaded.')
  }
}
