import { Router } from 'express';
var router = Router();
import { Users } from '../handlers/v1/users';
import { createError, createResponse } from '../utils/helper';
import { imageUploader } from '../utils/upload';
import { __ } from '../utils/lang';
import { chkAuth } from '../middleware/jwt';
import multer from 'multer';
var upload = multer();
var modalObj = new Users();

/**
 * @swagger
 *
 * /users/save:
 *   post:
 *     tags:
 *     - "Users"
 *     summary: Save categories
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         in: formData
 *         required: true
 *         type: string
 *       - name: description
 *         in: formData
 *         required: true
 *         type: string
 *       - name: image
 *         in: formData
 *         required: true
 *         type: file
 *     responses:
 *       200:
 *         description: Successfully saved
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/catSaveResp'
 */
router.post('/save', upload.none(), async (req, res, next) => {
  try {
    const response = await modalObj.save(req);
    res.send(createResponse(response, req, res));
  } catch (error) {
    res.send(createError(error, res, res));
  }
});

/**
 * @swagger
 * /user/login:
 *   get:
 *     tags:
 *     - "Users"
 *     summary: User Login
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: users
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/catResp'
 */
router.post('/login', upload.none(), async (req, res, next) => {
  try {
    const response = await modalObj.login(req);
    res.send(createResponse(response, req, res));
  } catch (error) {
    res.send(createError(error, res, res));
  }
});

/**
 * @swagger
 * /user/getListByQuery:
 *   post:
 *     tags:
 *     - "Users"
 *     summary: get user data by query
 *     produces:
 *      - application/json
 *     parameters:
 *       - name: searchQuery
 *         in: formData
 *         required: false
 *         type: object
 *       - name: sort
 *         in: formData
 *         required: false
 *         type: object
 *       - name: skip
 *         in: formData
 *         required: false
 *         type: number
 *       - name: limit
 *         in: formData
 *         required: false
 *         type: number
 *     responses:
 *       200:
 *         description: Successfully saved
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/catSaveResp'
 */
router.post('/getListByQuery', upload.none(), async (req, res) => {
  try {
    const response = await modalObj.getByQuery(req);
    res.send(createResponse(response, req, res));
  } catch (error) {
    res.send(createError(error, res, res));
  }
});

export default router;

/**
 * @swagger
 *
 * definitions:
 *   catSaveResp:
 *     type: object
 *     properties:
 *       status:
 *         type: boolean
 *       message:
 *         type: string
 *   catResp:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *       description:
 *         type: string
 *       images:
 *         type: string
 *       createdAt:
 *         type: string
 *       UpdatedAt:
 *         type: string
 */
