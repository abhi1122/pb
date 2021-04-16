import multer, {
  diskStorage,
  MulterError
} from 'multer';
import * as path from 'path';
import {
  read
} from 'jimp';
import {
  fontUploadConfig,
  imageUploadConfig
} from '../../config/constants';
import {
  errorResponseHandler
} from '../utils/helper';

import {
  cloudUpload
} from './cloudinary';
var fs = require('fs');

const fileUploadConfig = (
  name = fontUploadConfig.name,
  allowFiles = fontUploadConfig.files,
  destination = fontUploadConfig.destination
) => {
  console.log(name, allowFiles, destination);
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, destination);
    },
    // filename: function (req, file, cb) {
    //   cb(null, Date.now() + path.extname(file.originalname));
    // },
    filename: function (req, file, callback) {
      callback(null, file.originalname + path.extname(file.originalname));
    },
  });

  var fileFilter = function (req, file, cb) {
    console.log(
      path.extname(file.originalname).toLowerCase,
      'path.extname(file.originalname).toLowerCase',
      file.mimetype
    );
    if (fontUploadConfig.extensions.indexOf(file.mimetype) === -1) {
      return cb(new Error('Invalid file type'));
    }
    // image/png
    //application/octet-stream
    // if (
    //   fontUploadConfig.extensions.indexOf(
    //     path.extname(file.originalname).toLowerCase
    //   ) === -1
    // ) {
    //   return cb(new Error('Invalid file type'));
    // }
    cb(null, true);
  };

  var upload = multer({
    fileFilter: fileFilter,
    storage: storage,
    limits: {
      fileSize: fontUploadConfig.fileSize,
      files: allowFiles
    },
  }).array(name, allowFiles);

  return upload;
};

export const fontUploader = (req, keyName, allowImage) => {
  console.log(keyName, allowImage);
  return new Promise(function (resolve, reject) {
    var upload = fileUploadConfig(keyName, allowImage);
    upload(req, {}, function (error) {
      console.log(error, 'upload font error........');
      if (error || error instanceof MulterError) {
        req.fileUploadError = {
          status: true,
          message: error.message,
        };
        resolve(error);
      } else {
        req.fileUploadError = false;
        resolve();
      }
    });
  });
};


const cloudImageUploadConfig = (
  name = imageUploadConfig.name,
  allowFiles = imageUploadConfig.files,
  destination = imageUploadConfig.destination
) => {
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, destination);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

  var fileFilter = function (req, file, cb) {
    if (fontUploadConfig.extensions.indexOf(file.mimetype) === -1) {
      return cb(new Error('Invalid file type'));
    }
    cb(null, true);
  };

  var upload = multer({
    fileFilter: fileFilter,
    storage: storage,
    limits: {
      fileSize: imageUploadConfig.fileSize,
      files: allowFiles
    },
  }).array(name, allowFiles);

  return upload;
};


export const cloudImageUploader = (req, keyName, allowImage, folder) => {
  return new Promise(function (resolve, reject) {
    var upload = cloudImageUploadConfig(keyName, allowImage);
    upload(req, {}, async function (error) {
      if (error || error instanceof MulterError) {
        req.fileUploadError = {
          status: true,
          message: error.message,
        };
        resolve(error);
      } else {
        const [localFile = {}] = req.files;
        const cloudRes = await cloudUpload(localFile.path, folder);
        console.log(cloudRes, '.......cloudRes');
        fs.unlinkSync(localFile.path);
        req.fileUploadError = false;
        req.fileUploadRes = cloudRes;
        resolve();
      }
    });
  });
};