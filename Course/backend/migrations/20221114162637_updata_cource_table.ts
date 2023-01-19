import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const course = await knex.schema.hasTable("course");
    if (course) {
        await knex.schema.alterTable("course", (table) => {
            table.string("career_path").nullable().alter();
        });
    }
}


export async function down(knex: Knex): Promise<void> {
}

