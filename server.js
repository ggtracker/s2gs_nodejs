var connect = require('connect');

require('./action');
require('./actions');
require('./getworkaction');
require('./finishedworkaction');
require('./gethashesaction');

var port = process.argv[2] || 1337;
var logger = connect.logger(':remote-addr - - [:date] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms');
connect.createServer(
  logger,
  function(req, res, next) {
    Actions.onRequestStart(req, res);
  }
).listen(port);
console.log('server started on port', port);
