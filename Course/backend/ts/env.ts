import { config } from 'dotenv'
import populateEnv from 'populate-env'

config()

export let env = {
  NODE_ENV: 'development',
  DB_NAME: '',
  DB_USERNAME: '',
  DB_PASSWORD: '',
  DB_HOST: '',
  DB_PORT: 0,
  PORT: 0
}

populateEnv(env, { mode: 'halt' })