import { Router } from 'express';
var router = Router();
import { Categories } from '../handlers/v1/categories';
import { createError, createResponse } from '../utils/helper';
import { __ } from '../utils/lang';
import multer from 'multer';
var upload = multer();
var modalObj = new Categories();

/**
 * @swagger
 *
 * /categories/save:
 *   post:
 *     tags:
 *     - "Categories"
 *     summary: Save categories
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         in: formData
 *       - name: description
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully saved
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/catSaveResp'
 */
router.post('/save', upload.none(), async (req, res, next) => {
  //try {
  const response = await modalObj.save(req);
  res.send(createResponse(response, req, res));
  // } catch (error) {
  //   res.send(createError(error, res, res));
  // }
});

/**
 * @swagger
 * /categories/list:
 *   post:
 *     tags:
 *     - "Categories"
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
router.post('/list', upload.none(), async (req, res) => {
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
