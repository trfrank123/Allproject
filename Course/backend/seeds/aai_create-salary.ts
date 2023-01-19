import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    let XLSX = require("xlsx");
    let workbook = XLSX.readFile("./seeds/fixed_data/database_seed.xlsx");
    let seedXlsx = XLSX.utils.sheet_to_json(workbook.Sheets.salary);

    async function seedRow(table: string, salary_range: object) {
        let row = await knex(table).select('id').where(salary_range).first();
        if (!row) {
            await knex(table).insert(salary_range);
        }
      }
    for(let seed of seedXlsx){
        await seedRow("salary", { "salary_range": seed.range});
    }
};