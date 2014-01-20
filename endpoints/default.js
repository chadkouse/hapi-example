var Hapi = require('hapi');
var Negotiator = require('negotiator');
exports.home = {
    handler: function(request, reply) {
        switch (request.app.type) {
            case "html":
                //html version version
                request.app.outmime = request.app.mime;
                reply.view('index.hjs', { name: 'Jared' });
                break;
            case "json":
                request.app.outmime = request.app.mime;
                reply({response: "Hi Jared"});
                break;
            default:
                reply(Hapi.error.notFound("Only text/html and application/json are supported"));
                break;
        }
    }
};