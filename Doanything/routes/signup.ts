import {Router} from "express";
import{client} from '../db';
import"../session"
import { hashPassword } from "./hash";
import formidable from "formidable";
import console from "console";
//import { stringify } from "querystring";

export const userRoutes = Router();
    
const uploadDir = "userupload"
const form = formidable({
    uploadDir,
    keepExtensions: true,
    maxFiles:1,
    maxFieldsSize:10000 * 1024 ** 2,
    filter:(part) => part.mimetype?.startsWith("image") || false,
})

// userRoutes.use(hashPassword);
//signup
userRoutes.post("/signUp", async (req, res) => {
    console.log("enter sing up server")
    form.parse(req, async (err, fields, files) => {
        console.log({fields, files})
    // const created_at = req.body.created_at;
    const created_at = new Date();
    const modified_at = fields.modified_at;
    const username = fields.username;

    const password = fields.password;
//  if(typeof password !== 'string'){
//     res.status(403);
//         res.end('not a number')
//         return
//  }
    let hash = await hashPassword (password as string);
    console.log(hash);
    const nickname = fields.nickname;
    const email = fields.email;
    const phone = fields.phone;
    // const profile_image = req.body.profile_image;
    // const skills = req.body.skills;
    // const skills = "skills test";
    // const is_admin = req.body.is_admin;
    const is_admin = false;
    const accept_marketing = fields.accept_marketing;
    const intro = fields.intro;
    // const photo_name = req.body.photo_name;
    // const date_of_birth = req.body.date_of_birth;
  
    let image = files.profile_image;
    let imageFile = Array.isArray(image) ? image[0] : image;
    let profile_image = imageFile ? imageFile.newFilename : "";
    

// if(typeof username !== "string"){
//     res.status(403);
//         res.end('not a number')
//         return
// }
        
    // check username
    // if(!username.match(/^[a-zA-Z0-9]/)){
    //     res.status(403);
    //     res.end('not a number')
    //     return
    // }
    //     //check password
       
        
    // // //check email
    //     // if(!email.match(/^[@]/)){
    //     //     res.status(404)
    //     //     res.end('not a email address')
    //     //     return        
    //     // }
    //     // check phone
    //     if(phone.lenght < 8 || phone.match(/^[0-9]/)){
    //         res.status(403)
    //         res.end('not a phone number')
    //         return
    //     }

        //check date_of_birth
        let password_hash = await hashPassword((password) as string)
        console.log(profile_image)
   let result = await client.query("insert into users (created_at , modified_at , username , password , nickname , email , phone , profile_image , is_admin , accept_marketing , password_hash , intro ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) returning id",[created_at , modified_at , username , password , nickname , email , phone , profile_image , is_admin , accept_marketing , password_hash , intro  ]);
  let id = result.rows[0].id;
  
  
  req.session.user = {id: id,username :username as string , profile_image, nickname:nickname as string};
  req.session.save();
  res.redirect('/'); 

})});

//logout 
userRoutes.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500);
      res.end("failed to logiut");
      return
    }



  res.status(202)
  res.end('logout successfully!')
})
});
