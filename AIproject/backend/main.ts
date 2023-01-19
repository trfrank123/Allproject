import { knex } from './db'
import { startServer } from './server'

startServer(knex)
