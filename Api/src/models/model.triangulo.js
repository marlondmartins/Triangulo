import {db} from "../config/database.js";
import rotinas from "../others/rotinas.js";

async function getQtdTriangulo(body, callback) {
  try {
    let sql = ` Select Tipo, Count(*) as Quantidade_Registros
                  From Triangulos
                 Group By Tipo `;

    const result = await db.unsafe(sql);
    callback(null, {
      note: "Quantidade de registro(s): " + result[0],
    });
  } catch (error) {
    callback(error, null);
  }
}

//Listar triangulos
async function getTriangulo(id, tipo, data, order, pagina, offset, callback) {
  try {
    if (!offset) {
      offset = 12;
    }
    offset = parseInt(offset);

    let sql = `
      Select *, Count(*) Over () as recordCountTot
        From Triangulos 
      Where ID = ID `;

    if (id) {
      sql += ` And ID = ${id} `;
    }

    if (tipo) {
      sql += ` And Tipo = '${tipo}' `;
    }

    if (data) {
      const dataFormatada = new Date(data).toISOString().split("T")[0];
      sql += ` And Cast(Data as Date) = '${dataFormatada}' `;
    }

    if (order) {
      sql += ` Order By ID ${order} `;
    } else {
      sql += ` Order By ID `;
    }

    if (pagina) {
      pagina = parseInt(pagina);
      sql += ` Offset ${
        (pagina - 1) * Offset
      } Rows Fetch Next ${offset} Rows Only `;
    }

    const result = await db.unsafe(sql);
    const response = await rotinas.resPagination(result, null, pagina, offset);
    callback(null, response);
  } catch (error) {
    callback(error, null);
  }
}

//Add triangulo
async function postTriangulo(body, callback) {
  try {
    const {
      tipo = "",
      lado_a = 0,
      lado_b = 0,
      lado_c = 0,
      area = 0,
      perimetro = 0,
    } = body || {};

    const result = await db`
      Insert Into Triangulos(Tipo, Lado_A, Lado_B, Lado_C, Area, Perimetro, Data)
      Values (${tipo}, ${lado_a}, ${lado_b}, ${lado_c}, ${area}, ${perimetro}, Current_Date)
      Returning *
    `;
    callback(null, result[0]);
  } catch (error) {
    callback(error, null);
  }
}

export default {getQtdTriangulo, getTriangulo, postTriangulo};
