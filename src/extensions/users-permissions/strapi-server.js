const utils = require('@strapi/utils');
const {
  sanitize
} = utils;
const {
  validateCallbackBody,
} = require('@strapi/plugin-users-permissions/server/controllers/validation/auth');
const { ApplicationError, ValidationError } = utils.errors;
const { getService } = require('@strapi/plugin-users-permissions/server/utils');

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

/*
  plugin.controllers.auth.callback = async (ctx) => {
    const provider = 'local';
    const params = ctx.request.body;

    const store = strapi.store({ type: 'plugin', name: 'users-permissions' });

      await validateCallbackBody(params);

      const query = { provider };

      // Check if the provided identifier is an email or not.

      // Set the identifier to the appropriate query field.
        query.username = params.identifier;

      // Check if the user exists.
      const user = await strapi.query('plugin::users-permissions.user').findOne({ where: query });

      if (!user) {
        throw new ValidationError('Invalid identifier or password');
      }

      if (
        _.get(await store.get({ key: 'advanced' }), 'email_confirmation') &&
        user.confirmed !== true
      ) {
        throw new ApplicationError('Your account email is not confirmed');
      }

      if (user.blocked === true) {
        throw new ApplicationError('Your account has been blocked by an administrator');
      }

      // The user never authenticated with the `local` provider.
      if (!user.password) {
        throw new ApplicationError(
          'This user never set a local password, please login with the provider used during account creation'
        );
      }
      console.log(params.password,user.password) 
      const validPassword = await getService('user').validatePassword(
        params.password,
        user.password
      );

      if (!validPassword) {
        throw new ValidationError('Invalid identifier or password');
      } else {
        ctx.send({
          jwt: getService('jwt').issue({
            id: user.id,
          }),
          user: await sanitizeUser(user, ctx),
        });
      }
  };
*/


  return plugin;
};
