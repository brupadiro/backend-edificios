module.exports = {
    async register(ctx) {
        var {user, apartment} = ctx.request.body.data;
        let createdApartment, createdUser,createdOwner;
    
          try {
            user = {
              ...user,
              role:1,
              email: `${user.username}@foresttower.com`,
              provider: 'local'
            }
            createdUser = await strapi.service("plugin::users-permissions.user").add(user)
            
            createdApartment = await strapi.query('api::apartament.apartament').create({
                data: apartment
              })  
            createdOwner  = await strapi.query('api::owner.owner').create({
              data: {
                apartment: createdApartment.id,
                user: createdUser.id
              },
              populate:{
                apartment: true,
                user: true
              }
            })
            return ctx.send({
              createdOwner
            });
    
          } catch (e) {
            console.log(e)
            return ctx.send({
              e
            });
    
          }
          finally {
            // Delete created apartment or user if any of them was not created successfully.
            if (!createdApartment || !createdUser || !createdOwner) {
              if (createdUser) {
                await strapi.query("plugin::users-permissions.user").delete({
                  where:{
                    id:createdUser.id
                  }
                });
              }
              if (createdApartment) {
                await strapi.query('api::apartament.apartament').delete({
                  where:{
                    id:createdApartment.id
                  }
                });
              }
            }
          }
        
      }
    }