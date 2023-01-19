import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('rolexInfo', table => {
        table.increments('id')
        table.string('image', 80).notNullable()
        table.string('model', 70).notNullable()
        table.string('year', 4).notNullable()
        table.string('reference_number', 20).notNullable()
        table.decimal('price_2018').notNullable()
        table.decimal('price_2020').notNullable()
        table.decimal('price_2022').notNullable()
      })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('rolexInfo')
}

