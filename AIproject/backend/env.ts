import { config } from 'dotenv'
import populateEnv from 'populate-env'

config()

export let env = {
  NODE_ENV: 'development',
  DB_NAME: '',
  DB_USER: '',
  DB_PASSWORD: '',
  PORT: 3000,
}

populateEnv(env, { mode: 'halt' })