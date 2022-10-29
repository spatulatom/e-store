import express from 'express';
import { isAdmin, isAuth, fileUpload } from '../utils.js';
import newUpload from '../controllers/upload-aws.js';


const uploadRouter = express.Router();
uploadRouter.post('/', isAuth, isAdmin, fileUpload.single('file'), newUpload
);

export default uploadRouter;
