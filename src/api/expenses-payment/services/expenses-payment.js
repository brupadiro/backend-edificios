'use strict';

/**
 * expenses-payment service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::expenses-payment.expenses-payment');
