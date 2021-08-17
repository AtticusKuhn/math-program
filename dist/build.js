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
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.parse = void 0;\nconst ops_1 = __webpack_require__(/*! ./ops */ \"./src/math/ops.ts\");\nconst utils_1 = __webpack_require__(/*! ./utils */ \"./src/math/utils.ts\");\nconst parse = (input) => {\n    const cls = ops_1.ops.map(o => new o());\n    const a = cls.find(cl => cl.parse(input));\n    return a ? a.parse(input) : null;\n};\nexports.parse = parse;\nconst simplifiy = (expr) => {\n    return expr.evaluate();\n};\nconsole.log('simplifiy(forceMaybe(parse(\"\\\\frac{2}{4}\"))) \\n', simplifiy(utils_1.forceMaybe(exports.parse(\"\\\\frac{2}{4}\"))));\ntry {\n    Object.assign(window, { parse: exports.parse, simplifiy, ops: ops_1.ops });\n}\ncatch (_a) { }\n\n\n//# sourceURL=webpack:///./src/math/index.ts?");

/***/ }),

/***/ "./src/math/ops.ts":
/*!*************************!*\
  !*** ./src/math/ops.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.ops = exports.Nop = void 0;\nconst _1 = __webpack_require__(/*! . */ \"./src/math/index.ts\");\nconst utils_1 = __webpack_require__(/*! ./utils */ \"./src/math/utils.ts\");\nclass Nop {\n    constructor(matches, name, vals = []) {\n        this.matches = matches;\n        this.name = name;\n        this.vals = vals;\n    }\n    parse(input) {\n        let cp_matches = this.matches;\n        let sampleRegex = new RegExp(cp_matches.map(m => {\n            if (typeof m === \"number\") {\n                return \"(.+)\";\n            }\n            else {\n                return m.toString().substring(1, m.toString().length - 1);\n            }\n        }).join(\"\"));\n        let found = input.match(sampleRegex);\n        if (!found) {\n            return null;\n        }\n        found = [...found].slice(1);\n        const mappedArgs = utils_1.sequence(found.map(_1.parse));\n        if (!mappedArgs) {\n            return null;\n        }\n        this.vals = mappedArgs;\n        return this;\n    }\n    evaluate() {\n        return 0;\n    }\n    simplify() {\n        return this;\n    }\n    toString() {\n        return JSON.stringify(this, null, 4);\n    }\n}\nexports.Nop = Nop;\nclass Plus extends Nop {\n    constructor() {\n        super([1, /\\+/, 2], \"plus\");\n        this.matches = [1, /\\+/, 2];\n    }\n    toString() {\n        return `${this.vals[0]}+${this.vals[1].evaluate()}`;\n    }\n    evaluate() {\n        return this.vals[0].evaluate() + this.vals[1].evaluate();\n    }\n}\nclass Minus extends Nop {\n    constructor() {\n        super([1, /-/, 2], \"minus\");\n        this.matches = [1, /-/, 2];\n    }\n    evaluate() {\n        return this.vals[0].evaluate() - this.vals[1].evaluate();\n    }\n    toString() {\n        return `${this.vals[0]}-${this.vals[1].evaluate()}`;\n    }\n}\nclass Divides extends Nop {\n    constructor() {\n        super([1, /-/, 2], \"minus\");\n        this.matches = [/\\\\frac{/, 1, /}{/, 2, /}/];\n    }\n    evaluate() {\n        return this.vals[0].evaluate() / this.vals[1].evaluate();\n    }\n    toString() {\n        return `${this.vals[0]}/${this.vals[1].evaluate()}`;\n    }\n    simplify() {\n        return this;\n    }\n}\nclass Digit extends Nop {\n    constructor() {\n        super([/[0-9]+/], \"digit\");\n        this.matches = [/[0-9]+/];\n        this.value = 69;\n    }\n    toString() {\n        return this.value.toString();\n    }\n    evaluate() {\n        return this.value;\n    }\n    parse(input) {\n        if (isNaN(input))\n            return null;\n        this.value = parseInt(input);\n        return this;\n    }\n}\nexports.ops = [Plus, Minus, Digit, Divides];\n\n\n//# sourceURL=webpack:///./src/math/ops.ts?");

/***/ }),

/***/ "./src/math/utils.ts":
/*!***************************!*\
  !*** ./src/math/utils.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.forceMaybe = exports.sequence = exports.id = void 0;\nconst id = (x) => x;\nexports.id = id;\nconst sequence = (xs) => xs.every(exports.id) ? xs : null;\nexports.sequence = sequence;\nconst forceMaybe = (m) => {\n    if (m)\n        return m;\n    throw new Error(\"Tried to force a maybe failed as \" + m);\n};\nexports.forceMaybe = forceMaybe;\n\n\n//# sourceURL=webpack:///./src/math/utils.ts?");

/***/ })

/******/ });