/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/math/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/math/index.ts":
/*!***************************!*\
  !*** ./src/math/index.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.parse = void 0;\nconst ops_1 = __webpack_require__(/*! ./ops */ \"./src/math/ops.ts\");\nconst parse = (input) => {\n    const cls = ops_1.ops.map(o => new o());\n    const a = cls.find(cl => cl.parse(input));\n    return a ? a.parse(input) : null;\n};\nexports.parse = parse;\nconst simplifiy = (expr) => {\n    return expr.evaluate();\n};\ntry {\n    Object.assign(window, { parse: exports.parse, simplifiy, ops: ops_1.ops });\n}\ncatch (_a) { }\n\n\n//# sourceURL=webpack:///./src/math/index.ts?");

/***/ }),

/***/ "./src/math/ops.ts":
/*!*************************!*\
  !*** ./src/math/ops.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.ops = exports.Nop = void 0;\nconst _1 = __webpack_require__(/*! . */ \"./src/math/index.ts\");\nconst utils_1 = __webpack_require__(/*! ./utils */ \"./src/math/utils.ts\");\nclass Nop {\n    constructor(matches, name, vals = []) {\n        this.matches = matches;\n        this.name = name;\n        this.vals = vals;\n    }\n    parse(input) {\n        let cp_matches = this.matches;\n        let sampleRegex = new RegExp(cp_matches.map(m => {\n            if (typeof m === \"number\") {\n                return \"(.+)\";\n            }\n            else {\n                return m.toString().substring(1, m.toString().length - 1);\n            }\n        }).join(\"\"));\n        let found = input.match(sampleRegex);\n        if (!found) {\n            return null;\n        }\n        found = [...found].slice(1);\n        const mappedArgs = utils_1.sequence(found.map(_1.parse));\n        if (!mappedArgs) {\n            return null;\n        }\n        this.vals = mappedArgs;\n        return this;\n    }\n    evaluate() {\n        return this;\n    }\n    simplify() {\n        return this;\n    }\n    toString() {\n        return JSON.stringify(this, null, 4);\n    }\n}\nexports.Nop = Nop;\nclass Plus extends Nop {\n    constructor(a, b) {\n        super([1, /\\+/, 2], \"plus\");\n        this.a = a;\n        this.b = b;\n        this.matches = [1, /\\+/, 2];\n        this.vals = [a, b];\n    }\n    toString() {\n        return `${this.vals[0]}+${this.vals[1]}`;\n    }\n    evaluate() {\n        const a = this.vals[0].evaluate();\n        const b = this.vals[1].evaluate();\n        let x = {};\n        const fillX = (t) => {\n            var _a, _b;\n            if (t instanceof Digit)\n                x.digit = ((_a = x.digit) !== null && _a !== void 0 ? _a : 0) + t.value;\n            if (t instanceof Variable)\n                x[t.value.name] = ((_b = x[t.value.name]) !== null && _b !== void 0 ? _b : 0) + t.value.v;\n            if (t instanceof Plus) {\n                for (const p of t.vals) {\n                    fillX(p);\n                }\n            }\n        };\n        fillX(a);\n        fillX(b);\n        if (Object.keys(x).length === 1) {\n            if (Object.keys(x)[0] === \"digit\") {\n                return new Digit(x[Object.keys(x)[0]]);\n            }\n            else {\n                return new Variable({ v: x[Object.keys(x)[0]], name: Object.keys(x)[0] });\n            }\n        }\n        else {\n            let temp = (xs) => xs.length === 2 ?\n                new Plus(xs[0], xs[1]) :\n                new Plus(xs[0], temp(xs.slice(1)));\n            let xs = [];\n            for (const k of Object.keys(x)) {\n                if (k === \"digit\") {\n                    xs.push(new Digit(x[k]));\n                }\n                else {\n                    xs.push(new Variable({\n                        v: x[k],\n                        name: k,\n                    }));\n                }\n            }\n            return temp(xs);\n        }\n    }\n}\nclass Minus extends Nop {\n    constructor() {\n        super([1, /-/, 2], \"minus\");\n        this.matches = [1, /-/, 2];\n    }\n    evaluate() {\n        const a = this.vals[0].evaluate();\n        const b = this.vals[1].evaluate();\n        if (a instanceof Digit && b instanceof Digit) {\n            return new Digit(a.value - b.value);\n        }\n        if (a instanceof Variable && b instanceof Variable) {\n            if (a.value.name === b.value.name) {\n                return new Variable({\n                    v: a.value.v - b.value.v,\n                    name: a.value.name\n                });\n            }\n            else {\n                return this;\n            }\n        }\n        return this;\n    }\n    toString() {\n        return `${this.vals[0]}-${this.vals[1].evaluate()}`;\n    }\n}\nclass Divides extends Nop {\n    constructor(vals = []) {\n        super([1, /-/, 2], \"minus\", vals);\n        this.vals = vals;\n        this.matches = [/\\\\frac{/, 1, /}{/, 2, /}/];\n    }\n    evaluate() {\n        const a = this.vals[0].evaluate();\n        const b = this.vals[1].evaluate();\n        if (a.name === \"digit\" && b.name === \"digit\") {\n            return new Digit(a.value / b.value);\n        }\n        return this;\n    }\n    toString() {\n        return `${this.vals[0]}/${this.vals[1]}`;\n    }\n    simplify() {\n        const a = this.vals[0].simplify();\n        const b = this.vals[0].simplify();\n        if (a instanceof Digit && b instanceof Digit) {\n            return new Divides([a, b]);\n        }\n        else if (a instanceof Variable && b instanceof Variable) {\n            return new Divides([a, b]);\n        }\n        return this;\n    }\n}\nclass Digit extends Nop {\n    constructor(value = 69) {\n        super([/[0-9]+/], \"digit\");\n        this.value = value;\n        this.matches = [/[0-9]+/];\n    }\n    toString() {\n        return this.value.toString();\n    }\n    evaluate() {\n        return this;\n    }\n    parse(input) {\n        if (isNaN(input))\n            return null;\n        this.value = parseInt(input);\n        return this;\n    }\n}\nclass Variable extends Nop {\n    constructor(value = { v: 69, name: \"x\" }) {\n        super([/[0-9]+[a-z]/], \"variable\");\n        this.value = value;\n        this.matches = [/[0-9]+[a-z]/];\n    }\n    toString() {\n        return `${this.value.v}${this.value.name}`;\n    }\n    evaluate() {\n        return this;\n    }\n    parse(input) {\n        var _a;\n        const match = (_a = input.match(/(?<val>[0-9]+)(?<name>[a-z])/)) === null || _a === void 0 ? void 0 : _a.groups;\n        if (!match)\n            return null;\n        const { val, name } = match;\n        if (!val || !name)\n            return null;\n        this.value = {\n            v: parseInt(val),\n            name,\n        };\n        return this;\n    }\n}\nexports.ops = [Divides, Plus, Minus, Variable, Digit];\n\n\n//# sourceURL=webpack:///./src/math/ops.ts?");

/***/ }),

/***/ "./src/math/utils.ts":
/*!***************************!*\
  !*** ./src/math/utils.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.constant = exports.forceMaybe = exports.sequence = exports.id = void 0;\nconst id = (x) => x;\nexports.id = id;\nconst sequence = (xs) => xs.every(exports.id) ? xs : null;\nexports.sequence = sequence;\nconst forceMaybe = (m) => {\n    if (m)\n        return m;\n    throw new Error(\"Tried to force a maybe failed as \" + m);\n};\nexports.forceMaybe = forceMaybe;\nconst constant = (x) => () => x;\nexports.constant = constant;\n\n\n//# sourceURL=webpack:///./src/math/utils.ts?");

/***/ })

/******/ });