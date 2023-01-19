import Knex from 'knex'
import { env } from './env'

let profiles = require('../knexfile')
console.log('loading knex profile:', env.NODE_ENV)
let profile = profiles[env.NODE_ENV]
if (!profile) {
  throw new Error('missing knex profile: ' + env.NODE_ENV)
}

export let knex = Knex(profile)