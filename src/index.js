export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/datos") {
      if (!env.HOY_CONTROL_JSON_URL) {
        return respuestaJson(
          { error: "No existe el Secret HOY_CONTROL_JSON_URL." },
          500
        );
      }

      try {
        const origen = await fetch(env.HOY_CONTROL_JSON_URL, {
          headers: {
            Accept: "application/json",
            "User-Agent": "HOY-Carga-Camiones/1.0",
          },
          cf: {
            cacheEverything: false,
            cacheTtl: 0,
          },
        });

        if (!origen.ok) {
          return respuestaJson(
            { error: "No fue posible obtener los datos operativos." },
            502
          );
        }

        const texto = await origen.text();

        try {
          JSON.parse(texto);
        } catch {
          return respuestaJson(
            { error: "La fuente no devolvió un JSON válido." },
            502
          );
        }

        return new Response(texto, {
          status: 200,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Cache-Control": "no-store, no-cache, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
            "X-Content-Type-Options": "nosniff",
            "Referrer-Policy": "no-referrer",
          },
        });
      } catch {
        return respuestaJson(
          { error: "Error al consultar la información operativa." },
          502
        );
      }
    }

    return env.ASSETS.fetch(request);
  },
};

function respuestaJson(contenido, estado) {
  return new Response(JSON.stringify(contenido), {
    status: estado,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
