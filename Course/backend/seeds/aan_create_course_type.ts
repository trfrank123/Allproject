import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    let XLSX = require("xlsx");
    let workbook = XLSX.readFile("./seeds/fixed_data/database_seed.xlsx");
    let seedXlsx = XLSX.utils.sheet_to_json(workbook.Sheets.type);

    async function seedRow(table: string, range: object) {
        let row = await knex(table).select('id').where(range).first();
        if (!row) {
            await knex(table).insert(range);
        }
      }
    for(let seed of seedXlsx){
        await seedRow("course_type", { "course_type": seed.type});
    }
};