import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    const user = await knex.schema.hasTable("user");
    if (user) {
        await knex.schema.table("user", (table)=>{
            table.integer("ideal_work_location").references("location.id");
            table.string("icon").nullable();
            table.integer("ideal_career1").references("ideal_career.id");
            table.integer("ideal_career2").references("ideal_career.id");
            table.integer("ideal_career3").references("ideal_career.id");
            table.integer("expect_salary").references("salary.id");
        });
    }
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.table("user", (table)=>{
        table.dropColumn('icon');
        table.dropColumn('ideal_career1');
        table.dropColumn('ideal_career2');
        table.dropColumn('ideal_career3');
        table.dropColumn('ideal_work_location');
        table.dropColumn('expect_salary');
    })
}