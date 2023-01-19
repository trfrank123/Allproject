import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const image = await knex.schema.hasTable("image");
    if (!image) {
        await knex.schema.createTable("image", (table) => {
            table.increments("id");
            table.text("source").notNullable();
            table.string("name").notNullable();
        });
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("image");
}

