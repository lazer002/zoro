const mysql = require('mysql');
const async = require('async'); // Ensure async package is installed

// Create the connection pool
const pool = mysql.createPool({
  host: '2uo.h.filess.io',
  user: 'zoro_enjoyfrom',
  password: '74c91e99e0afa5d5e6f606a81aae7f5d9b4efaae',
  database: 'zoro_enjoyfrom',
  port: '3307'
});

// Retry settings
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // in milliseconds

// Function to terminate a single connection with retry
function terminateConnection(id, callback) {
  let attempt = 0;

  const tryTerminate = () => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error getting connection from pool during termination:', err);
        callback(err);
        return;
      }

      connection.query(`KILL ${id}`, (killErr) => {
        connection.release();
        if (killErr) {
          if (attempt < MAX_RETRIES) {
            attempt++;
            console.warn(`Retry ${attempt}/${MAX_RETRIES} for terminating connection ${id}.`);
            setTimeout(tryTerminate, RETRY_DELAY);
          } else {
            console.error(`Error terminating connection ${id}:`, killErr);
            callback(killErr);
          }
        } else {
          console.log(`Connection ${id} terminated.`);
          callback(null);
        }
      });
    });
  };

  tryTerminate();
}

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

        // Terminate each connection individually
        const terminateTasks = results.map(row => (cb) => terminateConnection(row.ID, cb));

        // Execute termination for all connections sequentially
        async.series(terminateTasks, (killErr) => {
          connection.release();
          if (killErr) {
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
