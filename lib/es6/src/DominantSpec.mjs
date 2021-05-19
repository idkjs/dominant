

import * as Jest from "@glennsl/bs-jest/lib/es6/src/jest.mjs";
import * as Dominant$Dominant from "./Dominant.mjs";

Jest.describe("Pixel.ofCharArray", (function (param) {
        Jest.test("an empty array should return an empty list", (function (param) {
                return Jest.ExpectJs.toEqual([], Jest.ExpectJs.expect(Dominant$Dominant.ofFloatArray([])));
              }));
        Jest.test("a partial array should return an empty list", (function (param) {
                return Jest.ExpectJs.toEqual([], Jest.ExpectJs.expect(Dominant$Dominant.ofFloatArray([1])));
              }));
        Jest.test("a 4 char array should return a unique pixel list", (function (param) {
                return Jest.Expect.toEqual([Dominant$Dominant.ofColor(1, 1, 1, 1)], Jest.Expect.expect(Dominant$Dominant.ofFloatArray([
                                    1,
                                    1,
                                    1,
                                    1
                                  ])));
              }));
        Jest.test("a 5 char array should return a unique pixel list", (function (param) {
                return Jest.Expect.toEqual([Dominant$Dominant.ofColor(1, 1, 1, 1)], Jest.Expect.expect(Dominant$Dominant.ofFloatArray([
                                    1,
                                    1,
                                    1,
                                    1,
                                    1
                                  ])));
              }));
        return Jest.test("a 8 char array should return a 2 pixel list", (function (param) {
                      return Jest.Expect.toEqual([
                                  Dominant$Dominant.ofColor(1, 1, 1, 1),
                                  Dominant$Dominant.ofColor(1, 1, 1, 1)
                                ], Jest.Expect.expect(Dominant$Dominant.ofFloatArray([
                                          1,
                                          1,
                                          1,
                                          1,
                                          1,
                                          1,
                                          1,
                                          1,
                                          1
                                        ])));
                    }));
      }));

Jest.describe("Pixel.bucket", (function (param) {
        return Jest.test("return main colors", (function (param) {
                      var pixelA = Dominant$Dominant.ofColor(50, 50, 50, 1);
                      var pixelB = Dominant$Dominant.ofColor(40, 40, 40, 1);
                      var pixelC = Dominant$Dominant.ofColor(80, 80, 50, 1);
                      var pixelD = Dominant$Dominant.ofColor(148, 148, 148, 1);
                      var pixelArray = [
                        pixelA,
                        pixelB,
                        pixelC,
                        pixelD
                      ];
                      return Jest.Expect.toEqual([
                                  Dominant$Dominant.ofColor(45.27692569068709, 45.27692569068709, 45.27692569068709, 1),
                                  Dominant$Dominant.ofColor(118.96217886370441, 118.96217886370441, 110.46266337545913, 1)
                                ], Jest.Expect.expect(Dominant$Dominant.paletteOfPixelArray(pixelArray, 1, undefined)));
                    }));
      }));

export {
  
}
/*  Not a pure module */
