

import * as Curry from "bs-platform/lib/es6/curry.js";

var $$Image = {};

var $$Element = {};

var $$Document = {};

var $$ImageData = {};

var CanvasContext = {};

var Canvas = {};

function onLoad(callback) {
  return function () {
    var img = this ;
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    canvas.setAttribute("width", img.width.toString());
    canvas.setAttribute("height", img.height.toString());
    context.drawImage(img, 0.0, 0.0);
    return Curry._1(callback, context.getImageData(0.0, 0.0, 0.0, 0.0));
  };
}

function imageDataOfUrl(url) {
  var img = new window.Image();
  return new Promise((function (resolve, param) {
                img.onload = onLoad(function (result) {
                      return resolve(result);
                    });
                img.src = url;
                
              }));
}

export {
  $$Image ,
  $$Element ,
  $$Document ,
  $$ImageData ,
  CanvasContext ,
  Canvas ,
  onLoad ,
  imageDataOfUrl ,
  
}
/* No side effect */
