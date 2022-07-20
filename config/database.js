const {createPool} = require("mysql");

const pool = createPool({
    port:3306,
    host:"localhost",
    user:"nodeuser",
    password:"password",
    database:"CRUDDataBase",
    connectionLimit:10
})

module.exports = pool;