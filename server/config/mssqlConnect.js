// const sql = require("mssql");
// const dbConfig = require("./mssqlConfig")
// sql.on("error", err => console.log("error: ", err))
// const mssql = {
//   connect: async () => {
//     try {
//       // make sure that any items are correctly URL encoded in the connection string
//       const pool = await sql.connect(dbConfig)
//       // const result = await pool.request().query("SELECT TOP (2) [id] ,thoigian ,[TAG_NAME] ,[TAG_ID] ,[STATE] FROM [CORE].[SOLAR].[ThamSo]");
//       // console.log("result: ", pool);
//       return {pool: pool}
//     } catch (err) {
//       return {err: err}
//     }
//   },
// };
// module.exports = mssql;

const { Sequelize } = require('sequelize');


// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(process.env.MSSQL_DATABASE || 'MYDB', process.env.MSSQL_USER || "sa", process.env.MSSQL_PASSWORD || 'admin', {
    host: process.env.MSSQL_SERVERNAME || "localhost",
    port: process.env.MSSQL_PORT,
    dialect: 'mssql',
    dialectOptions: {
      useUTC: false, //for reading from database
      timezone: '+07:00',
    },
    timezone: '+07:00',
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    // schema: "GS"
  });


const connectDB = async function() {
    try {
        await sequelize.authenticate();
        // console.log('Connection has been established successfully.');
        return {success: "connect successfully"}
    } catch (error) {
        return {error: error}
    }
}

const closeConnectDB = async function() {
    await sequelize.close()
    return conn
}

module.exports = {
    connectDB,
    closeConnectDB,
    sequelize
}
