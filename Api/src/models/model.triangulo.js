import {db} from "../config/database.js"; // importa o pool de conexões criado com pg

// Função para listar dados
async function getTriangulo(body, callback) {
  try {
    // Defina sua consulta SQL. Use parâmetros com $1, $2... (padrão do pg)
    let pg = "SELECT * FROM tabela WHERE id = $1 AND pipas = $2";

    // Parâmetros em array, na ordem dos placeholders $1, $2...
    const params = [body.id, body.pipas];

    // Executa a query com parâmetros seguros (evita SQL Injection)
    const result = await db.query(pg, params);

    // Retorna os dados via callback
    callback(null, result.rows); // .rows contém o array de resultados
  } catch (error) {
    // Em caso de erro, envia o erro no callback
    callback(error, null);
  }
}

// Função para inserir dados
async function postTriangulo(body, callback) {
  try {
    // Exemplo: insert usando parâmetros
    let pg =
      "INSERT INTO triangulo (coluna1, coluna2) VALUES ($1, $2) RETURNING *";

    const params = [body.valor1, body.valor2];

    const result = await db.query(pg, params);

    callback(null, result.rows[0]); // retorna o registro inserido
  } catch (error) {
    callback(error, null);
  }
}

export default {getTriangulo, postTriangulo};
