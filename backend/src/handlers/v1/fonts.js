import mongoose from 'mongoose';
import { imageUploader, fontUploader } from '../../utils/upload';
import { fontsModel } from '../../models/Fonts';
// import default from "../../utils/helper/";
// const { parseMongoError } = default;
import { fontUploadConfig } from '../../../config/constants/index';
import { getQueryBody, getHeaderBody } from '../../utils/helper';
var fs = require('fs');

class Fonts {
  constructor() {}

  async getByQuery(req) {
    const { searchQuery, sort, skip, limit } = getQueryBody(req);
    return await fontsModel.find(searchQuery, [], { sort, skip, limit });
  }

  async save(req, res) {
    const headBody = getHeaderBody(req);
    const checkValid = new fontsModel(headBody);
    const error = checkValid.validateSync();
    if (error) throw error;

    await fontUploader(req, fontUploadConfig.name, fontUploadConfig.files);
    if (!req.fileUploadError.status) {
      const files = [...req.files];
      const folderName = Date.now();
      fs.mkdirSync(`uploads/fonts/${folderName}/`);
      req.body.fonts = files.map((file) => {
        const newFolder = `uploads/fonts/${folderName}/` + file.originalname;
        fs.rename(file.path, newFolder, (err) => console.log(err));
        return { ...file, path: newFolder };
      });
      const doc = new fontsModel(req.body);
      return await doc.save(req.body);
    } else {
      let newErr = new Error(req.fileUploadError.message);
      newErr.error = { fonts: req.fileUploadError.message };
      newErr.error_code = 'FILE_UPLOAD';
      throw newErr;
    }
  }

  async edit(req, res) {
    const headBody = getHeaderBody(req);
    const checkValid = new fontsModel(headBody);
    const error = checkValid.validateSync();
    if (error) throw error;

    await fontUploader(
      req,
      fontUploadConfig.name,
      fontUploadConfig.files,
      true
    );

    if (!req.fileUploadError.status) {
      const files = [...req.files];
      const folderName = Date.now();
      fs.mkdirSync(`uploads/fonts/${folderName}/`);
      req.body.fonts = files.map((file) => {
        const newFolder = `uploads/fonts/${folderName}/` + file.originalname;
        fs.rename(file.path, newFolder, (err) => console.log(err));
        return { ...file, path: newFolder };
      });

      const { id } = req.body;
      delete req.body.id;
      //const doc = new fontsModel(req.body);
      return await fontsModel.updateMany(
        { _id: id },
        { $set: { ...req.body } }
      );
    } else {
      let newErr = new Error(req.fileUploadError.message);
      newErr.error = { fonts: req.fileUploadError.message };
      newErr.error_code = 'FILE_UPLOAD';
      throw newErr;
    }
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
