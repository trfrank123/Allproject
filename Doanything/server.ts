import express from "express";
import http from 'http'
import SocketIO from 'socket.io'
import { print } from "listening-on";
import { env } from "./env";
import { jobRoutes } from './routes/job' // postRouter by Oliver
import { bookmarkRoutes } from './routes/bookmark'
import { registerRoutes } from './routes/register'
import { userRoutes } from './routes/signup'
import { sessionMiddleware } from "./session";
import {loginRoutes} from "./routes/login"
import {profileRoute} from "./routes/profile";
import {updateRoutes} from "./routes/update";
import { chatRoutes } from './routes/chat'
// import { Request, Response, NextFunction} from 'express'
// import { compare, hash } from 'bcryptjs'

//Setup
const app = express();
const server = new http.Server(app);
const io = new SocketIO.Server(server);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//Middleware
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use(express.static("public"));
app.use("/userupload" , express.static("userupload"));
app.use(sessionMiddleware)

// app.use('/employer',jobRoutes)
app.use('/freelancer',jobRoutes)
app.use('/filter',jobRoutes)
app.use('/search',jobRoutes)
app.use('/bookmark', bookmarkRoutes)
app.use(registerRoutes)
app.use(userRoutes)
app.use(loginRoutes)
app.use(jobRoutes)
app.use(updateRoutes)
app.use(profileRoute)
app.use(chatRoutes(io))

io.on('connection', function(socket) {
  console.log('socket connected: ' +socket.id);
});

server.listen(env.PORT, () => {
  print(env.PORT);
});
