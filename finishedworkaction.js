require('./actions');
require('./action');
require('./base');

FinishedWorkAction = function(req, res) {
  goog.base(this, req, res);
};
goog.inherits(FinishedWorkAction, Action);

FinishedWorkAction.prototype.handleRequest = function(data) {
  if (data) {
    try {
      data = JSON.parse(data);
    } catch (e) {
      this.sendHttpCode(400); return;
    }
  }

  for (var i = 0, len = Actions.workPool.length; i < len; ++i) {
    var work = Actions.workPool[i];
    console.log('comparing: ', data.cmdId, 'to', work.cmd.id);
    if (data.cmdId == work.cmd.id) {
      console.log('same');
      var action = work.action;
      action.sendJsonResponse(data.hashes);
    } else {
      console.log('different');
    }
  }
  Actions.cleanWorkPool(data.cmdId);
  this.sendHttpCode(200);
};

Actions.register('/finishedwork', FinishedWorkAction);
