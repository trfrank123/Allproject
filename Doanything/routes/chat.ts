import { Router, Request, Response} from "express";
import { client } from "../db";
import { getSessionUser } from "../session";
import socketIO from 'socket.io'

export function chatRoutes(io: socketIO.Server) {
    let chatRoutes = Router()

    // get the chatroom record
    chatRoutes.get('/chat/:request_id', async(req:Request, res:Response)=>{
        try {
            let user = getSessionUser(req, res);
    
            if(!user) {
                res.status(400);
                res.end('This API not available to register');
                res.redirect('/login')
                return
            }

            let { request_id } = req.params            

            let result = await client.query(/*sql*/`
                select
                    messenger.chat_message,
                    messenger.receiver_id,
                    messenger.sender_id,
                    U1.nickname as receiver_name,
                    U2.nickname as sender_name
                from messenger
                inner join users as U1 on messenger.receiver_id = U1.id
                inner join users as U2 on messenger.sender_id = U2.id
                where messenger.request_id = ${request_id};
            `)

            res.status(202)
            res.json(result.rows)
        }catch(err) {
            res.status(500)
            res.end(String(err))
        }
    })

    // send message to chatroom
    chatRoutes.post('/chat', async(req:Request, res:Response)=>{
        try {
            let user = getSessionUser(req, res);
    
            if(!user) {
                res.status(400);
                res.end('This API not available to register');
                res.redirect('/login')
                return
            }

            let { chat_message, sender_id, receiver_id, request_id } = req.body

            if(!chat_message) {
                res.status(400)
                res.end('Missing chat message!')
                return
            }

            if(!sender_id) {
                res.status(400)
                res.end('Missing sender id!')
                return
            }

            if(!receiver_id) {
                res.status(400)
                res.end('Missing receiver id!')
                return
            }

            await client.query(/*sql*/ `
                insert into messenger (chat_message, sender_id, receiver_id, request_id, is_read)
                values ('${chat_message}', '${sender_id}', '${receiver_id}', '${request_id}', false);
            `)

            let result = await client.query(/*sql*/`
            select
                messenger.chat_message,
                messenger.receiver_id,
                messenger.sender_id,
                U1.nickname as receiver_name,
                U2.nickname as sender_name
                from messenger
                inner join users as U1 on messenger.receiver_id = U1.id
                inner join users as U2 on messenger.sender_id = U2.id
                where messenger.request_id = ${request_id}
                order by messenger.id desc;
            `)
            let msg = result.rows[0]
            res.status(202)
            res.end('send message successfully!')
            io.emit('new-message', msg)
        }catch(err) {
            res.status(500)
            res.end(String(err))
        }
    })

    return chatRoutes
}