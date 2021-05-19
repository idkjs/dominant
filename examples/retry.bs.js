'use strict';

var Resync = require("refetch/src/Resync.bs.js");
var Refetch = require("refetch/src/Refetch.bs.js");

require('isomorphic-fetch')
;

function retryGet(n) {
  if (n !== 0) {
    return Resync.Future.flatMap((function (param) {
                  if (param.TAG === /* Ok */0) {
                    return Resync.Future.from("Wat!? It worked?");
                  }
                  console.log("Uh, oh, an error occurred. Retrying...");
                  return retryGet(n - 1 | 0);
                }), Refetch.get("https://httpbin.org/status/400"));
  } else {
    return Resync.Future.from("rety failed");
  }
}

Resync.Future.whenResolved((function (prim) {
        console.log(prim);
        
      }), retryGet(3));

exports.retryGet = retryGet;
/*  Not a pure module */
