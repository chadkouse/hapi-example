var Hapi = require('hapi');
var Negotiator = require('negotiator');

var Dal = function(id, callback) {
    if (id != 1) {
        callback(new Error("Invalid Id"), null);
    }
    setTimeout(function() {
        callback(null, id);
    }, 2000);
};

exports.getTest = {
    handler: function (request, reply) {
        var testId = request.params.id;
        //go look up the test from the database...
        Dal(testId, function(err, data) {
            if (err) {
                return reply(err);
            }
            return reply("test " + testId);
        });
    }
};

exports.putTest = {
    handler: function (request, reply) {
        var testId = request.params.id;
        if (testId) {
            //go update a test in the database...
            Dal(testId, function(err, data) {
                if (err) {
                    return reply(err);
                 }
                return reply("Updated test " + testId);
            })
        }
        //make a new test and persist to the database
        
        Dal(1, function(err, data) {
            if (err) {
                return reply(err);
            }
            var blah = request.payload.blah;
            var hey = request.payload.hey;
            console.log("Here", blah, hey);
            return reply({msg: "made a new test", body: request.payload});
        });
    }
};

exports.deleteTest = {
    handler: function (request, reply) {
        var testId = request.params.id;
        Dal(testId, function(err, data) {
            if (err) {
                return reply(err);
            }
            return reply("deleted a test " + testId);
        });
    }
};
