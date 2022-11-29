const utils = require('@strapi/utils');
const {
  sanitize
} = utils;

module.exports = (plugin) => {
  const me = plugin.controllers.user.me;
  const extraDataByType = async function (user) {
      var extraData = {}
      if (user.type == 'owner') {
        data = await strapi.db.query('api::owner.owner').findOne({
          where: {
            user: user.id
          },
          populate: {
            apartment: true
          },
        });
      } else {

        data = await strapi.db.query('api::rental.rental').findOne({
          where: {
            user: user.id
          },
          populate: {
            apartment: true
          },
        });
      }
      return data;

  }
  plugin.controllers.user.me = async (ctx) => {
    var user = ctx.state.user;
    if (!user) {
      return ctx.unauthorized();
    }


    user = await strapi.entityService.findOne(
      'plugin::users-permissions.user',
      ctx.state.user.id, {
        populate: ['building'],
        fields: ['name', 'phone', 'type', 'blocked', 'username'],
      }
    );

    if (user.type == 'owner' || user.type == 'tenant') {
      user.data = await extraDataByType(user);
    }


    ctx.body = user

  };

  return plugin;
};
