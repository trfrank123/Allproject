import { compare,hash } from 'bcryptjs'

const SALT_ROUNDS = 10

export function hashPassword(password: string): Promise<string> {
    return hash(password, SALT_ROUNDS)
}

export function checkPassword(options: {
    password:string
    password_hash:string
}): Promise<boolean> {
    return compare(options.password,options.password_hash)
}