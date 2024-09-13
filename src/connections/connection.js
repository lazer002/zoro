const mysql = require('mysql');

// Create the connection pool
const pool = mysql.createPool({
  host: '2uo.h.filess.io',
  user: 'zoro_enjoyfrom',
  password: '74c91e99e0afa5d5e6f606a81aae7f5d9b4efaae',
  database: 'zoro_enjoyfrom',
  port: '3307'
});

// Function to terminate all connections for the user at server start
function terminateAllConnections(callback) {
  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting connection from pool during termination:', err);
      callback(err);
      return;
    }

    // Query to get all active connections for the user 'zoro_enjoyfrom'
    connection.query(`SELECT ID FROM information_schema.processlist WHERE USER = 'zoro_enjoyfrom'`, (err, results) => {
      if (err) {
        console.error('Error fetching active connections:', err);
        connection.release();
        callback(err);
        return;
      }

      if (results.length > 0) {
        console.log(`Terminating ${results.length} connections for 'zoro_enjoyfrom'...`);

        // Generate kill queries for all existing connections
        const killQueries = results.map(row => `KILL ${row.ID};`).join(' ');

        // Terminate all connections
        connection.query(killQueries, (killErr) => {
          connection.release();
          if (killErr) {
            console.error('Error terminating connections:', killErr);
            callback(killErr);
          } else {
            console.log('All connections for user terminated.');
            callback(null);
          }
        });
      } else {
        console.log('No active connections found for user.');
        connection.release();
        callback(null);
      }
    });
  });
}

// Execute this function when the server starts
terminateAllConnections((err) => {
  if (err) {
    console.error('Failed to terminate existing connections on startup:', err);
  } else {
    console.log('Connection cleanup complete. Server ready to accept new connections.');
  }
});

// Function to execute queries normally after startup
function executeQuery(query, params = [], callback) {
  // Get a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting connection from pool:', err);
      callback(err, null);
      return;
    }

    // Execute the query
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
