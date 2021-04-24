import { combineReducers } from 'redux';
import core from './core';
import category from './category';
import template from './template';

export default combineReducers({
  core,
  category,
  template,
});
