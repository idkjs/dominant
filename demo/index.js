(() => {
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // node_modules/bs-platform/lib/js/caml_array.js
  var require_caml_array = __commonJS({
    "node_modules/bs-platform/lib/js/caml_array.js"(exports) {
      "use strict";
      function caml_array_sub(x, offset, len2) {
        var result = new Array(len2);
        var j = 0;
        var i = offset;
        while (j < len2) {
          result[j] = x[i];
          j = j + 1 | 0;
          i = i + 1 | 0;
        }
        ;
        return result;
      }
      function len(_acc, _l) {
        while (true) {
          var l = _l;
          var acc = _acc;
          if (!l) {
            return acc;
          }
          _l = l.tl;
          _acc = l.hd.length + acc | 0;
          continue;
        }
        ;
      }
      function fill(arr, _i, _l) {
        while (true) {
          var l = _l;
          var i = _i;
          if (!l) {
            return;
          }
          var x = l.hd;
          var l$1 = x.length;
          var k = i;
          var j = 0;
          while (j < l$1) {
            arr[k] = x[j];
            k = k + 1 | 0;
            j = j + 1 | 0;
          }
          ;
          _l = l.tl;
          _i = k;
          continue;
        }
        ;
      }
      function caml_array_concat(l) {
        var v = len(0, l);
        var result = new Array(v);
        fill(result, 0, l);
        return result;
      }
      function set(xs, index, newval) {
        if (index < 0 || index >= xs.length) {
          throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "index out of bounds",
            Error: new Error()
          };
        }
        xs[index] = newval;
      }
      function get(xs, index) {
        if (index < 0 || index >= xs.length) {
          throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "index out of bounds",
            Error: new Error()
          };
        }
        return xs[index];
      }
      function caml_make_vect(len2, init) {
        var b = new Array(len2);
        for (var i = 0; i < len2; ++i) {
          b[i] = init;
        }
        return b;
      }
      function caml_make_float_vect(len2) {
        var b = new Array(len2);
        for (var i = 0; i < len2; ++i) {
          b[i] = 0;
        }
        return b;
      }
      function caml_array_blit(a1, i1, a2, i2, len2) {
        if (i2 <= i1) {
          for (var j = 0; j < len2; ++j) {
            a2[j + i2 | 0] = a1[j + i1 | 0];
          }
          return;
        }
        for (var j$1 = len2 - 1 | 0; j$1 >= 0; --j$1) {
          a2[j$1 + i2 | 0] = a1[j$1 + i1 | 0];
        }
      }
      function caml_array_dup(prim) {
        return prim.slice(0);
      }
      exports.caml_array_dup = caml_array_dup;
      exports.caml_array_sub = caml_array_sub;
      exports.caml_array_concat = caml_array_concat;
      exports.caml_make_vect = caml_make_vect;
      exports.caml_make_float_vect = caml_make_float_vect;
      exports.caml_array_blit = caml_array_blit;
      exports.get = get;
      exports.set = set;
    }
  });

  // node_modules/bs-platform/lib/js/curry.js
  var require_curry = __commonJS({
    "node_modules/bs-platform/lib/js/curry.js"(exports) {
      "use strict";
      var Caml_array = require_caml_array();
      function app(_f, _args) {
        while (true) {
          var args = _args;
          var f = _f;
          var init_arity = f.length;
          var arity = init_arity === 0 ? 1 : init_arity;
          var len = args.length;
          var d = arity - len | 0;
          if (d === 0) {
            return f.apply(null, args);
          }
          if (d >= 0) {
            return function(f2, args2) {
              return function(x) {
                return app(f2, args2.concat([x]));
              };
            }(f, args);
          }
          _args = Caml_array.caml_array_sub(args, arity, -d | 0);
          _f = f.apply(null, Caml_array.caml_array_sub(args, 0, arity));
          continue;
        }
        ;
      }
      function _1(o, a0) {
        var arity = o.length;
        if (arity === 1) {
          return o(a0);
        } else {
          switch (arity) {
            case 1:
              return o(a0);
            case 2:
              return function(param) {
                return o(a0, param);
              };
            case 3:
              return function(param, param$1) {
                return o(a0, param, param$1);
              };
            case 4:
              return function(param, param$1, param$2) {
                return o(a0, param, param$1, param$2);
              };
            case 5:
              return function(param, param$1, param$2, param$3) {
                return o(a0, param, param$1, param$2, param$3);
              };
            case 6:
              return function(param, param$1, param$2, param$3, param$4) {
                return o(a0, param, param$1, param$2, param$3, param$4);
              };
            case 7:
              return function(param, param$1, param$2, param$3, param$4, param$5) {
                return o(a0, param, param$1, param$2, param$3, param$4, param$5);
              };
            default:
              return app(o, [a0]);
          }
        }
      }
      function __1(o) {
        var arity = o.length;
        if (arity === 1) {
          return o;
        } else {
          return function(a0) {
            return _1(o, a0);
          };
        }
      }
      function _2(o, a0, a1) {
        var arity = o.length;
        if (arity === 2) {
          return o(a0, a1);
        } else {
          switch (arity) {
            case 1:
              return app(o(a0), [a1]);
            case 2:
              return o(a0, a1);
            case 3:
              return function(param) {
                return o(a0, a1, param);
              };
            case 4:
              return function(param, param$1) {
                return o(a0, a1, param, param$1);
              };
            case 5:
              return function(param, param$1, param$2) {
                return o(a0, a1, param, param$1, param$2);
              };
            case 6:
              return function(param, param$1, param$2, param$3) {
                return o(a0, a1, param, param$1, param$2, param$3);
              };
            case 7:
              return function(param, param$1, param$2, param$3, param$4) {
                return o(a0, a1, param, param$1, param$2, param$3, param$4);
              };
            default:
              return app(o, [
                a0,
                a1
              ]);
          }
        }
      }
      function __2(o) {
        var arity = o.length;
        if (arity === 2) {
          return o;
        } else {
          return function(a0, a1) {
            return _2(o, a0, a1);
          };
        }
      }
      function _3(o, a0, a1, a2) {
        var arity = o.length;
        if (arity === 3) {
          return o(a0, a1, a2);
        } else {
          switch (arity) {
            case 1:
              return app(o(a0), [
                a1,
                a2
              ]);
            case 2:
              return app(o(a0, a1), [a2]);
            case 3:
              return o(a0, a1, a2);
            case 4:
              return function(param) {
                return o(a0, a1, a2, param);
              };
            case 5:
              return function(param, param$1) {
                return o(a0, a1, a2, param, param$1);
              };
            case 6:
              return function(param, param$1, param$2) {
                return o(a0, a1, a2, param, param$1, param$2);
              };
            case 7:
              return function(param, param$1, param$2, param$3) {
                return o(a0, a1, a2, param, param$1, param$2, param$3);
              };
            default:
              return app(o, [
                a0,
                a1,
                a2
              ]);
          }
        }
      }
      function __3(o) {
        var arity = o.length;
        if (arity === 3) {
          return o;
        } else {
          return function(a0, a1, a2) {
            return _3(o, a0, a1, a2);
          };
        }
      }
      function _4(o, a0, a1, a2, a3) {
        var arity = o.length;
        if (arity === 4) {
          return o(a0, a1, a2, a3);
        } else {
          switch (arity) {
            case 1:
              return app(o(a0), [
                a1,
                a2,
                a3
              ]);
            case 2:
              return app(o(a0, a1), [
                a2,
                a3
              ]);
            case 3:
              return app(o(a0, a1, a2), [a3]);
            case 4:
              return o(a0, a1, a2, a3);
            case 5:
              return function(param) {
                return o(a0, a1, a2, a3, param);
              };
            case 6:
              return function(param, param$1) {
                return o(a0, a1, a2, a3, param, param$1);
              };
            case 7:
              return function(param, param$1, param$2) {
                return o(a0, a1, a2, a3, param, param$1, param$2);
              };
            default:
              return app(o, [
                a0,
                a1,
                a2,
                a3
              ]);
          }
        }
      }
      function __4(o) {
        var arity = o.length;
        if (arity === 4) {
          return o;
        } else {
          return function(a0, a1, a2, a3) {
            return _4(o, a0, a1, a2, a3);
          };
        }
      }
      function _5(o, a0, a1, a2, a3, a4) {
        var arity = o.length;
        if (arity === 5) {
          return o(a0, a1, a2, a3, a4);
        } else {
          switch (arity) {
            case 1:
              return app(o(a0), [
                a1,
                a2,
                a3,
                a4
              ]);
            case 2:
              return app(o(a0, a1), [
                a2,
                a3,
                a4
              ]);
            case 3:
              return app(o(a0, a1, a2), [
                a3,
                a4
              ]);
            case 4:
              return app(o(a0, a1, a2, a3), [a4]);
            case 5:
              return o(a0, a1, a2, a3, a4);
            case 6:
              return function(param) {
                return o(a0, a1, a2, a3, a4, param);
              };
            case 7:
              return function(param, param$1) {
                return o(a0, a1, a2, a3, a4, param, param$1);
              };
            default:
              return app(o, [
                a0,
                a1,
                a2,
                a3,
                a4
              ]);
          }
        }
      }
      function __5(o) {
        var arity = o.length;
        if (arity === 5) {
          return o;
        } else {
          return function(a0, a1, a2, a3, a4) {
            return _5(o, a0, a1, a2, a3, a4);
          };
        }
      }
      function _6(o, a0, a1, a2, a3, a4, a5) {
        var arity = o.length;
        if (arity === 6) {
          return o(a0, a1, a2, a3, a4, a5);
        } else {
          switch (arity) {
            case 1:
              return app(o(a0), [
                a1,
                a2,
                a3,
                a4,
                a5
              ]);
            case 2:
              return app(o(a0, a1), [
                a2,
                a3,
                a4,
                a5
              ]);
            case 3:
              return app(o(a0, a1, a2), [
                a3,
                a4,
                a5
              ]);
            case 4:
              return app(o(a0, a1, a2, a3), [
                a4,
                a5
              ]);
            case 5:
              return app(o(a0, a1, a2, a3, a4), [a5]);
            case 6:
              return o(a0, a1, a2, a3, a4, a5);
            case 7:
              return function(param) {
                return o(a0, a1, a2, a3, a4, a5, param);
              };
            default:
              return app(o, [
                a0,
                a1,
                a2,
                a3,
                a4,
                a5
              ]);
          }
        }
      }
      function __6(o) {
        var arity = o.length;
        if (arity === 6) {
          return o;
        } else {
          return function(a0, a1, a2, a3, a4, a5) {
            return _6(o, a0, a1, a2, a3, a4, a5);
          };
        }
      }
      function _7(o, a0, a1, a2, a3, a4, a5, a6) {
        var arity = o.length;
        if (arity === 7) {
          return o(a0, a1, a2, a3, a4, a5, a6);
        } else {
          switch (arity) {
            case 1:
              return app(o(a0), [
                a1,
                a2,
                a3,
                a4,
                a5,
                a6
              ]);
            case 2:
              return app(o(a0, a1), [
                a2,
                a3,
                a4,
                a5,
                a6
              ]);
            case 3:
              return app(o(a0, a1, a2), [
                a3,
                a4,
                a5,
                a6
              ]);
            case 4:
              return app(o(a0, a1, a2, a3), [
                a4,
                a5,
                a6
              ]);
            case 5:
              return app(o(a0, a1, a2, a3, a4), [
                a5,
                a6
              ]);
            case 6:
              return app(o(a0, a1, a2, a3, a4, a5), [a6]);
            case 7:
              return o(a0, a1, a2, a3, a4, a5, a6);
            default:
              return app(o, [
                a0,
                a1,
                a2,
                a3,
                a4,
                a5,
                a6
              ]);
          }
        }
      }
      function __7(o) {
        var arity = o.length;
        if (arity === 7) {
          return o;
        } else {
          return function(a0, a1, a2, a3, a4, a5, a6) {
            return _7(o, a0, a1, a2, a3, a4, a5, a6);
          };
        }
      }
      function _8(o, a0, a1, a2, a3, a4, a5, a6, a7) {
        var arity = o.length;
        if (arity === 8) {
          return o(a0, a1, a2, a3, a4, a5, a6, a7);
        } else {
          switch (arity) {
            case 1:
              return app(o(a0), [
                a1,
                a2,
                a3,
                a4,
                a5,
                a6,
                a7
              ]);
            case 2:
              return app(o(a0, a1), [
                a2,
                a3,
                a4,
                a5,
                a6,
                a7
              ]);
            case 3:
              return app(o(a0, a1, a2), [
                a3,
                a4,
                a5,
                a6,
                a7
              ]);
            case 4:
              return app(o(a0, a1, a2, a3), [
                a4,
                a5,
                a6,
                a7
              ]);
            case 5:
              return app(o(a0, a1, a2, a3, a4), [
                a5,
                a6,
                a7
              ]);
            case 6:
              return app(o(a0, a1, a2, a3, a4, a5), [
                a6,
                a7
              ]);
            case 7:
              return app(o(a0, a1, a2, a3, a4, a5, a6), [a7]);
            default:
              return app(o, [
                a0,
                a1,
                a2,
                a3,
                a4,
                a5,
                a6,
                a7
              ]);
          }
        }
      }
      function __8(o) {
        var arity = o.length;
        if (arity === 8) {
          return o;
        } else {
          return function(a0, a1, a2, a3, a4, a5, a6, a7) {
            return _8(o, a0, a1, a2, a3, a4, a5, a6, a7);
          };
        }
      }
      exports.app = app;
      exports._1 = _1;
      exports.__1 = __1;
      exports._2 = _2;
      exports.__2 = __2;
      exports._3 = _3;
      exports.__3 = __3;
      exports._4 = _4;
      exports.__4 = __4;
      exports._5 = _5;
      exports.__5 = __5;
      exports._6 = _6;
      exports.__6 = __6;
      exports._7 = _7;
      exports.__7 = __7;
      exports._8 = _8;
      exports.__8 = __8;
    }
  });

  // node_modules/bs-platform/lib/js/caml_primitive.js
  var require_caml_primitive = __commonJS({
    "node_modules/bs-platform/lib/js/caml_primitive.js"(exports) {
      "use strict";
      function caml_int_compare(x, y) {
        if (x < y) {
          return -1;
        } else if (x === y) {
          return 0;
        } else {
          return 1;
        }
      }
      function caml_bool_compare(x, y) {
        if (x) {
          if (y) {
            return 0;
          } else {
            return 1;
          }
        } else if (y) {
          return -1;
        } else {
          return 0;
        }
      }
      function caml_float_compare(x, y) {
        if (x === y) {
          return 0;
        } else if (x < y) {
          return -1;
        } else if (x > y || x === x) {
          return 1;
        } else if (y === y) {
          return -1;
        } else {
          return 0;
        }
      }
      function caml_string_compare(s1, s2) {
        if (s1 === s2) {
          return 0;
        } else if (s1 < s2) {
          return -1;
        } else {
          return 1;
        }
      }
      function caml_bool_min(x, y) {
        if (x) {
          return y;
        } else {
          return x;
        }
      }
      function caml_int_min(x, y) {
        if (x < y) {
          return x;
        } else {
          return y;
        }
      }
      function caml_float_min(x, y) {
        if (x < y) {
          return x;
        } else {
          return y;
        }
      }
      function caml_string_min(x, y) {
        if (x < y) {
          return x;
        } else {
          return y;
        }
      }
      function caml_int32_min(x, y) {
        if (x < y) {
          return x;
        } else {
          return y;
        }
      }
      function caml_bool_max(x, y) {
        if (x) {
          return x;
        } else {
          return y;
        }
      }
      function caml_int_max(x, y) {
        if (x > y) {
          return x;
        } else {
          return y;
        }
      }
      function caml_float_max(x, y) {
        if (x > y) {
          return x;
        } else {
          return y;
        }
      }
      function caml_string_max(x, y) {
        if (x > y) {
          return x;
        } else {
          return y;
        }
      }
      function caml_int32_max(x, y) {
        if (x > y) {
          return x;
        } else {
          return y;
        }
      }
      var caml_int32_compare = caml_int_compare;
      exports.caml_int_compare = caml_int_compare;
      exports.caml_bool_compare = caml_bool_compare;
      exports.caml_float_compare = caml_float_compare;
      exports.caml_string_compare = caml_string_compare;
      exports.caml_int32_compare = caml_int32_compare;
      exports.caml_bool_min = caml_bool_min;
      exports.caml_int_min = caml_int_min;
      exports.caml_float_min = caml_float_min;
      exports.caml_string_min = caml_string_min;
      exports.caml_int32_min = caml_int32_min;
      exports.caml_bool_max = caml_bool_max;
      exports.caml_int_max = caml_int_max;
      exports.caml_float_max = caml_float_max;
      exports.caml_string_max = caml_string_max;
      exports.caml_int32_max = caml_int32_max;
    }
  });

  // node_modules/bs-platform/lib/js/caml_obj.js
  var require_caml_obj = __commonJS({
    "node_modules/bs-platform/lib/js/caml_obj.js"(exports) {
      "use strict";
      var Caml_primitive = require_caml_primitive();
      var for_in = function(o, foo) {
        for (var x in o) {
          foo(x);
        }
      };
      var caml_obj_dup = function(x) {
        if (Array.isArray(x)) {
          var len = x.length;
          var v = new Array(len);
          for (var i = 0; i < len; ++i) {
            v[i] = x[i];
          }
          if (x.TAG !== void 0) {
            v.TAG = x.TAG;
          }
          return v;
        }
        return Object.assign({}, x);
      };
      var update_dummy = function(x, y) {
        var k;
        if (Array.isArray(y)) {
          for (k = 0; k < y.length; ++k) {
            x[k] = y[k];
          }
          if (y.TAG !== void 0) {
            x.TAG = y.TAG;
          }
        } else {
          for (var k in y) {
            x[k] = y[k];
          }
        }
      };
      function caml_compare(a, b) {
        if (a === b) {
          return 0;
        }
        var a_type = typeof a;
        var b_type = typeof b;
        switch (a_type) {
          case "boolean":
            if (b_type === "boolean") {
              return Caml_primitive.caml_bool_compare(a, b);
            }
            break;
          case "function":
            if (b_type === "function") {
              throw {
                RE_EXN_ID: "Invalid_argument",
                _1: "compare: functional value",
                Error: new Error()
              };
            }
            break;
          case "number":
            if (b_type === "number") {
              return Caml_primitive.caml_int_compare(a, b);
            }
            break;
          case "string":
            if (b_type === "string") {
              return Caml_primitive.caml_string_compare(a, b);
            } else {
              return 1;
            }
          case "undefined":
            return -1;
          default:
        }
        switch (b_type) {
          case "string":
            return -1;
          case "undefined":
            return 1;
          default:
            if (a_type === "boolean") {
              return 1;
            }
            if (b_type === "boolean") {
              return -1;
            }
            if (a_type === "function") {
              return 1;
            }
            if (b_type === "function") {
              return -1;
            }
            if (a_type === "number") {
              if (b === null || b.BS_PRIVATE_NESTED_SOME_NONE !== void 0) {
                return 1;
              } else {
                return -1;
              }
            }
            if (b_type === "number") {
              if (a === null || a.BS_PRIVATE_NESTED_SOME_NONE !== void 0) {
                return -1;
              } else {
                return 1;
              }
            }
            if (a === null) {
              if (b.BS_PRIVATE_NESTED_SOME_NONE !== void 0) {
                return 1;
              } else {
                return -1;
              }
            }
            if (b === null) {
              if (a.BS_PRIVATE_NESTED_SOME_NONE !== void 0) {
                return -1;
              } else {
                return 1;
              }
            }
            if (a.BS_PRIVATE_NESTED_SOME_NONE !== void 0) {
              if (b.BS_PRIVATE_NESTED_SOME_NONE !== void 0) {
                return aux_obj_compare(a, b);
              } else {
                return -1;
              }
            }
            var tag_a = a.TAG | 0;
            var tag_b = b.TAG | 0;
            if (tag_a === 248) {
              return Caml_primitive.caml_int_compare(a[1], b[1]);
            }
            if (tag_a === 251) {
              throw {
                RE_EXN_ID: "Invalid_argument",
                _1: "equal: abstract value",
                Error: new Error()
              };
            }
            if (tag_a !== tag_b) {
              if (tag_a < tag_b) {
                return -1;
              } else {
                return 1;
              }
            }
            var len_a = a.length | 0;
            var len_b = b.length | 0;
            if (len_a === len_b) {
              if (Array.isArray(a)) {
                var _i = 0;
                while (true) {
                  var i = _i;
                  if (i === len_a) {
                    return 0;
                  }
                  var res = caml_compare(a[i], b[i]);
                  if (res !== 0) {
                    return res;
                  }
                  _i = i + 1 | 0;
                  continue;
                }
                ;
              } else if (a instanceof Date && b instanceof Date) {
                return a - b;
              } else {
                return aux_obj_compare(a, b);
              }
            } else if (len_a < len_b) {
              var _i$1 = 0;
              while (true) {
                var i$1 = _i$1;
                if (i$1 === len_a) {
                  return -1;
                }
                var res$1 = caml_compare(a[i$1], b[i$1]);
                if (res$1 !== 0) {
                  return res$1;
                }
                _i$1 = i$1 + 1 | 0;
                continue;
              }
              ;
            } else {
              var _i$2 = 0;
              while (true) {
                var i$2 = _i$2;
                if (i$2 === len_b) {
                  return 1;
                }
                var res$2 = caml_compare(a[i$2], b[i$2]);
                if (res$2 !== 0) {
                  return res$2;
                }
                _i$2 = i$2 + 1 | 0;
                continue;
              }
              ;
            }
        }
      }
      function aux_obj_compare(a, b) {
        var min_key_lhs = {
          contents: void 0
        };
        var min_key_rhs = {
          contents: void 0
        };
        var do_key = function(param, key) {
          var min_key = param[2];
          var b2 = param[1];
          if (!(!b2.hasOwnProperty(key) || caml_compare(param[0][key], b2[key]) > 0)) {
            return;
          }
          var mk = min_key.contents;
          if (mk !== void 0 && key >= mk) {
            return;
          } else {
            min_key.contents = key;
            return;
          }
        };
        var partial_arg = [
          a,
          b,
          min_key_rhs
        ];
        var do_key_a = function(param) {
          return do_key(partial_arg, param);
        };
        var partial_arg$1 = [
          b,
          a,
          min_key_lhs
        ];
        var do_key_b = function(param) {
          return do_key(partial_arg$1, param);
        };
        for_in(a, do_key_a);
        for_in(b, do_key_b);
        var match = min_key_lhs.contents;
        var match$1 = min_key_rhs.contents;
        if (match !== void 0) {
          if (match$1 !== void 0) {
            return Caml_primitive.caml_string_compare(match, match$1);
          } else {
            return -1;
          }
        } else if (match$1 !== void 0) {
          return 1;
        } else {
          return 0;
        }
      }
      function caml_equal(a, b) {
        if (a === b) {
          return true;
        }
        var a_type = typeof a;
        if (a_type === "string" || a_type === "number" || a_type === "boolean" || a_type === "undefined" || a === null) {
          return false;
        }
        var b_type = typeof b;
        if (a_type === "function" || b_type === "function") {
          throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "equal: functional value",
            Error: new Error()
          };
        }
        if (b_type === "number" || b_type === "undefined" || b === null) {
          return false;
        }
        var tag_a = a.TAG | 0;
        var tag_b = b.TAG | 0;
        if (tag_a === 248) {
          return a[1] === b[1];
        }
        if (tag_a === 251) {
          throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "equal: abstract value",
            Error: new Error()
          };
        }
        if (tag_a !== tag_b) {
          return false;
        }
        var len_a = a.length | 0;
        var len_b = b.length | 0;
        if (len_a === len_b) {
          if (Array.isArray(a)) {
            var _i = 0;
            while (true) {
              var i = _i;
              if (i === len_a) {
                return true;
              }
              if (!caml_equal(a[i], b[i])) {
                return false;
              }
              _i = i + 1 | 0;
              continue;
            }
            ;
          } else if (a instanceof Date && b instanceof Date) {
            return !(a > b || a < b);
          } else {
            var result = {
              contents: true
            };
            var do_key_a = function(key) {
              if (!b.hasOwnProperty(key)) {
                result.contents = false;
                return;
              }
            };
            var do_key_b = function(key) {
              if (!a.hasOwnProperty(key) || !caml_equal(b[key], a[key])) {
                result.contents = false;
                return;
              }
            };
            for_in(a, do_key_a);
            if (result.contents) {
              for_in(b, do_key_b);
            }
            return result.contents;
          }
        } else {
          return false;
        }
      }
      function caml_equal_null(x, y) {
        if (y !== null) {
          return caml_equal(x, y);
        } else {
          return x === y;
        }
      }
      function caml_equal_undefined(x, y) {
        if (y !== void 0) {
          return caml_equal(x, y);
        } else {
          return x === y;
        }
      }
      function caml_equal_nullable(x, y) {
        if (y == null) {
          return x === y;
        } else {
          return caml_equal(x, y);
        }
      }
      function caml_notequal(a, b) {
        return !caml_equal(a, b);
      }
      function caml_greaterequal(a, b) {
        return caml_compare(a, b) >= 0;
      }
      function caml_greaterthan(a, b) {
        return caml_compare(a, b) > 0;
      }
      function caml_lessequal(a, b) {
        return caml_compare(a, b) <= 0;
      }
      function caml_lessthan(a, b) {
        return caml_compare(a, b) < 0;
      }
      function caml_min(x, y) {
        if (caml_compare(x, y) <= 0) {
          return x;
        } else {
          return y;
        }
      }
      function caml_max(x, y) {
        if (caml_compare(x, y) >= 0) {
          return x;
        } else {
          return y;
        }
      }
      exports.caml_obj_dup = caml_obj_dup;
      exports.update_dummy = update_dummy;
      exports.caml_compare = caml_compare;
      exports.caml_equal = caml_equal;
      exports.caml_equal_null = caml_equal_null;
      exports.caml_equal_undefined = caml_equal_undefined;
      exports.caml_equal_nullable = caml_equal_nullable;
      exports.caml_notequal = caml_notequal;
      exports.caml_greaterequal = caml_greaterequal;
      exports.caml_greaterthan = caml_greaterthan;
      exports.caml_lessthan = caml_lessthan;
      exports.caml_lessequal = caml_lessequal;
      exports.caml_min = caml_min;
      exports.caml_max = caml_max;
    }
  });

  // node_modules/bs-platform/lib/js/caml_exceptions.js
  var require_caml_exceptions = __commonJS({
    "node_modules/bs-platform/lib/js/caml_exceptions.js"(exports) {
      "use strict";
      var id = {
        contents: 0
      };
      function create(str) {
        id.contents = id.contents + 1 | 0;
        return str + ("/" + id.contents);
      }
      function caml_is_extension(e) {
        if (e == null) {
          return false;
        } else {
          return typeof e.RE_EXN_ID === "string";
        }
      }
      function caml_exn_slot_name(x) {
        return x.RE_EXN_ID;
      }
      exports.id = id;
      exports.create = create;
      exports.caml_is_extension = caml_is_extension;
      exports.caml_exn_slot_name = caml_exn_slot_name;
    }
  });

  // node_modules/bs-platform/lib/js/caml_option.js
  var require_caml_option = __commonJS({
    "node_modules/bs-platform/lib/js/caml_option.js"(exports) {
      "use strict";
      function isNested(x) {
        return x.BS_PRIVATE_NESTED_SOME_NONE !== void 0;
      }
      function some(x) {
        if (x === void 0) {
          return {
            BS_PRIVATE_NESTED_SOME_NONE: 0
          };
        } else if (x !== null && x.BS_PRIVATE_NESTED_SOME_NONE !== void 0) {
          return {
            BS_PRIVATE_NESTED_SOME_NONE: x.BS_PRIVATE_NESTED_SOME_NONE + 1 | 0
          };
        } else {
          return x;
        }
      }
      function nullable_to_opt(x) {
        if (x == null) {
          return;
        } else {
          return some(x);
        }
      }
      function undefined_to_opt(x) {
        if (x === void 0) {
          return;
        } else {
          return some(x);
        }
      }
      function null_to_opt(x) {
        if (x === null) {
          return;
        } else {
          return some(x);
        }
      }
      function valFromOption(x) {
        if (!(x !== null && x.BS_PRIVATE_NESTED_SOME_NONE !== void 0)) {
          return x;
        }
        var depth = x.BS_PRIVATE_NESTED_SOME_NONE;
        if (depth === 0) {
          return;
        } else {
          return {
            BS_PRIVATE_NESTED_SOME_NONE: depth - 1 | 0
          };
        }
      }
      function option_get(x) {
        if (x === void 0) {
          return;
        } else {
          return valFromOption(x);
        }
      }
      function option_unwrap(x) {
        if (x !== void 0) {
          return x.VAL;
        } else {
          return x;
        }
      }
      exports.nullable_to_opt = nullable_to_opt;
      exports.undefined_to_opt = undefined_to_opt;
      exports.null_to_opt = null_to_opt;
      exports.valFromOption = valFromOption;
      exports.some = some;
      exports.isNested = isNested;
      exports.option_get = option_get;
      exports.option_unwrap = option_unwrap;
    }
  });

  // node_modules/bs-platform/lib/js/caml_js_exceptions.js
  var require_caml_js_exceptions = __commonJS({
    "node_modules/bs-platform/lib/js/caml_js_exceptions.js"(exports) {
      "use strict";
      var Caml_option = require_caml_option();
      var Caml_exceptions = require_caml_exceptions();
      var $$Error = /* @__PURE__ */ Caml_exceptions.create("Caml_js_exceptions.Error");
      function internalToOCamlException(e) {
        if (Caml_exceptions.caml_is_extension(e)) {
          return e;
        } else {
          return {
            RE_EXN_ID: $$Error,
            _1: e
          };
        }
      }
      function caml_as_js_exn(exn) {
        if (exn.RE_EXN_ID === $$Error) {
          return Caml_option.some(exn._1);
        }
      }
      exports.$$Error = $$Error;
      exports.internalToOCamlException = internalToOCamlException;
      exports.caml_as_js_exn = caml_as_js_exn;
    }
  });

  // node_modules/bs-platform/lib/js/array.js
  var require_array = __commonJS({
    "node_modules/bs-platform/lib/js/array.js"(exports) {
      "use strict";
      var Curry = require_curry();
      var Caml_obj = require_caml_obj();
      var Caml_array = require_caml_array();
      var Caml_exceptions = require_caml_exceptions();
      var Caml_js_exceptions = require_caml_js_exceptions();
      var make_float = Caml_array.caml_make_float_vect;
      var Floatarray = {};
      function init(l, f) {
        if (l === 0) {
          return [];
        }
        if (l < 0) {
          throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "Array.init",
            Error: new Error()
          };
        }
        var res = Caml_array.caml_make_vect(l, Curry._1(f, 0));
        for (var i = 1; i < l; ++i) {
          res[i] = Curry._1(f, i);
        }
        return res;
      }
      function make_matrix(sx, sy, init2) {
        var res = Caml_array.caml_make_vect(sx, []);
        for (var x = 0; x < sx; ++x) {
          res[x] = Caml_array.caml_make_vect(sy, init2);
        }
        return res;
      }
      function copy(a) {
        var l = a.length;
        if (l === 0) {
          return [];
        } else {
          return Caml_array.caml_array_sub(a, 0, l);
        }
      }
      function append(a1, a2) {
        var l1 = a1.length;
        if (l1 === 0) {
          return copy(a2);
        } else if (a2.length === 0) {
          return Caml_array.caml_array_sub(a1, 0, l1);
        } else {
          return a1.concat(a2);
        }
      }
      function sub(a, ofs, len) {
        if (ofs < 0 || len < 0 || ofs > (a.length - len | 0)) {
          throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "Array.sub",
            Error: new Error()
          };
        }
        return Caml_array.caml_array_sub(a, ofs, len);
      }
      function fill(a, ofs, len, v) {
        if (ofs < 0 || len < 0 || ofs > (a.length - len | 0)) {
          throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "Array.fill",
            Error: new Error()
          };
        }
        for (var i = ofs, i_finish = ofs + len | 0; i < i_finish; ++i) {
          a[i] = v;
        }
      }
      function blit(a1, ofs1, a2, ofs2, len) {
        if (len < 0 || ofs1 < 0 || ofs1 > (a1.length - len | 0) || ofs2 < 0 || ofs2 > (a2.length - len | 0)) {
          throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "Array.blit",
            Error: new Error()
          };
        }
        return Caml_array.caml_array_blit(a1, ofs1, a2, ofs2, len);
      }
      function iter(f, a) {
        for (var i = 0, i_finish = a.length; i < i_finish; ++i) {
          Curry._1(f, a[i]);
        }
      }
      function iter2(f, a, b) {
        if (a.length !== b.length) {
          throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "Array.iter2: arrays must have the same length",
            Error: new Error()
          };
        }
        for (var i = 0, i_finish = a.length; i < i_finish; ++i) {
          Curry._2(f, a[i], b[i]);
        }
      }
      function map(f, a) {
        var l = a.length;
        if (l === 0) {
          return [];
        }
        var r = Caml_array.caml_make_vect(l, Curry._1(f, a[0]));
        for (var i = 1; i < l; ++i) {
          r[i] = Curry._1(f, a[i]);
        }
        return r;
      }
      function map2(f, a, b) {
        var la = a.length;
        var lb = b.length;
        if (la !== lb) {
          throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "Array.map2: arrays must have the same length",
            Error: new Error()
          };
        }
        if (la === 0) {
          return [];
        }
        var r = Caml_array.caml_make_vect(la, Curry._2(f, a[0], b[0]));
        for (var i = 1; i < la; ++i) {
          r[i] = Curry._2(f, a[i], b[i]);
        }
        return r;
      }
      function iteri(f, a) {
        for (var i = 0, i_finish = a.length; i < i_finish; ++i) {
          Curry._2(f, i, a[i]);
        }
      }
      function mapi(f, a) {
        var l = a.length;
        if (l === 0) {
          return [];
        }
        var r = Caml_array.caml_make_vect(l, Curry._2(f, 0, a[0]));
        for (var i = 1; i < l; ++i) {
          r[i] = Curry._2(f, i, a[i]);
        }
        return r;
      }
      function to_list(a) {
        var _i = a.length - 1 | 0;
        var _res = 0;
        while (true) {
          var res = _res;
          var i = _i;
          if (i < 0) {
            return res;
          }
          _res = {
            hd: a[i],
            tl: res
          };
          _i = i - 1 | 0;
          continue;
        }
        ;
      }
      function list_length(_accu, _param) {
        while (true) {
          var param = _param;
          var accu = _accu;
          if (!param) {
            return accu;
          }
          _param = param.tl;
          _accu = accu + 1 | 0;
          continue;
        }
        ;
      }
      function of_list(l) {
        if (!l) {
          return [];
        }
        var a = Caml_array.caml_make_vect(list_length(0, l), l.hd);
        var _i = 1;
        var _param = l.tl;
        while (true) {
          var param = _param;
          var i = _i;
          if (!param) {
            return a;
          }
          a[i] = param.hd;
          _param = param.tl;
          _i = i + 1 | 0;
          continue;
        }
        ;
      }
      function fold_left(f, x, a) {
        var r = x;
        for (var i = 0, i_finish = a.length; i < i_finish; ++i) {
          r = Curry._2(f, r, a[i]);
        }
        return r;
      }
      function fold_right(f, a, x) {
        var r = x;
        for (var i = a.length - 1 | 0; i >= 0; --i) {
          r = Curry._2(f, a[i], r);
        }
        return r;
      }
      function exists(p, a) {
        var n = a.length;
        var _i = 0;
        while (true) {
          var i = _i;
          if (i === n) {
            return false;
          }
          if (Curry._1(p, a[i])) {
            return true;
          }
          _i = i + 1 | 0;
          continue;
        }
        ;
      }
      function for_all(p, a) {
        var n = a.length;
        var _i = 0;
        while (true) {
          var i = _i;
          if (i === n) {
            return true;
          }
          if (!Curry._1(p, a[i])) {
            return false;
          }
          _i = i + 1 | 0;
          continue;
        }
        ;
      }
      function mem(x, a) {
        var n = a.length;
        var _i = 0;
        while (true) {
          var i = _i;
          if (i === n) {
            return false;
          }
          if (Caml_obj.caml_equal(a[i], x)) {
            return true;
          }
          _i = i + 1 | 0;
          continue;
        }
        ;
      }
      function memq(x, a) {
        var n = a.length;
        var _i = 0;
        while (true) {
          var i = _i;
          if (i === n) {
            return false;
          }
          if (x === a[i]) {
            return true;
          }
          _i = i + 1 | 0;
          continue;
        }
        ;
      }
      var Bottom = /* @__PURE__ */ Caml_exceptions.create("Array.Bottom");
      function sort(cmp, a) {
        var maxson = function(l2, i2) {
          var i31 = ((i2 + i2 | 0) + i2 | 0) + 1 | 0;
          var x = i31;
          if ((i31 + 2 | 0) < l2) {
            if (Curry._2(cmp, Caml_array.get(a, i31), Caml_array.get(a, i31 + 1 | 0)) < 0) {
              x = i31 + 1 | 0;
            }
            if (Curry._2(cmp, Caml_array.get(a, x), Caml_array.get(a, i31 + 2 | 0)) < 0) {
              x = i31 + 2 | 0;
            }
            return x;
          }
          if ((i31 + 1 | 0) < l2 && Curry._2(cmp, Caml_array.get(a, i31), Caml_array.get(a, i31 + 1 | 0)) < 0) {
            return i31 + 1 | 0;
          }
          if (i31 < l2) {
            return i31;
          }
          throw {
            RE_EXN_ID: Bottom,
            _1: i2,
            Error: new Error()
          };
        };
        var trickle = function(l2, i2, e2) {
          try {
            var _i = i2;
            while (true) {
              var i$12 = _i;
              var j = maxson(l2, i$12);
              if (Curry._2(cmp, Caml_array.get(a, j), e2) <= 0) {
                return Caml_array.set(a, i$12, e2);
              }
              Caml_array.set(a, i$12, Caml_array.get(a, j));
              _i = j;
              continue;
            }
            ;
          } catch (raw_i) {
            var i$2 = Caml_js_exceptions.internalToOCamlException(raw_i);
            if (i$2.RE_EXN_ID === Bottom) {
              return Caml_array.set(a, i$2._1, e2);
            }
            throw i$2;
          }
        };
        var bubble = function(l2, i2) {
          try {
            var _i = i2;
            while (true) {
              var i$12 = _i;
              var j = maxson(l2, i$12);
              Caml_array.set(a, i$12, Caml_array.get(a, j));
              _i = j;
              continue;
            }
            ;
          } catch (raw_i) {
            var i$2 = Caml_js_exceptions.internalToOCamlException(raw_i);
            if (i$2.RE_EXN_ID === Bottom) {
              return i$2._1;
            }
            throw i$2;
          }
        };
        var trickleup = function(_i, e2) {
          while (true) {
            var i2 = _i;
            var father = (i2 - 1 | 0) / 3 | 0;
            if (i2 === father) {
              throw {
                RE_EXN_ID: "Assert_failure",
                _1: [
                  "array.ml",
                  238,
                  4
                ],
                Error: new Error()
              };
            }
            if (Curry._2(cmp, Caml_array.get(a, father), e2) >= 0) {
              return Caml_array.set(a, i2, e2);
            }
            Caml_array.set(a, i2, Caml_array.get(a, father));
            if (father <= 0) {
              return Caml_array.set(a, 0, e2);
            }
            _i = father;
            continue;
          }
          ;
        };
        var l = a.length;
        for (var i = ((l + 1 | 0) / 3 | 0) - 1 | 0; i >= 0; --i) {
          trickle(l, i, Caml_array.get(a, i));
        }
        for (var i$1 = l - 1 | 0; i$1 >= 2; --i$1) {
          var e = Caml_array.get(a, i$1);
          Caml_array.set(a, i$1, Caml_array.get(a, 0));
          trickleup(bubble(i$1, 0), e);
        }
        if (l <= 1) {
          return;
        }
        var e$1 = Caml_array.get(a, 1);
        Caml_array.set(a, 1, Caml_array.get(a, 0));
        return Caml_array.set(a, 0, e$1);
      }
      function stable_sort(cmp, a) {
        var merge = function(src1ofs, src1len, src2, src2ofs, src2len, dst, dstofs) {
          var src1r = src1ofs + src1len | 0;
          var src2r = src2ofs + src2len | 0;
          var _i1 = src1ofs;
          var _s1 = Caml_array.get(a, src1ofs);
          var _i2 = src2ofs;
          var _s2 = Caml_array.get(src2, src2ofs);
          var _d = dstofs;
          while (true) {
            var d = _d;
            var s2 = _s2;
            var i2 = _i2;
            var s1 = _s1;
            var i1 = _i1;
            if (Curry._2(cmp, s1, s2) <= 0) {
              Caml_array.set(dst, d, s1);
              var i1$1 = i1 + 1 | 0;
              if (i1$1 >= src1r) {
                return blit(src2, i2, dst, d + 1 | 0, src2r - i2 | 0);
              }
              _d = d + 1 | 0;
              _s1 = Caml_array.get(a, i1$1);
              _i1 = i1$1;
              continue;
            }
            Caml_array.set(dst, d, s2);
            var i2$1 = i2 + 1 | 0;
            if (i2$1 >= src2r) {
              return blit(a, i1, dst, d + 1 | 0, src1r - i1 | 0);
            }
            _d = d + 1 | 0;
            _s2 = Caml_array.get(src2, i2$1);
            _i2 = i2$1;
            continue;
          }
          ;
        };
        var isortto = function(srcofs, dst, dstofs, len) {
          for (var i = 0; i < len; ++i) {
            var e = Caml_array.get(a, srcofs + i | 0);
            var j = (dstofs + i | 0) - 1 | 0;
            while (j >= dstofs && Curry._2(cmp, Caml_array.get(dst, j), e) > 0) {
              Caml_array.set(dst, j + 1 | 0, Caml_array.get(dst, j));
              j = j - 1 | 0;
            }
            ;
            Caml_array.set(dst, j + 1 | 0, e);
          }
        };
        var sortto = function(srcofs, dst, dstofs, len) {
          if (len <= 5) {
            return isortto(srcofs, dst, dstofs, len);
          }
          var l12 = len / 2 | 0;
          var l22 = len - l12 | 0;
          sortto(srcofs + l12 | 0, dst, dstofs + l12 | 0, l22);
          sortto(srcofs, a, srcofs + l22 | 0, l12);
          return merge(srcofs + l22 | 0, l12, dst, dstofs + l12 | 0, l22, dst, dstofs);
        };
        var l = a.length;
        if (l <= 5) {
          return isortto(0, a, 0, l);
        }
        var l1 = l / 2 | 0;
        var l2 = l - l1 | 0;
        var t = Caml_array.caml_make_vect(l2, Caml_array.get(a, 0));
        sortto(l1, t, 0, l2);
        sortto(0, a, l2, l1);
        return merge(l2, l1, t, 0, l2, a, 0);
      }
      var create_matrix = make_matrix;
      var concat = Caml_array.caml_array_concat;
      var fast_sort = stable_sort;
      exports.make_float = make_float;
      exports.init = init;
      exports.make_matrix = make_matrix;
      exports.create_matrix = create_matrix;
      exports.append = append;
      exports.concat = concat;
      exports.sub = sub;
      exports.copy = copy;
      exports.fill = fill;
      exports.blit = blit;
      exports.to_list = to_list;
      exports.of_list = of_list;
      exports.iter = iter;
      exports.iteri = iteri;
      exports.map = map;
      exports.mapi = mapi;
      exports.fold_left = fold_left;
      exports.fold_right = fold_right;
      exports.iter2 = iter2;
      exports.map2 = map2;
      exports.for_all = for_all;
      exports.exists = exists;
      exports.mem = mem;
      exports.memq = memq;
      exports.sort = sort;
      exports.stable_sort = stable_sort;
      exports.fast_sort = fast_sort;
      exports.Floatarray = Floatarray;
    }
  });

  // src/Webapi.bs.js
  var require_Webapi_bs = __commonJS({
    "src/Webapi.bs.js"(exports) {
      "use strict";
      var Curry = require_curry();
      var $$Image = {};
      var $$Element = {};
      var $$Document = {};
      var $$ImageData = {};
      var CanvasContext = {};
      var Canvas = {};
      function onLoad(callback) {
        return function() {
          var img = this;
          var canvas = document.createElement("canvas");
          var context = canvas.getContext("2d");
          canvas.setAttribute("width", img.width.toString());
          canvas.setAttribute("height", img.height.toString());
          context.drawImage(img, 0, 0);
          return Curry._1(callback, context.getImageData(0, 0, 0, 0));
        };
      }
      function imageDataOfUrl(url) {
        var img = new window.Image();
        return new Promise(function(resolve, param) {
          img.onload = onLoad(function(result) {
            return resolve(result);
          });
          img.src = url;
        });
      }
      exports.$$Image = $$Image;
      exports.$$Element = $$Element;
      exports.$$Document = $$Document;
      exports.$$ImageData = $$ImageData;
      exports.CanvasContext = CanvasContext;
      exports.Canvas = Canvas;
      exports.onLoad = onLoad;
      exports.imageDataOfUrl = imageDataOfUrl;
    }
  });

  // src/Dominant.bs.js
  var require_Dominant_bs = __commonJS({
    "src/Dominant.bs.js"(exports) {
      "use strict";
      var $$Array = require_array();
      var Caml_array = require_caml_array();
      var Webapi$Dominant = require_Webapi_bs();
      function reduceRange(color, range) {
        return {
          min: color < range.min ? color : range.min,
          max: color > range.max ? color : range.max
        };
      }
      function reduceColorRange(pixel, ranges, param) {
        if (ranges !== void 0) {
          return {
            red: reduceRange(pixel.red, ranges.red),
            green: reduceRange(pixel.green, ranges.green),
            blue: reduceRange(pixel.blue, ranges.blue)
          };
        } else {
          return {
            red: {
              min: pixel.red,
              max: pixel.red
            },
            green: {
              min: pixel.green,
              max: pixel.green
            },
            blue: {
              min: pixel.blue,
              max: pixel.blue
            }
          };
        }
      }
      function ofColor(red, green, blue, param) {
        return {
          red,
          green,
          blue
        };
      }
      function ofFloatArray(colorArray) {
        var _position = 0;
        var _acc = [];
        while (true) {
          var acc = _acc;
          var position = _position;
          if ((position + 3 | 0) >= colorArray.length) {
            return acc;
          }
          _acc = $$Array.append(acc, [(Caml_array.get(colorArray, position + 3 | 0), {
            red: Caml_array.get(colorArray, position + 0 | 0),
            green: Caml_array.get(colorArray, position + 1 | 0),
            blue: Caml_array.get(colorArray, position + 2 | 0)
          })]);
          _position = position + 4 | 0;
          continue;
        }
        ;
      }
      function getRange(pixelArray) {
        return $$Array.fold_left(function(ranges, pixel) {
          return reduceColorRange(pixel, ranges, void 0);
        }, void 0, pixelArray);
      }
      function sortPixelList(pixelArray, colorRange) {
        var deltaRed = colorRange.red.max - colorRange.red.min;
        var deltaGreen = colorRange.green.max - colorRange.green.min;
        var deltaBlue = colorRange.blue.max - colorRange.blue.min;
        if (deltaRed > deltaGreen && deltaRed > deltaBlue) {
          var sortFn = function(l, r) {
            return l.red - r.red | 0;
          };
          return $$Array.sort(sortFn, pixelArray);
        }
        if (deltaGreen > deltaBlue && deltaGreen > deltaRed) {
          var sortFn$1 = function(l, r) {
            return l.green - r.green | 0;
          };
          return $$Array.sort(sortFn$1, pixelArray);
        }
        var sortFn$2 = function(l, r) {
          return l.blue - r.blue | 0;
        };
        return $$Array.sort(sortFn$2, pixelArray);
      }
      function colorAverage(pixelArray) {
        var squaredPixelArray = $$Array.map(function(c) {
          return {
            red: c.red * c.red,
            green: c.green * c.green,
            blue: c.blue * c.blue
          };
        }, pixelArray);
        var squaredPixelsSum = $$Array.fold_left(function(v, a) {
          return {
            red: v.red + a.red,
            green: v.green + a.green,
            blue: v.blue + a.blue
          };
        }, {
          red: 0,
          green: 0,
          blue: 0
        }, squaredPixelArray);
        return {
          red: Math.sqrt(squaredPixelsSum.red / pixelArray.length),
          green: Math.sqrt(squaredPixelsSum.green / pixelArray.length),
          blue: Math.sqrt(squaredPixelsSum.blue / pixelArray.length)
        };
      }
      function clusterize(pixelArray, square) {
        var _clusters = [pixelArray];
        var _square = square;
        while (true) {
          var square$1 = _square;
          var clusters = _clusters;
          if (square$1 === 0) {
            return clusters;
          }
          _square = square$1 - 1 | 0;
          _clusters = $$Array.fold_left($$Array.append, [], $$Array.map(function(cluster) {
            var range = getRange(cluster);
            if (range !== void 0) {
              sortPixelList(cluster, range);
              return [
                $$Array.sub(cluster, 0, cluster.length >> 1),
                $$Array.sub(cluster, cluster.length >> 1, cluster.length >> 1)
              ];
            } else {
              return [cluster];
            }
          }, clusters));
          continue;
        }
        ;
      }
      function paletteOfClusters(clusters) {
        return $$Array.map(colorAverage, clusters);
      }
      function paletteOfPixelArray(pixelArray, squareOpt, param) {
        var square = squareOpt !== void 0 ? squareOpt : 4;
        return $$Array.map(colorAverage, clusterize(pixelArray, square));
      }
      function ofImageData(imageData, square, param) {
        return paletteOfPixelArray(ofFloatArray(imageData.data), square, void 0);
      }
      function ofUrl(url, square, param) {
        return Webapi$Dominant.imageDataOfUrl(url).then(function(imageData) {
          return Promise.resolve(ofImageData(imageData, square, void 0));
        });
      }
      exports.reduceRange = reduceRange;
      exports.reduceColorRange = reduceColorRange;
      exports.ofColor = ofColor;
      exports.ofFloatArray = ofFloatArray;
      exports.getRange = getRange;
      exports.sortPixelList = sortPixelList;
      exports.colorAverage = colorAverage;
      exports.clusterize = clusterize;
      exports.paletteOfClusters = paletteOfClusters;
      exports.paletteOfPixelArray = paletteOfPixelArray;
      exports.ofImageData = ofImageData;
      exports.ofUrl = ofUrl;
    }
  });

  // examples/Demo.bs.js
  var require_Demo_bs = __commonJS({
    "examples/Demo.bs.js"(exports) {
      "use strict";
      var Dominant$Dominant = require_Dominant_bs();
      console.log(Promise.resolve("http://httpbin.org/"));
      console.log("http://httpbin.org/");
      var dominantColors = Dominant$Dominant.ofUrl("http://httpbin.org/", void 0, void 0);
      dominantColors.then(function(value) {
        return Promise.resolve((console.log(value), void 0));
      });
      exports.dominantColors = dominantColors;
    }
  });
  require_Demo_bs();
})();
