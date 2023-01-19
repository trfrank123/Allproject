import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    const course = await knex.schema.hasTable("course");
    if (!course) {
        await knex.schema.createTable("course", (table) => {
            table.increments("id");
            table.integer("price").notNullable();
            table.string("start_time").notNullable();
            table.text("discription");
            table.integer("career_path").notNullable().references("career_path.id");
            table.integer("image").notNullable().references("image.id");
            table.integer("requirements").notNullable().references("course_education_requirement.id");
            table.string("location");
            table.float("study_period").notNullable();
            table.integer("organization").notNullable().references("organization.id");
            table.integer("quota");
            table.integer("language").notNullable().references("language.id");
            table.text("contact").notNullable();
            table.integer("course_type").notNullable().references("course_type.id");
            table.float("score");
            table.integer("number_of_rating");
            table.timestamps(false, true)
        });
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("course");
}

