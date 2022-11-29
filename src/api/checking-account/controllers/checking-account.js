'use strict';

/**
 *  checking-account controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::checking-account.checking-account',(strapi) => ({
    async deleteMultiple(ctx) {
        const {data} = ctx.request.body;


        const knex = strapi.strapi.db.connection;


        const result = await knex('checking_accounts').where(data).del();

        return result
    }
}));
