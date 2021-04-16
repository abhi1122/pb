import { categoriesModel } from '../../models/Categories';
import { getQueryBody } from '../../utils/helper';
import { cloudImageUploader, fontUploader } from '../../utils/upload';
import { imageUploadConfig } from '../../../config/constants/index';
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
    // const { email, phone } = req.body;
    // const userData = await categoriesModel
    //   .findOne({
    //     $or: [
    //       {
    //         email,
    //       },
    //       {
    //         phone,
    //       },
    //     ],
    //   })
    //   .lean();
    // if (userData && userData.email) {
    //   return {
    //     message: 'User already registered',
    //   };
    // }

    const doc = new categoriesModel(req.body);
    return await doc.save(req.body);

    // await cloudImageUploader(
    //   req,
    //   imageUploadConfig.name,
    //   imageUploadConfig.files,
    //   imageUploadConfig.destination
    // );

    // if (!req.fileUploadError.status) {
    //   req.body.file = req.fileUploadRes;
    //   req.body.url = req.fileUploadRes.url;
    //   const doc = new categoriesModel(req.body);
    //   return await doc.save(req.body);
    // } else {
    //   let newErr = new Error(req.fileUploadError.message);
    //   newErr.error = {
    //     fonts: req.fileUploadError.message,
    //   };
    //   newErr.error_code = 'FILE_UPLOAD';
    //   throw newErr;
    // }
  }
}
