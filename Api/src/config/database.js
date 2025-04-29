import postgres from "postgres";
import * as dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL não definida no arquivo .env");
}

const db = postgres(connectionString);

// Teste de conexão
(async () => {
  try {
    await db`SELECT 1`;
    console.log("Conexão com banco de dados PostgreSQL: OK");
  } catch (error) {
    console.error("Erro ao conectar no banco de dados:", error);
  }
})();

export {db};
