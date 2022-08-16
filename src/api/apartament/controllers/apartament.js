'use strict';

/**
 *  apartament controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::apartament.apartament',{
    async count(ctx) {
        console.log("aca")
        var { query } = ctx.request
        return {}
        return await strapi.query('api::product.product').count({ where: query });
    }
});
