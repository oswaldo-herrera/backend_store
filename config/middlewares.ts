module.exports = [
  // Debe ir lo primero
  async (ctx, next) => {
    // Fuerza https para el host de producción (evita hacerlo en local)
    const host = ctx.request.header.host || '';
    if (host.includes('onrender.com')) {
      ctx.req.headers['x-forwarded-proto'] = 'https';
    }
    await next();
  },

  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',     // <-- importante: este viene después de nuestro middleware
  'strapi::favicon',
  'strapi::public',
];


// export default [
//   'strapi::logger',
//   'strapi::errors',
//   'strapi::security',
//   'strapi::cors',
//   'strapi::poweredBy',
//   'strapi::query',
//   'strapi::body',
//   'strapi::session',
//   'strapi::favicon',
//   'strapi::public',
// ];
