import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const secretToken = process.env.SECRET_TOKEN_AUTH;

function createJWT(id_usuario) {
  const token = jwt.sign({id_usuario}, secretToken, {
    expiresIn: 999999,
  });

  return token;
}

function verifyJWT(req, res, next) {
  let token = null;

  // receber token via header na req
  const authToken = req.headers.authorization;
  if (authToken) {
    const [type, extractedToken] = authToken.split(" ");
    if (type === "Bearer") {
      token = extractedToken;
    }
  }

  // recebe token via cookie do browser (httpOnly)
  if (!token && req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).send({message: "Token não informado"});
  }

  jwt.verify(token, secretToken, (err, decoded) => {
    if (err) {
      return res.status(401).send({message: "Token inválido"});
    } else {
      //
      // realiza verficações de autorização no token valido antes de chamar next();
      //
      next();
    }
  });
}

export {createJWT, verifyJWT};
