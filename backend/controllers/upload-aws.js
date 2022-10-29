import AWS from 'aws-sdk';
import fs from 'fs';
import crypto from 'crypto';

const newUpload = (req, res, next) => {
  const s3 = new AWS.S3({
    secretAccessKey: process.env.AWS_SECRET_KEY,
    accessKeyId: process.env.AWS_KEY_ID,
  });
  console.log('ERROR');
  fs.readFile(req.file.path, (err, fileBody) => {
    console.log('here');
    if (err) {
      console.log('Error2', err);
      console.log(err);
      res.sendStatus(500);
      // return;

      return next(err);
    } else {
      let params = {
        ACL: 'public-read-write',
        Bucket: 'eventsbook22',
        Body: fileBody,
        ContentType: req.file.mimetype,
        Key: crypto.randomUUID(),
      };
      console.log('here');
      s3.upload(params, async (err, result) => {
        if (err) {
          console.log('Error3', err);
          console.log(err);
          res.sendStatus(500);
          return next();
        } else {
          console.log('S3 Response', result.Location);

          res.status(201).json({ secure_url: result.Location });

          //  res.json({ url: result.Location });
          return next();
        }
      });
    }
  });
  fs.unlink(req.file.path, (err) => {
    //  its not crucial so we wont stop the execution if insuccessfull
    console.log(err);
    return;
    //   const error = new HttpError(
    //     'Could not unlink the file.',
    //     500
    //   );
    //   return next(error);
  });
};
export default newUpload;
