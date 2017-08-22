const Hapi = require('hapi');
const Vision = require('vision');
const Inert = require('inert');
const Handlebars = require('handlebars');
const request = require("request");
const weather = require("./weather");

const server = new Hapi.Server();

server.connection({
  port: process.env.PORT || 8080
});

server.register(Vision, (err) => {
  if (err) throw err;

  server.views({
    engines: {
      html: Handlebars
    },
    path: 'views',
    layoutPath: 'views/layout',
    layout: 'default'
  });

  server.route(
  {
    path:'/',
    method: 'GET',
    handler: (req, reply) => {
      let callback = function(context) {
        reply.view(`index`, context);
      }

      weather.get(callback);
    }
  });
});

server.register(Inert, (err) => {
  if (err) throw err;

  server.route({
    method: 'GET',
    path:'/{file*}',
    handler: {
      directory: {
        path: 'public'
      }
    }
  })
});

module.exports = server;
