import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const course = await knex.schema.hasTable("course");
    if (course) {
        await knex.schema.table("course", (table) => {
            table.dropForeign('career_path');
        });
    }
}


export async function down(knex: Knex): Promise<void> {
}

