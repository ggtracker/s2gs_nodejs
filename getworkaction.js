require('./actions');
require('./action');
require('./base');

GetWorkAction = function(req, res) {
  goog.base(this, req, res);
};
goog.inherits(GetWorkAction, Action);

GetWorkAction.prototype.handleRequest = function(data) {
  if (data) {
    try {
      data = JSON.parse(data);
    } catch (e) {
      this.sendHttpCode(400); return;
    }
  }

  if (Actions.workPool.length) {
    var t = new Date().getTime();
    var cutoff = t - 1000 * 30; // 30 seconds
    for (var i = 0, len = Actions.workPool.length; i < len; ++i) {
      var work = Actions.workPool[i];
      if (!work.started || work.started < cutoff) {
        work.started = t;
        this.sendJsonResponse(work.cmd);
        return;
      }
    }
  }
  this.sendTextResponse("");
};

Actions.register('/getwork', GetWorkAction);
