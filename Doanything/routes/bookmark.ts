import { Router } from "express";
import { client } from '../db';
import { getSessionUser } from "../session";

export const bookmarkRoutes = Router();

// show all bookmarked post
bookmarkRoutes.get('/:userId', async(req, res)=> {
    let user = getSessionUser(req, res);
    
    if(!user) {
        res.status(400);
        res.end('This API not available to register');
        res.redirect('/login')
        return
    }

    const bookmarks = await client.query(`select request.id, bookmark.user_id, bookmark.request_id, request.title, category.type as category_name, request.start_time, request.deadline, skill.type as skill_name, location.area as location_area, request.location, request.detail, request.reward, users.nickname as employer_name from request inner join category on category.id = request.category_id inner join skill on skill.id = request.skill_id inner join location on location.id = request.location_area_id inner join users on users.id = request.post_user_id inner join bookmark on request_id = request.id where bookmark.user_id = ${user.id};`)

    if(!bookmarks.rows[0]) {
        res.json([])
        return
    }

    res.status(202)
    res.json(bookmarks.rows)
})

// user add post to bookmark
bookmarkRoutes.post('/', async(req, res)=> {
    try {
        let user = getSessionUser(req, res);

        if(!user) {
            res.status(400);
            res.end('This API not available to register');
            res.redirect('/login')
            return
        }

        let { requestId } = req.body

        if (!user?.id) {
            res.status(400);
            res.end("Missing user id!");
            return;
        }

        if(!requestId) {
            res.status(400)
            res.end('Missing request id!')
            return
        }
        
        let bookmark = await client.query(`select * from bookmark where user_id = ${user.id} and request_id = ${requestId};`)
        if(bookmark.rows[0]) {
            res.status(400);
            res.end('Already add to bookmark!')
            return
        } else {
            await client.query(`insert into "bookmark" (user_id, request_id) values (${user.id}, ${requestId});`)
            res.status(202)
            res.end('add job to bookmark successfully!')
        }        
    } catch(err) {
        res.status(500)
        res.end(String(err))
    }
})

// user remove post from bookmark 
bookmarkRoutes.delete('/', async(req, res)=> {
    try {
        let { userId, requestId } = req.body

        if(!userId) {
            res.status(400);
            res.end('This API not available to register');
            res.redirect('/login')
            return
        }

        if(!userId) {
            res.status(400)
            res.end('Missing User id!')
            return
        }
        if(!requestId) {
            res.status(400)
            res.end('Missing User id!')
            return
        }

        let bookmark = await client.query(`select * from bookmark where user_id = ${userId} and request_id = ${requestId};`)
        
        if(bookmark.rows[0]) {
            await client.query(`delete from bookmark where request_id = ${requestId} and user_id = ${userId};`)
            res.status(202)
            res.end('delete bookmark successfully!')
        } else {
            res.status(404)
            res.end('delete bookmark failed!')
            return
        }
    }catch(err) {
        res.status(500)
        res.end(String(err))
    }
})

