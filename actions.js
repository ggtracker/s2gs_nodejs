Actions = {
  workPool: [],

  actions_: {},
  regexes_: [],

  register: function(path, handler) {
    if (typeof path === "string") {
      this.actions_[path] = handler;
    } else if (path instanceof RegExp) {
      this.regexes_.push({path: path, handler: handler});
    } else {
      throw new Error("Unrecognized path type: " + path.constructor);
    }
  },

  onRequestStart: function(req, res) {
    if (req.url in this.actions_) {
      var handler = new this.actions_[req.url](req, res);
      handler.onRequestStart();
    } else if (this.testRegex_(req, res)) {
      // pass
    } else {
      res.writeHead(404, {'Content-type': 'text/plain'});
      res.end('404');
    }
  },

  cleanWorkPool: function(cmdId) {
    var newPool = [];
    for (var i = 0, len = Actions.workPool.length; i < len; ++i) {
      var work = Actions.workPool[i];
      if (cmdId != work.cmd.id) {
        newPool.push(work);
      }
    }
    Actions.workPool = newPool;
  },

  testRegex_: function(req, res) {
    var n = this.regexes_.length;
    for (var i = 0; i < n; ++i) {
      var re = this.regexes_[i];
      if (re.path.exec(req.url) != null) {
        var handler = new re.handler(req, res);
        handler.onRequestStart();
        return true;
      }
    }
    return false;
  },

  placeholder_: function() {}
};
