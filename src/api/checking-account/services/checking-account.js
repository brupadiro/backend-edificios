'use strict';

/**
 * checking-account service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::checking-account.checking-account');
