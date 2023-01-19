import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const job_function = await knex.schema.hasTable("job_function");
    if (!job_function) {
        await knex.schema.createTable("job_function", (table) => {
            table.increments("id");
            table.string("job_type").notNullable();
        });
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("job_function");
}

