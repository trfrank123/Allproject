import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('user', table => {
        table.increments('id')
        table.string('username', 32).notNullable()
        table.string('password_hash', 72).notNullable()
        table.string('gender',8).notNullable()
        table.string('nickname').notNullable()
        table.string('email').nullable()
})
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('user')
}

