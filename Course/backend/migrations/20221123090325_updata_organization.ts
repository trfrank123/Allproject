import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable("organization", (table) => {
        table.string("email").notNullable();
        table.string("website").notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.table("organization", (table)=>{
        table.dropColumn("email");
        table.dropColumn("website");
    })
}