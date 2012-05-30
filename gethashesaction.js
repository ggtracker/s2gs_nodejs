require('./actions');
require('./action');
require('./base');

GetHashesAction = function(req, res) {
  goog.base(this, req, res);
};
goog.inherits(GetHashesAction, Action);

GetHashesAction.RE_ = /^\/GetHashes\/([^\/.]+)\/([^\/.]+)/;
GetHashesAction.LEAGUE_MATE_RE_ = /\/LeagueMate\/([^\/.]+)/;

GetHashesAction.prototype.handleRequest = function(data) {

  var m = GetHashesAction.RE_.exec(this.req.url);
  var name = decodeURIComponent(m[1]).toString();
  var code = decodeURIComponent(m[2]).toString();
  
  var leagueMateMatch = GetHashesAction.LEAGUE_MATE_RE_.exec(this.req.url);
  if (leagueMateMatch && leagueMateMatch.length == 2) {
    var leagueMateRank = leagueMateMatch[1];
    console.log("Received league_mate_match_history work: ",
        name, code, leagueMateRank);

    Actions.workPool.push({
      'action': this,
      'cmd': {
        'type': 'league_mate_match_history',
        'characterString': name + '#' + code,
        'leagueMateRank': leagueMateRank,
        'id': 'league_mate_match_history:' + name + '#' + code +
            ':' + leagueMateRank
      }
    });
  } else {
    console.log("Received match_history work: ", name, code);
    Actions.workPool.push({
      'action': this,
      'cmd': {
        'type': 'match_history',
        'characterString': name + '#' + code,
        'id': 'match_history:' + name + '#' + code
      }
    });
  }
};

Actions.register(GetHashesAction.RE_, GetHashesAction);
