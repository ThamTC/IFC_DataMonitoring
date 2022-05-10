const {connectDB, sequelize} = require("./config/mssqlConnect")
const db = require("./models/index.js")

connectDB().then(async(data) => {
    if (data?.success) {
        console.log(await db.GS_UserIFC.destroy({where: {email: null}}))
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
