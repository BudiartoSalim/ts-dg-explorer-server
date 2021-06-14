if (process.env.NODE_ENV !== 'production') { require('dotenv').config() };

import pool from "../dbconfig/postgres";
import * as tableQueries from "./tablequeries/tables";
import * as fkQueries from "./tablequeries/constraints";

migrateTables();

async function migrateTables() {
  const client = await pool.connect();
  try {
    // firstQueries had to be executed first
    const firstQueries = [];
    for (const [key, value] of Object.entries(tableQueries)) {
      firstQueries.push(client.query(value));
    }
    await Promise.all(firstQueries);

    // secondQueries are queries for tables and constraints that are dependent to firstQueries
    const secondQueries = [];
    for (const [key, value] of Object.entries(fkQueries)) {
      secondQueries.push(client.query(value));
    }
    await Promise.all(secondQueries);

    console.log("migration success");

  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
}