export default [
  // 👇 Debe ir ANTES de session
  'global::force-https',

  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',

  // 👇 La sesión debe venir después de nuestro middleware
  'strapi::session',

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
