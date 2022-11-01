const utils = require('@strapi/utils');
const {
  sanitize
} = utils;

module.exports = (plugin) => {
  plugin.middleware['transform'] = (ctx) => {
    console.log(ctx)
  };
  return plugin;
};

