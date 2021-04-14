import { categoriesModel } from '../../models/Categories';
import { getQueryBody } from '../../utils/helper';

export class Categories {
  constructor() {}

  async getByQuery(req) {
    const { searchQuery, sort, skip, limit } = getQueryBody(req);
    return await categoriesModel.find(searchQuery, [], { sort, skip, limit });
  }

  async save(req) {
    const { email, phone } = req.body;
    const userData = await categoriesModel
      .findOne({ $or: [{ email }, { phone }] })
      .lean();
    if (userData && userData.email) {
      return { message: 'User already registered' };
    }

    const doc = new categoriesModel(req.body);
    return await doc.save(req.body);
  }
}
