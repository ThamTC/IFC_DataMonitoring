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
const sequelize = new Sequelize('CORE', 'sa', 'IFC@123', {
    host: "101.99.52.38",
    port: 1434,
    dialect: 'mssql',
    dialectOptions: {
      // Observe the need for this nested `options` field for MSSQL
      options: {
        // Your tedious options here
        useUTC: true,
        dateFirst: 1,
        encrypt: false
      }
    },
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
