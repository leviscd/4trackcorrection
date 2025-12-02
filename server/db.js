import sqlite3 from "sqlite3";
sqlite3.verbose();

const db = new sqlite3.Database("./database.db");

// Criar tabelas
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      username TEXT UNIQUE,
      password TEXT,
      role TEXT CHECK(role IN ('admin', 'user')) NOT NULL DEFAULT 'user',
      created_at TEXT,
      expires_at TEXT
    )
  `);
});

export default db;
