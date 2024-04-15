const sql = require("mysql")




const connection=sql.createConnection({
    host:'zwd.h.filess.io',
    database :'ZORO_tropicalus',
    password:'80df73de28af06379700325d859e092c31cffbf5',
    port:3306,
    user:'ZORO_tropicalus'
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

// jdbc:mysql://sql6.freesqldatabase.com:3306/sql6695455