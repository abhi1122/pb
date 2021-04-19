import { categoriesModel } from '../../models/Categories';
import { getQueryBody, getHeaderBody } from '../../utils/helper';
import { cloudImageUploader, fontUploader } from '../../utils/upload';
import { imageUploadConfig } from '../../../config/constants/index';
import formidable, { IncomingForm } from 'formidable';

export class Categories {
  constructor() {}

  async getByQuery(req) {
    console.log(req.body, '.........body');
    const { searchQuery, sort, skip, limit } = getQueryBody(req);
    console.log(searchQuery, '.searchQuerysearchQuerysearchQuerysearchQuery');
    const categories = await categoriesModel.find(searchQuery, [], {
      sort,
      skip,
      limit,
    });
    const response = {};

    response.list = categories;
    response.relations = searchQuery.parentId
      ? await this.getAllChild(searchQuery.parentId)
      : [];
    response.self = {};
    return response;
  }

  async getAllChild(pId) {
    const allCategories = await categoriesModel.find({});
    const op = this.findParent(allCategories, pId, []);
    console.log(op, '........op');
    return op.reverse();
  }

  findParent(allCategories, pId, arr) {
    const parent = allCategories.find((list) => {
      return String(list._id) === String(pId);
    });

    if (!parent) {
      return arr;
    } else {
      arr.push(parent);
      return this.findParent(allCategories, parent.parentId, arr);
    }
  }

  async save(req) {
    const headBody = getHeaderBody(req);
    const checkValid = new categoriesModel(headBody);
    const error = checkValid.validateSync();
    if (error) throw error;

    await cloudImageUploader(
      req,
      imageUploadConfig.name,
      imageUploadConfig.files,
      imageUploadConfig.destination
    );

    if (!req.fileUploadError.status) {
      req.body.file = req.fileUploadRes;
      req.body.url = req.fileUploadRes.url;
      const doc = new categoriesModel(req.body);
      return await doc.save(req.body);
    } else {
      let newErr = new Error(req.fileUploadError.message);
      newErr.error = {
        image: req.fileUploadError.message,
      };
      newErr.error_code = 'FILE_UPLOAD';
      throw newErr;
    }
  }
}
