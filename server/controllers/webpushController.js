// const { config } = require("dotenv");
// const jwt_decoded = require("jwt-decode");
// const ClientNotiModel = require("../models/clientNoti");
// const webpush = require("web-push");
// const asyncRedis = require("async-redis");
// const client = asyncRedis.createClient();

// client.on("error", function (err) {
//   console.log("Error " + err);
// });

// const webpushController = {
//   config: () => {
//     const publicVapidKey = process.env.WEB_PUSH_PUBLIC_KEY;
//     const privateVapidKey = process.env.WEB_PUSH_PRIVATE_KEY;
//     webpush.setVapidDetails(
//       "mailto:thamtc.ifc@gmail.com",
//       publicVapidKey,
//       privateVapidKey
//     );
//   },

//   subcrible: async (req, res) => {
//     try {
//       const token = req.cookies.refreshToken;
//       const subscription = req.body;
//       if (!token) {
//         return res.status(403).json("Token is not valid");
//       }
//       const decoded = jwt_decoded(token);
//       // kiem tra DB client da subcrible hay chua?
//       const client = await ClientNotiModel.find(decoded.clientId).exec();
//       if (client.length > 0) {
//         return res.status(201).json("Subscribled");
//       }
//       const clientSub = {
//         clientId: decoded._id,
//         endpoint: subscription,
//       };await ClientNotiModel.create(clientSub);
//       return res.status(200).json("Subscrible success");
//     } catch (error) {
//       return res.status(400).json(error);
//     }
//   },
//   pushNotification: async (message) => {
//     try {
//       // lay tat ca client da subscrible trong DB
//       const clients = await ClientNotiModel.find().exec();
//       if (!clients) {
//         return "do not find client in DB";
//       }
      
//       clients.forEach((client) => {
//           const payload = JSON.stringify({title: "Warning!!!", body: message});
//         webpush
//           .sendNotification(client.endpoint, payload)
//           .then((data) => data)
//           .catch((error) => error);
//       });
//     } catch (error) {
//       return error.message;
//     }
//   },
// };

// module.exports = webpushController;
