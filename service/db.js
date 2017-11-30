/**
 * http://usejsdoc.org/
 */
var settings = require("../settings"),
Db = require('mongodb').Db,
Server = require('mongodb').Server;

module.exports = new Db(settings.db, new Server(settings.host, settings.port,{
    socketOpations: { connectTimeoutMS: 500 },
    poolSize: 10,
    auto_reconnect: true
}, {
    numberOfRetries: 3,
    retryMilliSeconds: 500
}),{safe: true});