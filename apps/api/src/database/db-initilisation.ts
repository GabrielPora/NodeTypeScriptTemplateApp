import { Pool } from "pg";

const pool = new Pool({
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

export const checkSchemaAndDetermineSyncState = async (
  schemaName: string,
  tableName: string
) => {
  try {
    let shouldSyncDBEntities = false;
    const client = await pool.connect();

    console.log("======================================================");
    console.log(`Schema: ${schemaName}`);

    const schemaExistsResult = await client.query(
      `SELECT schema_name FROM information_schema.schemata WHERE schema_name = $1`,
      [schemaName]
    );

    if (schemaExistsResult.rows.length === 0) {
      await client.query(`CREATE SCHEMA ${schemaName}`);
      console.log(`Schema did not exist so ${schemaName} was created.`);
    //   await client.query(`SET SCHEMA ${schemaName}`);
    //   console.log(`Schema set to ${schemaName}.`);
      shouldSyncDBEntities = true;
    } else {
      const tableExistsResult = await client.query(
        `SELECT * FROM information_schema.tables WHERE table_schema = $1 AND table_name = $2`,
        [schemaName, tableName]
      );

      if (tableExistsResult.rows.length === 0) {
        shouldSyncDBEntities = true;
        console.log(
          `Table ${tableName} does not exist in schema ${schemaName} - SyncDBEntities is true.`
        );
      } else {
        console.log("Skipping SyncDBEntities.");
      }
    }
    client.release();
    return shouldSyncDBEntities;
  } catch (err) {
    throw new Error("Failed to check schema and determine DB sync state.");
  }
};
