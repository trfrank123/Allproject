import { config } from 'dotenv'
import populateEnv from 'populate-env'

config()

export let env = {
  DB_NAME: '',
  DB_USER: '',
  DB_PASSWORD: '',
  DB_HOST: 'localhost',
  PORT: 8080,
}

populateEnv(env, { mode: 'halt' })