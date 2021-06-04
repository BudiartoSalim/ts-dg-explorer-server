if (process.env.NODE_ENV !== 'production') { require('dotenv').config() };

import pool from "../dbconfig/postgres";


async function migrateTables() {
  const client = await pool.connect();
  try {

  } catch (err) {
    console.log(err);
    client.release();
  }
}