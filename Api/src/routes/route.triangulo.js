// Importa o Router do Express, que permite criar rotas modularizadas
import {Router} from "express";

// Importa o controller que contém a lógica de negócio das rotas relacionadas ao "triangulo"
import controllerTriangulo from "../controllers/controller.triangulo.js";

// (Opcional) Importa um middleware de autenticação JWT que pode proteger rotas
// import { verifyJWT } from "../config/token.js";

// Cria uma instância do roteador, que vai agrupar as rotas do recurso "triangulo"
const routeTriangulo = Router();

// ------------------
// ROTAS DO RECURSO TRIANGULO
// ------------------

// Rota GET para listar dados de triângulo
// Exemplo de chamada: GET http://localhost:3000/v1/list/triangulo
routeTriangulo.get("/v1/list/triangulo", controllerTriangulo.getTriangulo);

// Rota POST para adicionar um novo triângulo
// Exemplo de chamada: POST http://localhost:3000/v1/add/triangulo
// Body esperado: { ...dados... }
routeTriangulo.post("/v1/add/triangulo", controllerTriangulo.postTriangulo);

// (Comentado) Exemplo de como proteger a rota POST com autenticação JWT
// Se ativado, será necessário enviar um token válido no cabeçalho Authorization
// routeTriangulo.post("/v1/add/triangulo", verifyJWT, controllerTriangulo.postTriangulo);

// Exporta esse conjunto de rotas para ser usado em outro lugar, como no server.js
export default routeTriangulo;
