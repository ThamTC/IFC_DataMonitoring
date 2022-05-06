const {connectDB, sequelize} = require("./config/mssqlConnect")
const db = require("./models/index.js")

connectDB().then(async(data) => {
    if (data?.success) {
        console.log(await db.GS_UserIFC.create())
    }else{
        console.log(data.error)
    }
})
// .then(async(pool) => {
//     const result = await pool.pool.request().query("SELECT TOP (2) [id] ,thoigian ,[TAG_NAME] ,[TAG_ID] ,[STATE] FROM [CORE].[SOLAR].[ThamSo]");
//       console.log("result: ", result);
// })
// .catch(error => {
//     console.log(error)
// })

