# HOY - Carga de Camiones en Cloudflare

Este proyecto oculta la URL de Dropbox del código HTML. El navegador consulta
`/api/datos` y el Worker obtiene el JSON mediante el Secret
`HOY_CONTROL_JSON_URL`.

## Publicar desde la computadora

1. Extraer el archivo ZIP.
2. Abrir PowerShell dentro de la carpeta extraída.
3. Ejecutar:

```powershell
npm install
npx wrangler login
npx wrangler secret put HOY_CONTROL_JSON_URL
```

4. Cuando lo solicite, pegar la URL completa de `HOY_Control.json`.
5. Publicar:

```powershell
npm run deploy
```

## Configurarlo desde el panel de Cloudflare

En el Worker, abrir:

**Settings → Variables and Secrets → Add**

- Nombre: `HOY_CONTROL_JSON_URL`
- Tipo: **Secret**
- Valor: la URL completa de `HOY_Control.json`

Después volver a desplegar el Worker.

## Importante

La URL original no queda escrita en el HTML ni se envía al navegador. El
endpoint público del dashboard es `/api/datos`.
