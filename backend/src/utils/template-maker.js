import Jimp from 'jimp';

// {
//     "isDeleted": false,
//     "_id": "60740d0e90939a69a826d284",
//     "url": "http://localhost:3007/images/test3.jpeg",
//     "category_id": "1122",
//     "logo": [
//         {
//             "_id": "60740d0e90939a69a826d285",
//             "x": 100,
//             "y": 200
//         }
//     ],
//     "texts": [
//         {
//             "_id": "60740d0e90939a69a826d286",
//             "x": 100,
//             "y": 200,
//             "label": "ok",
//             "font": "11"
//         }
//     ],
//     "name": "test1",
//     "createdAt": "2021-04-12T09:04:14.301Z",
//     "updatedAt": "2021-04-12T09:04:14.301Z",
//     "__v": 0
// }

const createImage = (templateData) => {
  const { texts = [] } = templateData;
  Jimp.read(templateData.url)
    .then((image) => {
      //image.composite( src, x, y );     // composites another Jimp image over this image at x, y
      // .color([{ apply: 'xor', params: ['#ff0000'] }])

      Jimp.loadFont(Jimp.FONT_SANS_14_BLACK).then((font) => {
        texts.map((texts) => {
          image
            .print(font, Number(req.query.x), Number(req.query.y), '7737774335')
            .write('public/img-load/new.jpeg');
        });
        // image
        //   .print(font, Number(req.query.x), Number(req.query.y), '7737774335')
        //   .write('public/img-load/new.jpeg');
        // image
        //   .print(font, 800, 1000, 'Hello world!')
        //   .write('public/img-load/new.jpeg');
        // res.send({ image: 'img-load/new.jpeg' });
      });
    })
    .catch((err) => {
      console.error(err);
      // Handle an exception.
    });
};
