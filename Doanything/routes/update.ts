import { Router } from "express";
import { client } from "../db";
import "../session";
import formidable from "formidable";
import { hashPassword } from "./hash";

export const updateRoutes = Router();
const uploadDir = "userupload";

const form = formidable({
  uploadDir,
  keepExtensions: true,
  maxFiles: 1,
  maxFieldsSize: 10000 * 1024 ** 2,
  filter: (part) => part.mimetype?.startsWith("image") || false,
});

updateRoutes.patch("/profile", async (req, res) => {
  if (!req.session.user) {
    res.status(401);
    res.end();
    return;
  }
  // let id = 3 //req.session.user
  console.log(req.body);
  form.parse(req, async (err, fields, files) => {
    console.log(fields, files);
    // for (let field in fields){
    // if (Array.isArray(fields[field]))return
    //     }

    let profile_image = Array.isArray(files.profile_image)
      ? files.profile_image[0].newFilename
      : files.profile_image.newFilename;
    let user: Object = fields;
    user["phone"] = parseInt(user["phone"]);
    user['password'] = await hashPassword(user["password"]);
    user["profile_image"] = profile_image;
    let sql = "update users set ";
    let binding = [];
    let idx = 1;
    let fields_name = [
      "username",
      "nickname",
      "email",
      "password",
      "phone",
      "intro",
      "profile_image",
    ];
    for (let field of fields_name) {
      console.log(field);
      sql += `${field}=$${idx},`;
      binding.push(user[field]);
      idx++;
    }
    sql = sql.slice(0, sql.length - 1);
    sql += ` where id=${req.session.user?.id}`;
    console.log(sql);
    console.log(binding);

    await client.query(sql, binding);
    req.session.user!.profile_image = profile_image;
    res.json({ message: "update successful" });
  });
});

// export function update(req: Request , res: Response){
//     let id = req.session.user.id
//     let bindings = [id]
//     let set = []

//     for (let field of fields)
//     let values = req.body{field}
//     if {!value} continue;
//     let i = bindings.lenght +1
//      set.push('${filed} = $${i}')
//      bindings.push(value)
// }

// let sql = /*sql*/
// update "user"
// set  ${set}
// where id = $1
