import mongoose from 'mongoose';
import { imageUploader, fontUploader } from '../../utils/upload';
import { fontsModel } from '../../models/Fonts';
// import default from "../../utils/helper/";
// const { parseMongoError } = default;
import { fontUploadConfig } from '../../../config/constants/index';
import { getQueryBody } from '../../utils/helper';
var fs = require('fs');

class Fonts {
  constructor() {}

  async getByQuery(req) {
    const { searchQuery, sort, skip, limit } = getQueryBody(req);
    return await fontsModel.find(searchQuery, [], { sort, skip, limit });
  }

  async save(req, res) {
    // try {
    await fontUploader(
      req,
      fontUploadConfig.name,
      fontUploadConfig.files,
      fontUploadConfig.destination,
      res
    );

    console.log(req.fileUploadError, '....uploadFile req.fileUploadError');
    if (!req.fileUploadError.status) {
      // const fileMove = await fs.move(
      //   'uploads/fonts' + req.files.originalname,
      //   `uploads/fonts/${Date.now()}` + req.files.originalname
      // );
      const files = [...req.files];
      const folderName = Date.now();
      fs.mkdirSync(`uploads/fonts/${folderName}/`);
      req.body.fonts = files.map((file) => {
        const newFolder = `uploads/fonts/${folderName}/` + file.originalname;
        fs.rename(file.path, newFolder, (err) => console.log(err));
        return { ...file, path: newFolder };
      });
      console.log(req.body.fonts, '....req.body.fonts');
      //req.body.fonts = req.files;
      const doc = new fontsModel(req.body);
      return await doc.save(req.body);
    } else {
      let newErr = new Error(req.fileUploadError.message);
      newErr.error = { fonts: req.fileUploadError.message };
      newErr.error_code = 'FILE_UPLOAD';
      throw newErr;

      //throw Error({ fonts: req.fileUploadError.message });

      //return { statusCode: 400, message: req.fileUploadError.message };
    }
    // } catch (err) {
    //   console.log('eroooo........');
    //   return err;
    // }
  }

  //   async getAll(req) {
  //     return await fontsModel.find({});
  //   }

  //   async getById(id) {
  //     //try{
  //     const data = await fontsModel.findById(id);
  //     return data;
  //     // }catch(error){
  //     //     appLogger.error(error);
  //     //     throw new(error);
  //     // }
  //   }
}

const _Fonts = Fonts;
export { _Fonts as Fonts };
