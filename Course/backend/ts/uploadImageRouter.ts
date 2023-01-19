import { Router } from 'express'
import { UploadImageController } from './uploadImageController'
import { UploadImageService } from "./uploadImageService"
import { knex } from './db'

import multer from 'multer';

export let UploadImageRouter = Router();

const storage = multer.diskStorage({
    destination(req, file, callback) {
      callback(null, __dirname + "/images");
    },
    filename(req, file, callback) {
      callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
    },
  });
  
  const upload = multer({ storage });

let uploadImageService = new UploadImageService(knex);
let uploadImageController = new UploadImageController(uploadImageService);

UploadImageRouter.use("/upload", upload.array('photo', 3), uploadImageController.router )