if (process.env.NODE_ENV !== 'production') { require('dotenv').config() };

import pool from "../dbconfig/postgres";
import tableQueries from "./tablequeries/tables";
import fkQueries from "./tablequeries/constraints";

migrateTables();

async function migrateTables() {
  const client = await pool.connect();
  try {
    // firstQueries had to be executed first
    const firstQueries = tableQueries.map((e) => { return client.query(e) });
    await Promise.all(firstQueries);

    // secondQueries are queries for tables and constraints that are dependent to firstQueries
    const secondQueries = fkQueries.map((e) => { return client.query(e) });
    await Promise.all(secondQueries);

    console.log("migration success");

  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
}