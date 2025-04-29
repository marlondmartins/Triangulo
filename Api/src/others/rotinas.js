async function resPagination(objeto, err, pagina, offset) {
  let recordcount = 0;
  let qtd_paginas = 0;
  let registros_pagina = 0;
  if (objeto) {
    if (objeto.length > 0) {
      recordcount = objeto[0].recordcounttot;
      qtd_paginas = Math.ceil(recordcount / offset);
      registros_pagina = objeto.length;
      objeto.forEach((elemento) => delete elemento.recordcounttot);
    }
  }

  let resultado = {
    sucesso: err == null,
    erro: err,
    pagina: pagina,
    offset: offset,
    registros_total: parseInt(recordcount),
    registros_pagina: registros_pagina,
    qtd_paginas: qtd_paginas,
    data: objeto,
  };

  return resultado;
}

export default {resPagination};
