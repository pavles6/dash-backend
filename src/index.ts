// import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import dotenv from 'dotenv'

import { createTypeormConn } from './utils/create-typeorm-conn'
import { createSchema } from './utils/create-graphql-schema'

dotenv.config()

const main = async () => {
  try {
    await createTypeormConn()
  } catch (error) {
    console.log(error)
  }

  const schema = await createSchema // awaits promise returned from buildSchema

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res, auth: {} }),
    introspection: true,
    playground: process.env.NODE_ENV === 'development',
  })

  const app = express()
  app.set('trust proxy', true)

  apolloServer.applyMiddleware({ app })

  const port = process.env.PORT || 8080
  app.listen(port, async () => {
    console.log(
      `🚀 Running on http://localhost:${port} in ${process.env.NODE_ENV}`
    )
  })
}

main()
