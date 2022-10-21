const utils = require('@strapi/utils');
const {
  sanitize
} = utils;
const sanitizeOutput = (user, ctx) => {
  const schema = strapi.getModel('plugin::users-permissions.user');
  const {
    auth
  } = ctx.state;

  return sanitize.contentAPI.output(user, schema, {
    auth
  });
};

module.exports = (plugin) => {
  const me = plugin.controllers.user.me;

  plugin.controllers.user.me = async (ctx) => {
    var user = ctx.state.user;
    if (!user) {
      return ctx.unauthorized();
    }

    if (user.type == 'owner' || user.type == 'tenant') {
      var extraData = {}
      if (user.type == 'owner') {

        extraData = await strapi.db.query('api::owner.owner').findOne({
          where: {
            user: user.id
          },
          populate: {
            apartment: true
          },
        });
      } else {

        extraData = await strapi.db.query('api::rental.rental').findOne({
          where: {
            user: user.id
          },
          populate: {
            apartment: true
          },
        });
      }
      console.log(extraData)
      user.data = extraData;
    }
    ctx.body = await sanitizeOutput(user, ctx);

    await me(ctx);
  };

  return plugin;
};
