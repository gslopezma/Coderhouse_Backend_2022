import knex from 'knex'


 const mysql = {
   client: 'mysql',
   connection: {
     host: 'localhost',
     user: 'root',
     password: '12345678',
     database: 'knex_mysql',
   },
 }

const SQLite = {
    client: "sqlite3",
    connection: {
      filename: "./DB/db.sqlite"
    },
    useNullAsDefault: true,
  };

export const dbSQL = knex(mysql)
export const dbSQLite = knex(SQLite)