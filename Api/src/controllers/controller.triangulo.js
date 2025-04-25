// Importa o "model" que contém as funções de acesso ao banco (model.triangulo.js)
import modelTriangulo from "../models/model.triangulo.js";

// Função do controller para GET (listar dados)
function getTriangulo(req, res) {
  // Chama a função do model passando o body e um callback
  modelTriangulo.getTriangulo(req.body, function (err, result) {
    if (err) {
      // Se ocorrer um erro, responde com status 500 (erro interno)
      res.status(500).send(err);
    } else {
      // Se tudo OK, responde com status 200 e os dados em JSON
      res.status(200).json(result);
    }
  });
}

// Função do controller para POST (inserir dados)
function postTriangulo(req, res) {
  // Chama a função do model passando os dados do body
  modelTriangulo.postTriangulo(req.body, function (err, result) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(result); // retorna o item inserido ou mensagem
    }
  });
}

// Exporta como um módulo para ser usado nas rotas
export default {getTriangulo, postTriangulo};
