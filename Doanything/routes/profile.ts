import { Router } from "express";
import { client } from "../db";
import "../session";

export const profileRoute = Router();


// datatbase get to json

profileRoute.get('/profile' , async(req, res) => {
    let userId = req.session.user!.id
    let result = await client.query(
        `SELECT  username , password , nickname , email , phone , intro from users where id = ${userId}`);
        if(!result){
            console.log("not result");
        }
      console.log(result.rows);
res.json(result.rows[0]);
});

// json front end