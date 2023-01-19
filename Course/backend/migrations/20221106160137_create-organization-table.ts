import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const organization = await knex.schema.hasTable("organization");
    if (!organization) {
        await knex.schema.createTable("organization", (table) => {
            table.increments("id");
            table.text("organization_name").notNullable();
            table.string("organization_hotline").notNullable();
            table.string("organization_hotline2");
            table.string("establishment_year").notNullable();
            table.text("address").notNullable();
            table.timestamps(false, true)
        });
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("organization");
}

