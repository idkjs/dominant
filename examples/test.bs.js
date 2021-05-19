'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Resync = require("refetch/src/Resync.bs.js");
var Refetch = require("refetch/src/Refetch.bs.js");
var Refetch__Request = require("refetch/src/Refetch__Request.bs.js");
var Refetch__Response = require("refetch/src/Refetch__Response.bs.js");

require('isomorphic-fetch')
;

const debugHttp = require('debug-http');
  debugHttp();
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
                  NAME: "Multipart",
                  VAL: [
                    "booboo",
                    {
                      hd: [
                        {
                          hd: {
                            NAME: "ContentType",
                            VAL: "plain/text"
                          },
                          tl: {
                            hd: {
                              NAME: "ContentDisposition",
                              VAL: [
                                {
                                  NAME: "Other",
                                  VAL: "form-data"
                                },
                                {
                                  hd: {
                                    NAME: "Other",
                                    VAL: [
                                      "name",
                                      "field1"
                                    ]
                                  },
                                  tl: {
                                    hd: {
                                      NAME: "Filename",
                                      VAL: "myimage.png"
                                    },
                                    tl: /* [] */0
                                  }
                                }
                              ]
                            },
                            tl: /* [] */0
                          }
                        },
                        {
                          NAME: "String",
                          VAL: "foo"
                        }
                      ],
                      tl: {
                        hd: [
                          {
                            hd: {
                              NAME: "ContentType",
                              VAL: "application/json"
                            },
                            tl: {
                              hd: {
                                NAME: "ContentDisposition",
                                VAL: [
                                  {
                                    NAME: "Other",
                                    VAL: "form-data"
                                  },
                                  {
                                    hd: {
                                      NAME: "Other",
                                      VAL: [
                                        "name",
                                        "field1"
                                      ]
                                    },
                                    tl: /* [] */0
                                  }
                                ]
                              },
                              tl: /* [] */0
                            }
                          },
                          {
                            NAME: "Json",
                            VAL: null
                          }
                        ],
                        tl: /* [] */0
                      }
                    }
                  ]
                }, Refetch.request("POST", undefined, undefined, undefined, "https://requestb.in/183okup1")))));

/*  Not a pure module */
