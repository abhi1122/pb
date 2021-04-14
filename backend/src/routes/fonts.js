import { Router } from 'express';
const router = Router();
import { Fonts } from '../handlers/v1/fonts';
import { createError, createResponse } from '../utils/helper';
const modalObj = new Fonts();

/**
 * @swagger
 *
 * /fonts/save:
 *   post:
 *     tags:
 *     - "Fonts"
 *     summary: Save Fonts
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         in: formData
 *         required: true
 *         type: string
 *       - name: description
 *         in: formData
 *         required: false
 *       - name: fonts
 *         in: formData
 *         required: true
 *         type: array
 *         items:
 *           type: file
 *         collectionFormat: multi
 *     responses:
 *       200:
 *         description: Successfully saved
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/saveResp'
 */
router.post('/save', async (req, res, next) => {
  try {
    const response = await modalObj.save(req, res);
    res.send(createResponse(response, req, res));
  } catch (error) {
    console.log(error, '.....error');
    res.send(createError(error, res, res));
  }
});

/**
 * @swagger
 * /fonts/list:
 *   get:
 *     tags:
 *     - "Fonts"
 *     summary: Get fonts
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: list
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/getResp'
 */
router.post('/list', async (req, res, next) => {
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
 *   saveResp:
 *     type: object
 *     properties:
 *       status:
 *         type: boolean
 *       message:
 *         type: string
 *   getResp:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *       description:
 *         type: string
 *       images:
 *         type: array
 *       createdAt:
 *         type: string
 *       UpdatedAt:
 *         type: string
 */
