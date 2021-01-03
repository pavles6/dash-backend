import { ChangePasswordResolver } from '../modules/user/ChangePassword'
import { ConfirmUserResolver } from '../modules/user/ConfirmUser'
import { ForgotPasswordResolver } from '../modules/user/ForgotPassword'
import { LoginResolver } from '../modules/user/Login'
import { MeResolver } from '../modules/user/Me'
import { RegisterResolver } from '../modules/user/Register'
import { buildSchema } from 'type-graphql'
import { CreateUserResolver } from '../modules/user/CreateUser'
import { CreateTaskResolver } from '../modules/task/CreateTask'
import { GetTasksResolver } from '../modules/task/GetTasks'

export const createSchema = buildSchema({
  resolvers: [
    GetTasksResolver,
    CreateTaskResolver,
    ChangePasswordResolver,
    ConfirmUserResolver,
    ForgotPasswordResolver,
    LoginResolver,
    MeResolver,
    RegisterResolver,
    CreateUserResolver,
  ],
})
