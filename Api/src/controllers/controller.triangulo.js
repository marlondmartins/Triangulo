import modelTriangulo from "../models/model.triangulo.js";

function getQtdTriangulo(req, res) {
  modelTriangulo.getQtdTriangulo(req.body, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(result);
    }
  });
}

function getTriangulo(req, res) {
  modelTriangulo.getTriangulo(
    req.query.id,
    req.query.tipo,
    req.query.data,
    req.query.order,
    req.query.pagina,
    req.query.offset,
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json(result);
      }
    }
  );
}

function postTriangulo(req, res) {
  modelTriangulo.postTriangulo(req.body, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(result);
    }
  });
}

export default {getQtdTriangulo, getTriangulo, postTriangulo};
