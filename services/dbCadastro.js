// services/dbCadastro.js
import * as SQLite from 'expo-sqlite'

let db

export async function initDB() {
  if (db) return
  db = await SQLite.openDatabaseAsync('indika.db')

  // 1) usuários
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id     INTEGER PRIMARY KEY AUTOINCREMENT,
      login  TEXT UNIQUE,
      senha  TEXT
    );
  `)

  // 2) sessão (usuário logado)
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS session (
      userId INTEGER
    );
  `)

  // 3) cadastros (cliente/empresa)
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS cadastros (
      id       INTEGER PRIMARY KEY AUTOINCREMENT,
      nome     TEXT,
      cpfCnpj  TEXT,
      telefone TEXT,
      tipo     TEXT,
      email    TEXT,
      site     TEXT,
      rua      TEXT,
      numero   TEXT,
      bairro   TEXT,
      cidade   TEXT,
      uf       TEXT
    );
  `)

  // 4) oportunidades
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS oportunidades (
      id               INTEGER PRIMARY KEY AUTOINCREMENT,
      cpfCnpj          TEXT,
      nomeRazao        TEXT,
      ramoAtuacao      TEXT,
      descricaoServico TEXT,
      link             TEXT,
      comissaoPercent  REAL,
      valorProposta    REAL,
      valorComissao    REAL,
      anexoUri         TEXT,
      anexoName        TEXT,
      UNIQUE(cpfCnpj)  -- evita duplicar oportunidades para o mesmo CPF/CNPJ
    );
  `)

  // 5) indicações (cada usuário pode 'indikar' muitas oportunidades)
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS indicacoes (
      id               INTEGER PRIMARY KEY AUTOINCREMENT,
      userId           INTEGER,
      oportunidadeId   INTEGER,
      nomeRazao        TEXT,
      link             TEXT,
      createdAt        TEXT,
      FOREIGN KEY(userId)        REFERENCES users(id),
      FOREIGN KEY(oportunidadeId) REFERENCES oportunidades(id)
    );
  `)
}

/**
 * Executa comandos de escrita: INSERT, UPDATE, DELETE...
 * @param {string} sql 
 * @param {any[]} params 
 */
export async function runAsync(sql, params = []) {
  if (!db) await initDB()
  return await db.runAsync(sql, params)
}

/**
 * Faz SELECTs e retorna um array de objetos
 * @param {string} sql 
 * @param {any[]} params 
 */
export async function queryAsync(sql, params = []) {
  if (!db) await initDB()
  return await db.getAllAsync(sql, params)
}