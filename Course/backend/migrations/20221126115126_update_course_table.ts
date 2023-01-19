import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable("course", (table) => {
        table.integer("area_of_study").notNullable().references("industrial_classification.id");
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.table("course", (table)=>{
        table.dropColumn("area_of_study");
    })
}