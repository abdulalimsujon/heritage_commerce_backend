import { v2 as cloudinary } from 'cloudinary';

import fs from 'fs';
import multer from 'multer';

cloudinary.config({
  cloud_name: 'dcc5pnka9',
  api_key: '282725615287652',
  api_secret: 'X6n-s1vp40bddWfEvLduccm7egM',
});

export const sendImageToCloudinary = (imageName: string, path: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      { public_id: imageName },
      function (error, result) {
        if (error) {
          reject(error);
        }
        resolve(result);

        fs.unlink(path, (err) => {
          if (err) {
            console.error(err);
            return;
          }
          // console.log('File deleted successfully');
        });
      },
    );
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
