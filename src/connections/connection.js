const sql = require("mysql")
const connection=sql.createConnection({
    host:'sql6.freesqldatabase.com',
    database :'sql6695455',
    password:'lHZwtXmMQk',
    port:3306,
    user:'sql6695455'
})
connection.connect((err)=>{
    if (err) throw err;
    console.log('db connected')
})

module.exports=connection;