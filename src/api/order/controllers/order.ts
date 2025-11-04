"use strict"
/**
 * order controller
 */
//@ts-ignore
const stripe = require("stripe")(process.env.STRIPE_KEY)

//import { factories } from '@strapi/strapi'

// export default factories.createCoreController('api::order.order');
const {createCoreController} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({strapi}) => ({
    async create(ctx) {
        //@ts-ignore
        const {products} = ctx.request.body;
        console.log("A. IDs recibidos del frontend:", products.map(p => p.id));
        try {
            const lineItems = await Promise.all(
                products.map(async (product) => {
                    console.log(`B. Buscando ID: ${product.id}`);
                    const productId = Number(product.id);
                    const item = await strapi.db.query('api::product.product').findOne({
                        // Usamos la variable convertida
                        where: { id: productId },
                        populate: ['images'] 
                    });
                    // const item = await strapi.service("api::product.product").findOne(product.id,{
                    //     publicationState: 'preview',
                    //     locale: 'all',
                    // });
                    // 🛑 1. VERIFICACIÓN CRÍTICA: Asegurarse de que el producto existe
                    if (!item) {
                        console.error(`C. FALLO CRÍTICO: Producto con ID ${product.id} es null.`);
                        // Si no se encuentra el producto, lanzamos un error claro para el log del servidor
                        throw new Error(`Product with ID ${product.id} not found in database.`);
                    }
                    console.log(`C. ÉXITO: Producto ID ${product.id} encontrado.`);
                    const productData = item.attributes || item;
                    const firstImage = productData.images && productData.images[0];
                    const imageUrl = firstImage ? `${process.env.CLIENT_URL}${firstImage.url}` : null;
                    return {
                        price_data: {
                            currency: "usd",
                            product_data: {
                                name: productData.productName,
                                ...(imageUrl && { images: [imageUrl] })
                            },
                            unit_amount: Math.round(productData.price * 100)
                        },
                        //quantity: product.quantity,
                        quantity: 1
                    };
                })
            );

            const session = await stripe.checkout.sessions.create({
                shipping_address_collection: {allowed_countries: ["US"]},
                payment_method_types: ["card"],
                mode: "payment",
                line_items: lineItems,
                success_url: process.env.CLIENT_URL + "/success",
                cancel_url: process.env.CLIENT_URL + "?successError",
            });
            await strapi.service("api::order.order").create({data: {products,stripeId: session.id}});
            return {stripeSession: session};
        } catch (error) {
            console.error("Error completo en la creación de orden:", error);
            ctx.response.status = 500;
            return{error};
        }
    },
}));