require("dotenv").config();
const { connectDB, sequelize } = require("./config/mssqlConnect");
const db = require("./models/index.js");
const payload = [{ name: 'realtime', value: 0}, {name: 'statistic', value: 0}, {name: 'solar_realtime', value: 0}, {name: 'solar_statistic', value: 0}, {name: 'managerUser', value: 0}, {name: 'managerPermission', value: 0 }]
connectDB()
  .then(async (data) => {
    if (data?.success) {
      const payload = [
        {name: 1, value: 2},
        {name: 2, value: 2},
        {name: 3, value: 2},
        {name: 4, value: 2},
        {name: 6, value: 2},
        {name: 7, value: 2},
        {name: 23, value: 2},
        {name: 26, value: 2},
      ]
      const result = 
      await db.GS_Issues.findAll({raw: true})
        // await db.GS_RolePermission.update({permission: JSON.stringify(payload)},{where: {userId: 16}})
        // await db.Permissions.create(
        //   {
        //     // userId: 6,
        //     // permission: JSON.stringify(payload)
        //     name: "abc"
        //   }, 
        // )
        // await db.Permissions.destroy(
        //   {
        //     where: {id : 12}
        //   },
        // )
      console.log(result)
    } else {
      console.log(data.error);
    }
  })
  .then(async (pool) => {
    console.log("result: ", pool);
  })
  .catch((error) => {
    console.log(error);
  });

// const redis = require('redis');
// const client = redis.createClient()
// client.connect()

// client.get("sol_realtime").then(data => {
//     if (data == null) {
//         data = "[]"
//     }
//         console.log(JSON.parse(data))

// })
