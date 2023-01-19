import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    let XLSX = require("xlsx");
    let workbook = XLSX.readFile("./seeds/real_data/course.xlsx");
    let seedXlsx = XLSX.utils.sheet_to_json(workbook.Sheets.course2022);

    async function getID(table: string, range: object): Promise<number> {
        let row = await knex(table).select('id').where(range).first();
        if (!row) {
            return 0;
        }
        return row.id
    }

    async function seedRow(table: string, range: object) {
        let row = await knex(table).select('id').where(range).first();
        if (!row) {
            await knex(table).insert(range);
        }
    }

    for (let seed of seedXlsx) {
        let imageID = await getID("image", { "name": seed.organization });
        let cerID = await getID("course_education_requirement", { "education_requirement": seed.requirement });
        let organizationID = await getID("organization", { "organization_name": seed.organization });
        let languageID = await getID("language", { "language": seed.teach_language });
        let courseTypeID = await getID("course_type", { "course_type": seed.course_type });
        let fund_modeID = await getID("fund_mode", { "fund_mode": seed.fund_mode });
        let areaOfStudyID = await getID("industrial_classification", {"chi_name": seed.area_of_study});
        let industryID = await getID("ideal_career", { "chi_name": seed.industry}) ;

        await seedRow("course", {
            "program_name" : seed.name,
            "price": seed.fee,
            "discription": seed.apply_info,
            "image": imageID,
            "requirements": cerID,
            "location": seed.location,
            "study_period": seed.study_period,
            "organization": organizationID,
            "language": languageID,
            "course_type": courseTypeID,
            "fund_mode": fund_modeID,
            "year": seed.year,
            "area_of_study": areaOfStudyID,
            "industry" : industryID
        });
    }
};