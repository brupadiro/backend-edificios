'use strict';

const _ = require('lodash');
const { getPluginService } = require('../util/getPluginService');
const { isAPIRequest } = require('../util/isAPIRequest');

const transform = async (strapi, ctx, next) => {
	const settings = getPluginService('settingsService').get();

    try {
		await next();
  
		if (!ctx.response._explicitStatus) {
		  return ctx.notFound();
		}
	  } catch (error) {
		if (error instanceof ApplicationError) {
		  const { status, body } = formatApplicationError(error);
		  ctx.status = status;
		  ctx.body = body;
		  return;
		}
  
		if (error instanceof HttpError) {
		  const { status, body } = formatHttpError(error);
		  ctx.status = status;
		  ctx.body = body;
		  return;
		}
  
		strapi.log.error(error);
  
		const { status, body } = formatInternalError(error);
		ctx.status = status;
		ctx.body = body;
	  }
  
	// skip any requests that have ignore header
	const transformIgnoreHeader = _.get(ctx, ['headers', 'strapi-transformer-ignore'], 'false');
	if (transformIgnoreHeader === 'true') {
		return;
	}

	// ensure body exists, occurs on non existent route
	if (!ctx.body) {
		return;
	}

	// only process api requests.
	if (isAPIRequest(ctx)) {
		const { data } = ctx.body;

		// ensure no error returned.
		if (data) {
			ctx.body['data'] = getPluginService('transformService').response(settings, data);
		}
	}
};

module.exports = ({ strapi }) => {
	strapi.server.use((ctx, next) => transform(strapi, ctx, next));
};
