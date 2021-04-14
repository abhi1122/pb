import { combineReducers } from 'redux';
import auth from './auth';
import navigation from './navigation';
import alerts from './alerts';
import register from './register';
import fonts from './fonts';
import categories from './category';
import template from './template';

export default combineReducers({
  alerts,
  auth,
  navigation,
  register,
  fonts,
  categories,
  template,
});
