import { Router } from 'express';
var router = Router();

/**
 * @swagger
 * /check:
 *   get:
 *     tags:
 *     - "APP"
 *     summary: Get info
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: users
 *         schema:
 *           type: array
 */
router.get('/info', function (req, res, next) {
  res.send({ status: true });
});


export default router;