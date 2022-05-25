require("dotenv").config();
const { connectDB, sequelize } = require("./config/mssqlConnect");
const db = require("./models/index.js");

connectDB()
  .then(async (data) => {
    if (data?.success) {
      console.log(
        await db.GS_RolePermission.destroy(
          {
            where: {id : [1,2,3]}
          },
          
        )
      );
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
