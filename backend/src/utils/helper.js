import { __ } from './lang';
import { logger } from './logger';
import mongoose from 'mongoose';

export const responseHandler = (resp) => {
  let validKey = { status: false, data: [], message: '' };
  let respCopy = { ...resp };
  for (var key in validKey) {
    if (!respCopy.hasOwnProperty(key)) {
      resp[key] = validKey[key];
    }
  }
  return resp;
};

export const createResponse = (data, req = {}, res = {}) => {
  logger.info(`createResponse called ${JSON.stringify(data)}`);

  let message = data.message ? data.message : __('Successfully');
  let requestId;
  if (req.body.requestId) {
    requestId = req.body.requestId;
  } else if (req.params.requestId) {
    requestId = req.params.requestId;
  } else if (req.query.requestId) {
    requestId = req.query.requestId;
  }
  res.status(data.statusCode ? data.statusCode : 200);
  ['statusCode', 'message'].forEach((e) => delete data[e]);
  data = Array.isArray(data) ? data : [data];
  return errorResponseHandler({
    status: true,
    data,
    message: message,
    requestTime: `${new Date() - req.requestTime}ms`,
    requestId: requestId,
  });
};

export const errorResponseHandler = (resp, msgKey) => {
  let validKey = { status: false, data: [], message: '', errors: [] };
  let respCopy = { ...resp };
  for (var key in validKey) {
    if (!respCopy.hasOwnProperty(key)) {
      resp[key] = validKey[key];
    }
  }
  return resp;
};

export const createError = (error, req = {}, res = {}) => {
  logger.error(`createError called ${JSON.stringify(error)}`);
  const parseError = JSON.parse(JSON.stringify(error));
  console.log(parseError, '.....parseError');
  let message = error.message ? error.message : __('Something went wrong');
  if (
    error instanceof mongoose.Error.ValidationError ||
    parseError.name === 'MongoError'
  ) {
    console.log('enter mongo errro.....');
    error = parseMongoError(error, req);
    res.status(400);
  } else if (error.error_code && error.error_code === 'FILE_UPLOAD') {
    error = error.error;
    res.status(400);
  } else {
    res.status(500);
  }

  let requestId;
  if (req.body && req.body.requestId) {
    requestId = req.body.requestId;
  } else if (req.params && req.params.requestId) {
    requestId = req.params.requestId;
  } else if (req.query && req.query.requestId) {
    requestId = req.query.requestId;
  }

  return errorResponseHandler({
    status: false,
    error,
    message: message,
    requestTime: `${new Date() - req.requestTime}ms`,
    requestId: requestId,
  });
};

export const parseMongoError = (
  errorObj,
  req,
  message = 'Validation Failed'
) => {
  let errorParseObj = {};
  for (const errorKey in errorObj.errors) {
    errorParseObj[errorKey] = __(errorObj.errors[errorKey].message);
  }
  if (errorObj.code === 11000) {
    const [key = '__'] = Object.keys(errorObj.keyValue);
    errorParseObj[key] = `${key} already exist!`;
  }
  return errorParseObj;
};

export const getQueryBody = (req) => {
  let { searchQuery = {}, sort = {}, skip = 0, limit = 1000 } = req.body;
  searchQuery = Object.keys(searchQuery).length ? searchQuery : {};
  sort = Object.keys(sort).length ? sort : {};
  skip = parseInt(skip);
  limit = parseInt(limit);

  return { searchQuery, sort, skip, limit };
};

export const getHeaderBody = (req) => {
  console.log('req.headers.filterbody...', req.headers.filterbody);
  if (!req.headers.filterbody) {
    return {};
  }

  if (typeof req.headers.filterbody === 'string') {
    return JSON.parse(req.headers.filterbody);
  }
  return req.headers.filterbody;
};
