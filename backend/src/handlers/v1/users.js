import { compare } from 'bcrypt';
import { usersModel } from '../../models/Users';
import { createToken } from '../../utils/token';
import { getQueryBody } from '../../utils/helper';

class Users {
  constructor() {}

  async getAll(req) {
    return await usersModel.find({});
  }

  async getByQuery(req) {
    const { searchQuery, sort, skip, limit } = getQueryBody(req);
    return await usersModel.find(searchQuery, [], { sort, skip, limit });
  }
  async login(req) {
    const { email, mobile, password } = req.body;
    const userData = await usersModel
      .findOne({ $or: [{ email }, { mobile }] })
      .lean();
    if (userData && userData.password) {
      const isValid = await compare(password, userData.password);
      if (isValid) {
        userData.token = createToken({ id: userData['_id'] });
        delete userData.password;
        return userData;
      }
      return { statusCode: 401, message: 'Invalid login details' };
    }
    return { statusCode: 401, message: 'Invalid login details' };
  }

  async save(req) {
    const { email, mobile } = req.body;
    const userData = await usersModel
      .find({ $or: [{ email: email }, { mobile: mobile }] })
      .lean();
    console.log(userData, '..userData', req.body);
    if (userData && userData.length) {
      return { message: 'User already registered' };
    }

    const doc = new usersModel(req.body);
    return await doc.save(req.body);
  }
}

const _Users = Users;
export { _Users as Users };
