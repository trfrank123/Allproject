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
        await seedRow("organization", { "organization_name": seed.name, 
                                        "organization_hotline" : seed.hotline,
                                        "establishment_year" : seed.establishment_year,
                                        "address" : seed.address,
                                        "email" : seed.email,
                                        "website": seed.website});
    }
};