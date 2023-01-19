import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    async function seedRow(table: string, age_range: object) {
        let row = await knex(table).select('id').where(age_range).first();
        if (!row) {
            await knex(table).insert(age_range);
        }
      }
    
    await seedRow("age", { age_range: "14-18" });
    await seedRow("age", { age_range: "19-25" });
    await seedRow("age", { age_range: "26-30" });
    await seedRow("age", { age_range: "31-35" });
    await seedRow("age", { age_range: "36-40" });
    await seedRow("age", { age_range: "41-45" });
    await seedRow("age", { age_range: "46-50" });
    await seedRow("age", { age_range: "51-55" });
    await seedRow("age", { age_range: "56-60" });
};
