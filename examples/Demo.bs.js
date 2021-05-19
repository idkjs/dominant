'use strict';

var Got = require("got");
var Dominant$Dominant = require("../src/Dominant.bs.js");

console.log(Promise.resolve("http://httpbin.org/"));

console.log("http://httpbin.org/");

var getPerson = Got("https://swapi.co/api/people/1", {
        responseType: "json"
      }).then(function (response) {
      return Promise.resolve(response.body);
    });

Promise.resolve(getPerson).then(function (response) {
      return Promise.resolve((console.log(response), undefined));
    });

var dominantColors = Dominant$Dominant.ofUrl("http://httpbin.org/", undefined, undefined);

dominantColors.then(function (value) {
      return Promise.resolve((console.log(value), undefined));
    });

exports.getPerson = getPerson;
exports.dominantColors = dominantColors;
/*  Not a pure module */
