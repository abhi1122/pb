import { templatesModel } from '../../models/Templates';
import { fontsModel } from '../../models/Fonts';
import { getQueryBody, getHeaderBody } from '../../utils/helper';
import { JsonWebTokenError } from 'jsonwebtoken';
import { cloudImageUploader, fontUploader } from '../../utils/upload';
import { imageUploadConfig } from '../../../config/constants/index';
import Jimp from 'jimp';

export class Templates {
  constructor() {}

  async getByQuery(req) {
    const { searchQuery, sort, skip, limit } = getQueryBody(req);
    return await templatesModel.find(searchQuery, [], { sort, skip, limit });
  }

  async save(req) {
    const headBody = getHeaderBody(req);
    const checkValid = new templatesModel(headBody);
    const error = checkValid.validateSync();
    if (error) throw error;

    await cloudImageUploader(
      req,
      imageUploadConfig.name,
      imageUploadConfig.files,
      imageUploadConfig.destination
    );

    if (!req.fileUploadError.status) {
      req.body.file = req.fileUploadRes;
      req.body.url = req.fileUploadRes.url;
      const doc = new templatesModel(req.body);
      return await doc.save(req.body);
    } else {
      let newErr = new Error(req.fileUploadError.message);
      newErr.error = {
        image: req.fileUploadError.message,
      };
      newErr.error_code = 'FILE_UPLOAD';
      throw newErr;
    }

    // const templatesData = req.body;
    // templatesData.logo = JSON.parse(req.body.logo);
    // templatesData.texts = JSON.parse(req.body.texts);
    // templatesData.url = req.body.url;
    // const doc = new templatesModel(templatesData);
    // return await doc.save(templatesData);
  }

  async update(req) {
    const { _id, texts } = req.body;
    //templatesData.logo = JSON.parse(req.body.logo);
    //templatesData.texts = JSON.parse(req.body.texts);
    //templatesData.url = req.body.url;
    //const doc = new templatesModel(templatesData);
    console.log(texts, '.....texts');
    return await templatesModel.updateMany({ _id }, { $set: { texts } });

    // return await doc.update(
    //   { _id: req.body._id },
    //   { $set: { texts: templatesData.texts } },
    //   {
    //     upsert: true,
    //   },
    //   (err, doc) => console.log(err)
    // );

    // var query = { username: req.user.username };
    // req.newData.username = req.user.username;

    // MyModel.findOneAndUpdate(query, req.newData, { upsert: true }, function (
    //   err,
    //   doc
    // ) {
    //   if (err) return res.send(500, { error: err });
    //   return res.send('Succesfully saved.');
    // });
  }

  async demoDownload(req) {
    const templateData = await templatesModel.findOne({ _id: req.params.id });
    //fontsModel.findOne({ _id: templateData.id })
    console.log(templateData, '...templatesData');
    const { texts, url } = templateData;
    await Jimp.read(url)
      .then((image) => {
        texts.map(async (text) => {
          const fontsData = await fontsModel.findOne({
            _id: text.font,
          });
          const selectedFont = fontsData.fonts.find(
            (font) => font.mimetype === 'application/octet-stream'
          );
          console.log(fontsData.name, '.....fontsData');
          const loadFont = await Jimp.loadFont(selectedFont.path);
          image
            .print(loadFont, Number(text.x), Number(text.y), text.text)
            .write(`public/img-load/demo-template.jpeg`);
        });
        resolve({ url: `public/img-load/demo-template.jpeg` });
        // return new Promise((resolve) =>
        //   resolve({ url: `public/img-load/demo-template.jpeg` })
        // );

        // Jimp.loadFont('public/Montserrat-Regular.ttf.fnt')
        //   .then((font) => {
        //     fontsModel.findOne({ _id: templateData.font })
        //     texts.map((text) => {
        //       console.log(text, '....text');
        //       image
        //         .print(font, Number(text.x), Number(text.y), text.text)
        //         .write(`public/img-load/${req.params.id}.jpeg`);
        //     });
        //     //.catch((err) => console.log(err));
        //   })
        //   .catch((err) => console.log(err));

        // return new Promise({ url: `public/img-load/${req.params.id}.jpeg` });
      })
      .catch((err) => {
        console.error(err);
      });

    return new Promise((resolve) =>
      resolve({
        url: `${req.protocol}://${req.get('host')}/img-load/demo-template.jpeg`,
      })
    );
  }
}
