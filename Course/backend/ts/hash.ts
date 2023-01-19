import { hash, compare } from 'bcrypt'

// deepcode ignore HardcodedSecret: this is number of round, not the fixed salt
let ROUND = 12

export async function hashPassword(password: string) {
  let password_hash: string = await hash(password, ROUND)
  return password_hash
}

export async function comparePassword(input: {
  password: string
  password_hash: string
}) {
  let is_match: boolean = await compare(input.password, input.password_hash)
  return is_match
}
