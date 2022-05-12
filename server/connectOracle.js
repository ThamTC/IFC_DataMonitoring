// require("dotenv").config()
// const {connectDB, sequelize} = require("./config/mssqlConnect")
// const db = require("./models/index.js")

// connectDB().then(async(data) => {
//     if (data?.success) {
//         console.log(await db.GS_RolePermission.bulkCreate(
//             [{
//                 "name": "admin",
//                 "permission": JSON.stringify([
//                   "view-realtime",
//                   "view-statistic"
//                 ])
//               },{
//                 "name": "user",
//                 "permission": JSON.stringify([])
//               },{
//                 "name": "manager",
//                 "permission": JSON.stringify([
//                   "view-realtime",
//                   "view-statistic",
//                   "view-managerUser",
//                   "view-managerRole"
//                 ])
//               }]
//         ))
//     }else{
//         console.log(data.error)
//     }
// })
// .then(async(pool) => {
    
//       console.log("result: ", pool);
// })
// .catch(error => {
//     console.log(error)
// })

const asyncRedis = require("async-redis");
const client = asyncRedis.createClient();

client.on("error", function (err) {
  console.log("Error " + err);
});

client.get("realtime")
.then(data => {
  const resData = JSON.parse(data)
  const dataSorted = resData.sort((ele1, ele2) => ele1.time - ele2.time)
  return dataSorted

})
.then(data => {
  console.log((data.filter(ele => ele.priority == 5)).length)
  client.set("realtime", JSON.stringify(data))
})
.catch(error => console.log(error))