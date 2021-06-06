if (process.env.NODE_ENV !== 'production') { require('dotenv').config() };

import pool from "../dbconfig/postgres";


async function migrateTables() {
  const client = await pool.connect();
  try {

    //players table
    //classes table
    //items table
    //areas table
    //skills table
    //

  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
}