const mysql = require("mysql");

// Function to create a new connection
function createConnection() {
  return mysql.createConnection({
    host: 'y27.h.filess.io',
    database: 'ZORO_icericeago',
    password: '90c37be5b0f2d6e48a26dd8ec6f1d411eba577da',
    port: 3307,
    user: 'ZORO_icericeago'
  });
}

// Function to execute a query and close the connection
function executeQuery(query, params = [], callback) {
  const connection = createConnection(); // Create a new connection

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      callback(err, null);
      return;
    }

    console.log('Database connected');

    // Execute the query
    connection.query(query, params, (queryErr, results) => {
      if (queryErr) {
        console.error('Error executing query:', queryErr);
        callback(queryErr, null);
      } else {
        callback(null, results);
      }

      // Close the connection
      connection.end((endErr) => {
        if (endErr) {
          console.error('Error closing the connection:', endErr);
        } else {
          console.log('Connection closed');
        }
      });
    });
  });
}


//const connection=sql.createConnection({
 //   host:'z94.h.filess.io',
//    database :'zoro_thankpart',
//    password:'8e4734e5ccc75a0e1c583d6aa24eb20229e16618',
//    port:3306,
//    user:'zoro_thankpart'
//})





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

module.exports=executeQuery;

