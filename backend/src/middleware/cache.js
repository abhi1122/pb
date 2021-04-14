// var { getCache } = require("../utils/cache");
// var cacheObj = { "/user/profile": { key: "user" } };
// var cacheHandler = function (req, res, next) {
//     //req.originalUrl
//     if (cacheObj[req.originalUrl] && cacheObj[req.originalUrl] !== "") {
//         let key = cacheObj[req.originalUrl]["key"];
//         if (key && key !== "") {
//             console.log(key + req.user["_id"], ".................req.user", req.user)
//             getCache(key).then((data) => {
//                 if (data) {
//                     console.log("...data", data)
//                     res.send(data);
//                 } else {
//                     next()
//                 }

//             });
//         } else {
//             next()
//         }

//     } else {
//         next()
//     }

// }
// module.exports = {
//     cacheHandler
// };
