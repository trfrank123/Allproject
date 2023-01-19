import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    let XLSX = require("xlsx");
    let workbook = XLSX.readFile("./seeds/fixed_data/database_seed.xlsx");
    let seedXlsx = XLSX.utils.sheet_to_json(workbook.Sheets.education);

    async function seedRow(table: string, range: object) {
        let row = await knex(table).select('id').where(range).first();
        if (!row) {
            await knex(table).insert(range);
        }
      }
    for(let seed of seedXlsx){
        await seedRow("education", { "education_level": seed.level});
    }
};

// result = {"namuser_id": userID, "course_id":coureseID }
// await knex("user").insert(result)