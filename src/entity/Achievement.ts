import { Field, ID, ObjectType } from 'type-graphql'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'

ObjectType()
@Entity('achievements')
export class Achievement {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.tasks)
  user: User

  @Field()
  @Column('varchar', { length: 50 })
  title: string

  @Field()
  @Column('varchar', { length: 150 })
  description: string

  @Field()
  @Column('varchar', { length: 255 })
  icon: string
}
