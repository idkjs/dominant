'use strict';

var Post$Dominant = require("./post.bs.js");
var Test$Dominant = require("./test.bs.js");
var Retry$Dominant = require("./retry.bs.js");
var Github$Dominant = require("./github.bs.js");
var Post_form$Dominant = require("./post_form.bs.js");
var Post_multipart$Dominant = require("./post_multipart.bs.js");

var Utils = Github$Dominant.Utils;

var FetchError = Github$Dominant.FetchError;

var Decode = Github$Dominant.Decode;

var columnify = Github$Dominant.columnify;

var getRepos = Github$Dominant.getRepos;

var printRepos = Github$Dominant.printRepos;

var retryGet = Retry$Dominant.retryGet;

exports.Utils = Utils;
exports.FetchError = FetchError;
exports.Decode = Decode;
exports.columnify = columnify;
exports.getRepos = getRepos;
exports.printRepos = printRepos;
exports.retryGet = retryGet;
/* Post-Dominant Not a pure module */
