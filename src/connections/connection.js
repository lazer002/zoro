const mysql = require('mysql');

const pool = mysql.createPool({
  host: '2uo.h.filess.io',
  user: 'zoro_enjoyfrom',
  password: '74c91e99e0afa5d5e6f606a81aae7f5d9b4efaae',
  database: 'zoro_enjoyfrom',
  port: '3307'
});

function executeQuery(query, params = [], callback) {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting connection from pool:', err);
      callback(err, null);
      return;
    }

    connection.query(query, params, (queryErr, results) => {
      connection.release();

      if (queryErr) {
        console.error('Error executing query:', queryErr);
        callback(queryErr, null);
      } else {
        callback(null, results);
      }
    });
  });
}

module.exports = executeQuery;
