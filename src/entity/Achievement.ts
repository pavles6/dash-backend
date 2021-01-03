import { Field, ID, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './User'

@ObjectType()
@Entity('achievements')
export class Achievement extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.achievements, { onDelete: 'CASCADE' })
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
