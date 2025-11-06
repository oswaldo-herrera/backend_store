// Forzar X-Forwarded-Proto=https en Render para que las cookies "secure" no fallen
const forceHttps = (_config: unknown, _ctxDeps: { strapi: any }) => {
    console.log('[force-https] loaded');
    return async (ctx: any, next: () => Promise<void>) => {
        // Solo en producción y cuando el host es el de Render
        const host = ctx.request?.header?.host ?? '';
        if (process.env.NODE_ENV === 'production' && host.includes('onrender.com')) {
        ctx.req.headers['x-forwarded-proto'] = 'https';
        }
        await next();
    };
    };

export default forceHttps;