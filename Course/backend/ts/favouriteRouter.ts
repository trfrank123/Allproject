import { Router } from 'express'
import { FavouriteController } from './favouriteController'
import { FavouriteService } from './favouriteService'
import { knex } from './db'

export let FavouriteRouter = Router();

let favouriteService = new FavouriteService(knex);
let favouriteController = new FavouriteController(favouriteService);



// FavouriteRouter.use((req, res, next) => {
//     console.log("success to enter FavouriteRouter")
//     next();
// })

FavouriteRouter.post("/addFavouriteCourse", favouriteController.addFavourite);
FavouriteRouter.post("/dropFavouriteCourse", favouriteController.dropFavourite);
FavouriteRouter.post("/getFavouriteCourse", favouriteController.getAll);
