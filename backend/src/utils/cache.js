// var redis = require("redis"),
//     client = redis.createClient();

// client.on("connect", function () {
//     console.log("Redis Connected...");
// });

// client.on("error", function (err) {
//     console.log("Error " + err);
// });

// var saveCache = (key, value) => {
//     console.log(key, "saveCache ...........")
//     //client.set("foo_rand000000000000", "OK");
//     client.set("foo_rand000000000000", "some fantastic value", function (err, reply) {
//         // This will either result in an error (flush parameter is set to true)
//         // or will silently fail and this callback will not be called at all (flush set to false)
//         console.log(err);
//         console.log("reply save",reply);
//         //client.quit();
//     });
//     //client.set(key, value, 'EX', 10000);
//     //return;
// }

// var getCache = (key) => {
//     return new Promise(function (resolve, reject) {
//         if (!key || key == "") {
//             resolve(null);
//         }
//         client.get(key, function (err, reply) {
//             console.log(key, reply, "..reply")
//             if (!reply || reply == "") {
//                 resolve(null);
//             } else {
//                 console.log(reply.toString());
//                 resolve(reply);
//             }
//             //client.quit();
//         });
//     });
// }



// module.exports = {
//     saveCache,
//     getCache
// };