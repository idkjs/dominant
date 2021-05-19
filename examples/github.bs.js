'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Rebase = require("@glennsl/rebase/src/Rebase.bs.js");
var Resync = require("refetch/src/Resync.bs.js");
var Refetch = require("refetch/src/Refetch.bs.js");
var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");
var Refetch__Utils = require("refetch/src/Refetch__Utils.bs.js");
var Caml_exceptions = require("bs-platform/lib/js/caml_exceptions.js");
var Refetch__Response = require("refetch/src/Refetch__Response.bs.js");

require('isomorphic-fetch')
;

var FetchError = /* @__PURE__ */Caml_exceptions.create("Github-Dominant.FetchError");

function repo(json) {
  return {
          name: Json_decode.field("name", Json_decode.string, json),
          description: Json_decode.field("description", (function (param) {
                  return Json_decode.optional(Json_decode.string, param);
                }), json),
          stars: Json_decode.field("stargazers_count", Json_decode.$$int, json),
          forks: Json_decode.field("forks_count", Json_decode.$$int, json),
          openIssues: Json_decode.field("open_issues_count", Json_decode.$$int, json)
        };
}

function repos(param) {
  return Json_decode.list(repo, param);
}

var Decode = {
  repo: repo,
  repos: repos
};

function columnify(rows) {
  var maxLengths = Refetch__Utils.List.reduceOr(/* [] */0, (function (maxs, lengths) {
          return Rebase.List.map(Curry._1(Rebase.Fn.uncurry, (function (prim, prim$1) {
                            return Math.max(prim, prim$1);
                          })), Rebase.List.zip(maxs, lengths));
        }), Rebase.List.map((function (param) {
              return Rebase.List.map(Rebase.$$String.length, param);
            }), rows));
  return Rebase.List.map(Curry._2(Rebase.Fn.$great$great, Curry._2(Rebase.Fn.$great$great, (function (param) {
                        return Rebase.List.zip(maxLengths, param);
                      }), (function (param) {
                        return Rebase.List.map((function (param) {
                                      return Rebase.$$String.padEnd(param[1], " ", param[0]);
                                    }), param);
                      })), (function (param) {
                    return Rebase.List.reduce((function (s, c) {
                                  return s + (" " + c);
                                }), "", param);
                  })), rows);
}

function getRepos(param) {
  return Resync.Future.map(repos, Resync.Future.flatMap((function (param) {
                    if (param.TAG === /* Ok */0) {
                      return Curry._1(Refetch__Response.json, param._1);
                    }
                    throw {
                          RE_EXN_ID: FetchError,
                          _1: param._0.reason,
                          Error: new Error()
                        };
                  }), Refetch.get("https://api.github.com/users/reasonml-community/repos")));
}

function printRepos(repos) {
  var headers = columnify(Rebase.List.map((function (repo) {
              return {
                      hd: repo.name,
                      tl: {
                        hd: Rebase.$$Option.getOr("N/A", repo.description),
                        tl: /* [] */0
                      }
                    };
            }), repos));
  var stats = columnify(Rebase.List.map((function (repo) {
              return {
                      hd: String(repo.stars),
                      tl: {
                        hd: "stars   ",
                        tl: {
                          hd: String(repo.forks),
                          tl: {
                            hd: "forks   ",
                            tl: {
                              hd: String(repo.openIssues),
                              tl: {
                                hd: "open issues",
                                tl: /* [] */0
                              }
                            }
                          }
                        }
                      }
                    };
            }), repos));
  return Rebase.List.forEach((function (param) {
                console.log(param[0]);
                console.log(param[1]);
                console.log("");
                
              }), Rebase.List.zip(headers, stats));
}

Resync.Future.whenCompleted((function (repos) {
        if (repos.TAG === /* Ok */0) {
          return printRepos(repos._0);
        }
        console.log("An error occurred: " + repos._0);
        
      }), getRepos(undefined));

var Utils;

exports.Utils = Utils;
exports.FetchError = FetchError;
exports.Decode = Decode;
exports.columnify = columnify;
exports.getRepos = getRepos;
exports.printRepos = printRepos;
/*  Not a pure module */
