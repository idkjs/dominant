'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Resync = require("refetch/src/Resync.bs.js");
var Refetch = require("refetch/src/Refetch.bs.js");
var Refetch__Response = require("refetch/src/Refetch__Response.bs.js");

require('isomorphic-fetch')
;

Resync.Future.whenResolved((function (prim) {
        console.log(prim);
        
      }), Resync.Future.flatMap((function (param) {
            if (param.TAG === /* Ok */0) {
              return Curry._1(Refetch__Response.text, param._1);
            } else {
              return Resync.Future.from("oops!");
            }
          }), Refetch.get("http://httpbin.org/get")));

/*  Not a pure module */
