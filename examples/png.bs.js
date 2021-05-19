'use strict';

var Resync = require("refetch/src/Resync.bs.js");
var Refetch = require("refetch/src/Refetch.bs.js");
var Pervasives = require("bs-platform/lib/js/pervasives.js");
var ConsolePng = require("console-png");
var StreamToBuffer = require("stream-to-buffer");
var Refetch__Response = require("refetch/src/Refetch__Response.bs.js");

require('isomorphic-fetch')
;

Resync.Future.whenCompleted((function (stream) {
        if (stream.TAG === /* Ok */0) {
          StreamToBuffer(stream._0, (function (param, buffer) {
                  ConsolePng(buffer, (function (param, string) {
                          console.log(string);
                          
                        }));
                  
                }));
          return ;
        }
        console.log(stream._0);
        
      }), Resync.Future.map((function (param) {
            if (param.TAG === /* Ok */0) {
              return Refetch__Response.body(param._1);
            } else {
              return Pervasives.failwith(param._0.reason);
            }
          }), Refetch.get("http://httpbin.org/image/png")));

/*  Not a pure module */
