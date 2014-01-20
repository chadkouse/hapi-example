var Hapi = require('hapi');
var routes = require('./routes');
var Config = require('config');
var Negotiator = require('negotiator');

var server = new Hapi.Server('0.0.0.0', 8080, {
    cors: true,
    views: {
        path: 'views',
        engines: {
            hjs: 'handlebars'
        },
        partialsPath: 'views/partials',
        defaultExtension: "hjs"
    }
});

    server.route(routes);

    //serve static files
    server.route({
        method: 'GET',
        path: '/{path*}',
        config: {
            handler: {
                directory: {
                    path: __dirname + '/public'
                }
            }
        }
    });

    server.ext('onRequest', function (request, next) {
        var negotiator = new Negotiator(request.raw.req);
        var acceptedMimeTypes = ["text/html", "application/hal+json", "application/json"];
        request.app.mime = negotiator.preferredMediaType(acceptedMimeTypes);
        request.app.outmime = null;
        request.app.type = request.app.mime ? request.app.mime.indexOf("json") >= 0 ? "json" : "html" : null;
        return next();
    });

    server.ext('onPreResponse', function (request, next) {
        var response = request.response;
        if (!response.isBoom) {
            if (request.app.outmime) {
                response.type(request.app.outmime);
            }
            return next();
        }
        next();
    });

    server.start(function () {
        console.log("Server started at " + server.info.uri);
    });

