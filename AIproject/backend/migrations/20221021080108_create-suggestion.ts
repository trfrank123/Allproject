import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('suggestion', table => {
        table.increments('id')
        table.integer('user_id').references('user.id').notNullable()
        table.string('suggestion', 300).notNullable()
        table.timestamp('date').notNullable()
      })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('suggestion')
}

