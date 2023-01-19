import {Router} from "express";
import{client} from '../db';

export const registerRoutes = Router();

// database routes
registerRoutes.post("/register", async (req, res) => {
    //console.log(req.body)
    // data.push(req.body);
   const created_at = req.body.created_at;
    const modified_at = req.body.modified_at;
    const username = req.body.username;
    const password = req.body.password;
    const nickname = req.body.nickname;
    const email = req.body.email;
    const phone = req.body.phone;
    const profile_image = req.body.profile_image;
    const skills = req.body.skills;
    const is_employee = req.body.is_employee;
    const is_admin = req.body.is_admin;
    const accept_marketing = req.body.accept_marketing;
    const intro = req.body.intro;

    
    //const sql = req.body.sql;

    await client.query("insert into users (created_at , modified_at , username , password , nickname , email , phone , profile_image , skill , is_employer , is_admin , accept_marketing , intro) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",[created_at , modified_at , username , password , nickname , email , phone , profile_image , skills , is_employee , is_admin , accept_marketing , intro])
    res.json({})

});
