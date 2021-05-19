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
                  NAME: "String",
                  VAL: "title=foobar&body=bar&userId=1"
                }, Refetch__Request.header({
                      NAME: "ContentType",
                      VAL: "application/x-www-form-urlencoded; charset=UTF-8"
                    }, Refetch.request("POST", undefined, undefined, undefined, "https://httpbin.org/post"))))));

Resync.Future.whenResolved((function (prim) {
        console.log(prim);
        
      }), Resync.Future.flatMap((function (param) {
            if (param.TAG === /* Ok */0) {
              return Curry._1(Refetch__Response.text, param._1);
            } else {
              return Resync.Future.from(param._0.reason);
            }
          }), Refetch.$$fetch(Refetch.request("POST", undefined, {
                  hd: {
                    NAME: "ContentType",
                    VAL: "application/x-www-form-urlencoded; charset=UTF-8"
                  },
                  tl: /* [] */0
                }, {
                  NAME: "String",
                  VAL: "title=foobar&body=bar&userId=1"
                }, "https://httpbin.org/post"))));

/*  Not a pure module */
