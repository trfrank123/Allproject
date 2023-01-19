import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    let XLSX = require("xlsx");
    let workbook = XLSX.readFile("./seeds/real_data/course.xlsx");
    let seedXlsx = XLSX.utils.sheet_to_json(workbook.Sheets.institution);

    async function seedRow(table: string, range: object) {
        let row = await knex(table).select('id').where(range).first();
        if (!row) {
            await knex(table).insert(range);
        }
      }
    for(let seed of seedXlsx){
        await seedRow("image", { "name": seed.name, "source" : seed.file_name });
    }
};