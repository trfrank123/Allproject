import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    const course = await knex.schema.hasTable("course");
    if (course) {
        await knex.schema.table("course", (table)=>{
            table.integer("fund_mode").notNullable().references("fund_mode.id");
        });
    }
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.table("course", (table)=>{
        table.dropColumn('fund_mode');
    })
}