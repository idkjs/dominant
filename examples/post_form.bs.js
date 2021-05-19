'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Resync = require("refetch/src/Resync.bs.js");
var Refetch = require("refetch/src/Refetch.bs.js");
var Refetch__Request = require("refetch/src/Refetch__Request.bs.js");
var Refetch__Response = require("refetch/src/Refetch__Response.bs.js");

require('isomorphic-fetch')
;

Resync.Future.whenResolved((function (prim) {
        console.log(prim);
        
      }), Resync.Future.flatMap((function (param) {
            if (param.TAG === /* Ok */0) {
              return Curry._1(Refetch__Response.text, param._1);
            } else {
              return Resync.Future.from(param._0.reason);
            }
          }), Refetch.$$fetch(Refetch__Request.payload({
                  NAME: "Form",
                  VAL: {
                    hd: [
                      "foo",
                      "boo"
                    ],
                    tl: {
                      hd: [
                        "bar",
                        "far"
                      ],
                      tl: /* [] */0
                    }
                  }
                }, Refetch.request("POST", undefined, undefined, undefined, "http://httpbin.org/post")))));

/*  Not a pure module */
