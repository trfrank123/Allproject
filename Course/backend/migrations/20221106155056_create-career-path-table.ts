import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const career_path = await knex.schema.hasTable("career_path");
    if (!career_path) {
        await knex.schema.createTable("career_path", (table) => {
            table.increments("id");
            table.string("path_name").notNullable();
            table.string("min_future_salary");
            table.string("max_future_salary");
            table.timestamps(false, true);
        });
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("career_path");
}

