import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const hobby = await knex.schema.hasTable("hobby");
    if (!hobby) {
        await knex.schema.createTable("hobby", (table) => {
            table.increments("id");
            table.integer("user_id").notNullable().references("user.id");
            table.integer("ideal_career1").notNullable().references("ideal_career.id");
            table.integer("ideal_career2").notNullable().references("ideal_career.id");
            table.integer("ideal_career3").notNullable().references("ideal_career.id");
        });
    }
}




export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("hobby");
}

