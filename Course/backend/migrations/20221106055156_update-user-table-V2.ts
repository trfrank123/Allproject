import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    const user = await knex.schema.hasTable("user");
    if (user) {
        await knex.schema.table("user", (table)=>{
            table.integer("identity").references("identity.id");
        });
    }
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.table("user", (table)=>{
        table.dropColumn('identity');
    })
}

