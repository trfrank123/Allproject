import { Router } from "express";
import { client } from "../db";
import "../session";
import { checkPassword } from "./hash";
export const loginRoutes = Router();

loginRoutes.post("/api/login", async (req, res) => {
  const password = req.body.password;
  const username = req.body.username;
  console.log(req.body);
  const result = await client.query(
    "SELECT id, password_hash , profile_image, nickname from users where  username=$1 ",
    [username]
  );
  let user = result.rows[0];
  console.log(result.rows);
  //Chekcing
  if (!user) {
    res.status(404);
    res.end("username , password(not correct");
    return;
  }
  const check =  await checkPassword({ password, password_hash:user.password_hash });
  console.log(check);
  if(!check){
    res.status(403);
    res.end("username , password(not correct")
    return
  }

  let id = user.id;
  let profile_image = user.profile_image;
  let nickname = user.nickname

  req.session.user = { username, id , profile_image, nickname };
  req.session.save();
  res.redirect("/");
});

loginRoutes.get("/user", async (req, res) => {
  let user = req.session?.user;
  console.log('getting user', user);

  if (!user) {
    res.status(404);
    res.end("no user in session");
    return;
  }
  res.status(202);
  res.json(user);
});