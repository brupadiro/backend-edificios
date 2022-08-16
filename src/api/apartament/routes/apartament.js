'use strict';

/**
 * apartament router.
 */

 const { createCoreRouter } = require('@strapi/strapi').factories;
 const defaultRouter = createCoreRouter('api::apartament.apartament');;
 
 const customRouter = (innerRouter, extraRoutes = []) => {
   let routes;
   return {
     get prefix() {
       return innerRouter.prefix;
     },
     get routes() {
       if (!routes) routes = innerRouter.routes.concat(extraRoutes);
       return routes;
     },
   };
 };
 

const extraRoutes = [
    { // Path defined with a URL parameter
        method: 'GET',
        path: '/apartaments/count',
        handler: 'apartament.count',
    },
]

module.exports = customRouter(defaultRouter, extraRoutes);
