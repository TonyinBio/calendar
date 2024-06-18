module.exports = {
    URL: process.env.MYSQL_URL,
    HOST: process.env.MYSQLHOST,
    USER: process.env.MYSQLUSER,
    PASSWORD: process.env.MYSQLPASSWORD,
    DB: process.env.MYSQLDATABASE,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}