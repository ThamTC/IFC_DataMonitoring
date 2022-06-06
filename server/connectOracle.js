require("dotenv").config();
const { connectDB, sequelize } = require("./config/mssqlConnect");
const db = require("./models/index.js");
const payload = [{ name: 'realtime', value: 0}, {name: 'statistic', value: 0}, {name: 'solar_realtime', value: 0}, {name: 'solar_statistic', value: 0}, {name: 'managerUser', value: 0}, {name: 'managerPermission', value: 0 }]
connectDB()
  .then(async (data) => {
    if (data?.success) {
      const result =
        await db.Permissions.create(
          {
            // userId: 6,
            // permission: JSON.stringify(payload)
            name: "abc"
          }, 
        )
        // await db.Permissions.destroy(
        //   {
        //     where: {id : 12}
        //   },
        // )
      console.log(result.dataValues)
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
