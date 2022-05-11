require("dotenv").config()
const {connectDB, sequelize} = require("./config/mssqlConnect")
const db = require("./models/index.js")

connectDB().then(async(data) => {
    if (data?.success) {
        console.log(await db.GS_RolePermission.bulkCreate(
            [{
                "name": "admin",
                "permission": JSON.stringify([
                  "view-realtime",
                  "view-statistic"
                ])
              },{
                "name": "user",
                "permission": JSON.stringify([])
              },{
                "name": "manager",
                "permission": JSON.stringify([
                  "view-realtime",
                  "view-statistic",
                  "view-managerUser",
                  "view-managerRole"
                ])
              }]
        ))
    }else{
        console.log(data.error)
    }
})
.then(async(pool) => {
    
      console.log("result: ", pool);
})
.catch(error => {
    console.log(error)
})
