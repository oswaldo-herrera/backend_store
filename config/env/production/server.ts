export default ({ env }) => ({
  url: env('PUBLIC_URL'),
  app: {
    keys: env.array('APP_KEYS'),
    proxy: true,
  },
});