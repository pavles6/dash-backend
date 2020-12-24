import { ObjectType } from 'type-graphql'
import { Entity } from 'typeorm'

ObjectType()
@Entity('notifications')
export class Notification {}
