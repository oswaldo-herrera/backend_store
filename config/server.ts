export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  // 🛑 LÍNEAS CLAVE: Habilitar la confianza en el proxy (TRUST_PROXY)
  //url: env('PUBLIC_URL'),
  app: {
    keys: env.array('APP_KEYS'),
    // Debes indicar a Strapi que confíe en los encabezados X-Forwarded-* (que usa Render)
    proxy: true, 
    // Aseguramos que Strapi considere la conexión HTTPS
    //secure: true,
  },
  // Opcional, pero a veces necesario:
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});
