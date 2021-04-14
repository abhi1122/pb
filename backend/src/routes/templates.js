import { Router } from 'express';
var router = Router();
import { Templates } from '../handlers/v1/templates';
import { createError, createResponse } from '../utils/helper';
import { __ } from '../utils/lang';
import multer from 'multer';
var upload = multer();
var modalObj = new Templates();

/**
 * @swagger
 *
 * /templates/save:
 *   post:
 *     tags:
 *     - "Templates"
 *     summary: Save categories
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         in: formData
 *       - name: description
 *         in: formData
 *         required: false
 *         type: string
 *       - name: category_id
 *         in: formData
 *         required: true
 *         type: string
 *       - name: url
 *         in: formData
 *         required: true
 *         type: string
 *       - name: texts
 *         in: formData
 *         required: true
 *         type: string
 *       - name: logo
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
  try {
    const response = await modalObj.save(req);
    res.send(createResponse(response, req, res));
  } catch (error) {
    res.send(createError(error, res, res));
  }
});

router.post('/update', upload.none(), async (req, res, next) => {
  try {
    const response = await modalObj.update(req);
    res.send(createResponse(response, req, res));
  } catch (error) {
    res.send(createError(error, res, res));
  }
});

router.get('/demo-download/:id', upload.none(), async (req, res, next) => {
  try {
    const response = await modalObj.demoDownload(req);
    res.send(createResponse(response, req, res));
  } catch (error) {
    res.send(createError(error, res, res));
  }
});

/**
 * @swagger
 * /templates/list:
 *   post:
 *     tags:
 *     - "Templates"
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
