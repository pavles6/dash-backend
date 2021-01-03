import { Length } from 'class-validator'
import { InputType, Field } from 'type-graphql'
import { PasswordInput } from '../shared/PasswordInput'

@InputType()
export class ChangePasswordInput extends PasswordInput {
  @Field()
  @Length(6)
  code: string
}
