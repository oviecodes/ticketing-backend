'use strict';

/**
 *  ticket controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
// module.exports = createCoreController('api::ticket.ticket')

module.exports = createCoreController('api::ticket.ticket', ({ strapi }) => ({

    async create(ctx) {

        const event_id = Number(ctx.request.body.data.event)

        // some logic here
        const event = await strapi.service('api::event.event').findOne(event_id, {
            populate: "tickets"
        })

        // console.log(event.tickets.length)

        // console.log(event.tickets_available - event.tickets.length)

        // console.log()

        if(ctx.request.body.data.total_seats > event.tickets_available) {
            return ctx.badRequest('Cannot book ticket at the moment')
        }

        // const response = await super.create(ctx);

        const response = await strapi.service('api::ticket.ticket').create(ctx.request.body)

        const event_update = await strapi.service('api::event.event').update(event_id, { data: {
            tickets_available: event.tickets_available - ctx.request.body.data.total_seats
        }})
        // some more logic

        console.log('response', response)
        console.log('here', event_update)
      
        return response;
      }
      

}));
