import {Router} from "express";
import controllerTriangulo from "../controllers/controller.triangulo.js";

const routeTriangulo = Router();

// GET's
routeTriangulo.get("/v1/list/triangulo", controllerTriangulo.getTriangulo);
routeTriangulo.get("/v1/qtd/triangulo", controllerTriangulo.getQtdTriangulo);

// POST's
routeTriangulo.post("/v1/add/triangulo", controllerTriangulo.postTriangulo);

export default routeTriangulo;
