// config/env/production/middlewares.ts

export default [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'res.cloudinary.com'],
          'media-src': ["'self'", 'data:', 'blob:'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  // 👇 ESTO ES CLAVE para Render/Proxies
  {
    name: 'strapi::session',
    config: {
      httpOnly: true,
      secure: true, // Asegura que la cookie solo se envía sobre HTTPS
      sameSite: 'none', // Permite que la cookie se envíe a través de dominios cruzados si fuera necesario (aunque no es el caso aquí, ayuda con el proxy)
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::favicon',
  'strapi::public',
];



// export default [
//   // 👇 Debe ir ANTES de session
//   { resolve: './src/middlewares/force-https' },

//   'strapi::errors',
//   'strapi::security',
//   'strapi::cors',
//   'strapi::poweredBy',
//   'strapi::logger',
//   'strapi::query',
//   'strapi::body',

//   // 👇 La sesión debe venir después de nuestro middleware
//   'strapi::session',

//   'strapi::favicon',
//   'strapi::public',
// ];


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
