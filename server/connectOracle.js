const {connectDB, sequelize} = require("./config/mssqlConnect")
const db = require("./models/index.js")

// connectDB().then(async(data) => {
//     if (data?.success) {
//       const tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
//       const localISOTime = new Date(Date.now() - tzoffset).toISOString()
//       const record = {
//         type: "TEST",
//         system: "TEST",
//         parameter: "TEST",
//         action: "true",
//         total: "1",
//         usernameDone: "thamtc.ifc",
//         createdAt: localISOTime,
//         updatedAt: localISOTime,
//       };
//         console.log(await db.GS_Statistic.create(record))
//     }else{
//         console.log(data.error)
//     }
// })
// .then(async(pool) => {
//     const result = await pool.pool.request().query("SELECT TOP (2) [id] ,thoigian ,[TAG_NAME] ,[TAG_ID] ,[STATE] FROM [CORE].[SOLAR].[ThamSo]");
//       console.log("result: ", result);
// })
// .catch(error => {
//     console.log(error)
// })
var arr1 = [1,2,3,4,5,6,7]
var arr2 = [4,2,3]
var arr = []
for (var i=arr2.length-1; i>=0; i--) {
    arr1.splice(arr1.findIndex(ele => ele === arr2[i]), 1)
}
console.log(arr1);
