// Importa módulos nativos e de terceiros
import fs from "fs"; // Módulo para ler arquivos do sistema (usado no certificado HTTPS)
import cors from "cors"; // Middleware para permitir requisições de origens diferentes (CORS)
import https from "https"; // Módulo HTTPS do Node.js
import express from "express"; // Framework principal da API
import * as dotenv from "dotenv"; // Carrega variáveis de ambiente do arquivo .env
import cookieParser from "cookie-parser"; // Middleware para tratar cookies enviados na requisição

// Carrega variáveis de ambiente
dotenv.config();

// Importa as rotas específicas do recurso "triangulo"
import routeTriangulo from "./routes/route.triangulo.js";

// Define a porta onde a aplicação será executada
const port = 3001;

// Inicializa o app Express
const app = express();

// Middleware para interpretar requisições com JSON no corpo
app.use(express.json());

// Middleware para interpretar requisições com dados em URL-encoded (formulários)
app.use(express.urlencoded()); // você pode usar `express.urlencoded({ extended: true })` para suporte a objetos aninhados

// Middleware para tratar cookies
app.use(cookieParser());

// Middleware CORS personalizado
// Permite requisições apenas de origens permitidas (definidas no array allowedOrigins)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigins = [
    "https://seusite.com.br", // Adicione os domínios que podem acessar sua API
  ];

  if (origin && allowedOrigins.includes(origin)) {
    // Se a origem da requisição for permitida, aplica CORS com cookies
    cors({
      origin: origin,
      credentials: true, // Permite envio de cookies/autenticação via CORS
    })(req, res, next);
  } else {
    // Se não for permitida, apenas continua sem aplicar CORS
    next();
  }
});

// Rotas principais da aplicação (endpoints de "triangulo")
app.use(routeTriangulo);

// Rota padrão (útil para teste ou verificar se a API está no ar)
app.get("/", (req, res) => {
  res.send("API Node js");
});

// Verifica se o servidor deve rodar com HTTPS ou HTTP (definido via .env)
if (process.env.HTTPS === "false") {
  // Executa o servidor HTTP simples
  app.listen(port, function () {
    console.log("Servidor rodando na porta: " + port);
  });
} else {
  // Executa o servidor HTTPS com certificado
  https
    .createServer(
      {
        key: fs.readFileSync("CAMINHO_ARQUIVO-KEY"), // Substitua pelo caminho do seu arquivo .key
        cert: fs.readFileSync("CAMINHO_ARQUIVO-CERT"), // Substitua pelo caminho do seu arquivo .cert
      },
      app
    )
    .listen(port, function () {
      console.log("Servidor HTTPS rodando na porta: " + port);
    });
}
