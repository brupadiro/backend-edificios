module.exports = {
    async count(ctx) {
        var { query } = ctx.request
        const data = await strapi.query('api::apartament.apartament').count({ where: query });
        return {data:data}
    }

}