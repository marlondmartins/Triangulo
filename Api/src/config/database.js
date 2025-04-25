import pkg from "pg";
const {Pool} = pkg;
import * as dotenv from "dotenv";
dotenv.config();

const configCon = {
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_SERVER,
  database: process.env.DATABASE_BANCO,
  port: parseInt(process.env.DATABASE_PORTA),
  ssl: false, // true se seu banco exigir SSL
};

const pool = new Pool(configCon);

// Teste de conexão
pool.connect((err, client, release) => {
  if (err) {
    return console.error("Erro ao conectar no banco:", err.stack);
  }
  console.log("Conexão com banco de dados: OK");
  release();
});

// Função para executar query
async function executeQuery(query, params = []) {
  try {
    const res = await pool.query(query, params);
    return res.rows;
  } catch (err) {
    throw err;
  }
}

export {pool as db, executeQuery, configCon};
