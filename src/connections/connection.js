const sql = require("mysql")

const connection=sql.createConnection({
    host:'z94.h.filess.io',
    database :'zoro_thankpart',
    password:'8e4734e5ccc75a0e1c583d6aa24eb20229e16618',
    port:3306,
    user:'zoro_thankpart'
})
connection.connect((err)=>{
    if (err) throw err;
    console.log('db connected')
})














// const connection=sql.createConnection({
//     host:'sql6.freesqldatabase.com',
//     database :'sql6695523',
//     password:'4U9Hpajjtc',
//     port:3306,
//     user:'sql6695523'
// })
// connection.connect((err)=>{
//     if (err) throw err;
//     console.log('db connected')
// })

module.exports=connection;

