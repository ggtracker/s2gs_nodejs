Action = function(req, res) {
  this.req = req;
  this.res = res;
};

Action.prototype.onRequestStart = function() {
  var data = '';
  this.req.on('data', function(chunk) {
    data += chunk.toString();
  });
  this.req.on('end', function() {
    this.handleRequest(data);
  }.bind(this));
};

Action.prototype.handleRequest = function(data) {
  this.res.writeHead(500, {'Content-type': 'application/json'});
  this.res.end('[DEBUG] action registered, but handleRequest undefined');
};

Action.prototype.sendJsonResponse = function(json) {
  this.res.writeHead(200, {'Content-type': 'application/json'});
  this.res.end(JSON.stringify(json));
  this.respStatus_ = 200;
};

Action.prototype.sendTextResponse = function(text) {
  this.res.writeHead(200, {'Content-type': 'text'});
  this.res.end(text);
  this.respStatus_ = 200;
}

Action.prototype.sendHttpCode = function(code) {
  this.res.writeHead(code, {'Content-type': 'text/plain'});
  this.res.end(code.toString());
  this.respStatus_ = code;
};
