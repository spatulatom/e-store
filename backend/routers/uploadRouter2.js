import express from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import config from '../config';

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename(req, file, cb) {
//     cb(null, `${Date.now()}.jpg`);
//   },
// });
// const upload = multer({ storage });
const uploadRouter = express.Router();
// router.post('/', upload.single('file'), (req, res) => {
//   res.send(`/${req.file.path}`);
// });

// aws.config.update({
//   accessKeyId: process.env.AWS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_KEY ,
// });
const s3 = new aws.S3({
    secretAccessKey: process.env.AWS_SECRET_KEY,
    accessKeyId: process.env.AWS_KEY_ID,
});
const storageS3 = multerS3({
  s3,
  bucket: 'eventsbook22',
  acl: 'public-read',
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key(req, file, cb) {
    cb(null, file.originalname);
  },
});
const uploadS3 = multer({ storage: storageS3 });
uploadRouter.post('/s3', uploadS3.single('file'), (req, res) => {
  res.send(req.file.location);
});
export default uploadRouter;