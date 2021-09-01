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
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.parse = void 0;\nconst ops_1 = __webpack_require__(/*! ./ops */ \"./src/math/ops.ts\");\nconst utils_1 = __webpack_require__(/*! ./utils */ \"./src/math/utils.ts\");\nconst parse = (input) => {\n    const cls = ops_1.ops.map(o => new o());\n    const a = cls.find(cl => cl.parse(input).hasValue());\n    return a ? a.parse(input) : new utils_1.Maybe(null);\n};\nexports.parse = parse;\nconst simplifiy = (expr) => {\n    return expr.evaluate();\n};\nutils_1.reduce;\ntry {\n    Object.assign(window, { parse: exports.parse, simplifiy, ops: ops_1.ops, reduce: utils_1.reduce });\n}\ncatch (_a) { }\n\n\n//# sourceURL=webpack:///./src/math/index.ts?");

/***/ }),

/***/ "./src/math/ops.ts":
/*!*************************!*\
  !*** ./src/math/ops.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.ops = exports.Nop = void 0;\nconst _1 = __webpack_require__(/*! . */ \"./src/math/index.ts\");\nconst utils_1 = __webpack_require__(/*! ./utils */ \"./src/math/utils.ts\");\nclass Nop {\n    constructor(matches, name, vals = []) {\n        this.matches = matches;\n        this.name = name;\n        this.vals = vals;\n    }\n    parse(input) {\n        let temp = this.matches.map(match => {\n            let sampleRegex = new RegExp(`^${match.map(m => {\n                if (typeof m === \"number\") {\n                    return \"(.+)\";\n                }\n                else {\n                    return m.toString().substring(1, m.toString().length - 1);\n                }\n            }).join(\"\")}$`);\n            console.log(\"sampleRegex\", sampleRegex);\n            let found = input.match(sampleRegex);\n            if (!found) {\n                return new utils_1.Maybe(null);\n            }\n            else {\n                return new utils_1.Maybe([...found].slice(1));\n            }\n        });\n        const ma = utils_1.filterMaybe(temp);\n        if (ma.value === null) {\n            return new utils_1.Maybe(null);\n        }\n        else {\n            if (ma.value.length === 0) {\n                return new utils_1.Maybe(null);\n            }\n            else {\n                let found = ma.value;\n                const mappedArgs = utils_1.sequence(found.map(_1.parse));\n                if (mappedArgs.value === null) {\n                    return new utils_1.Maybe(null);\n                }\n                else {\n                    this.vals = mappedArgs.value;\n                    return new utils_1.Maybe(this);\n                }\n            }\n        }\n    }\n    evaluate() {\n        return this;\n    }\n    simplify() {\n        return this;\n    }\n    toString() {\n        return JSON.stringify(this, null, 4);\n    }\n}\nexports.Nop = Nop;\nclass Plus extends Nop {\n    constructor(a, b) {\n        super([[1, /\\+/, 2]], \"plus\");\n        this.a = a;\n        this.b = b;\n        this.matches = [[1, /\\+/, 2]];\n        this.vals = [a, b];\n    }\n    toString() {\n        return `${this.vals[0]}+${this.vals[1]}`;\n    }\n    evaluate() {\n        const a = this.vals[0].evaluate();\n        const b = this.vals[1].evaluate();\n        let x = {};\n        const fillX = (t) => {\n            var _a, _b;\n            if (t instanceof Digit)\n                x.digit = ((_a = x.digit) !== null && _a !== void 0 ? _a : 0) + t.value;\n            if (t instanceof Variable)\n                x[t.value.name] = ((_b = x[t.value.name]) !== null && _b !== void 0 ? _b : 0) + t.value.v;\n            if (t instanceof Plus) {\n                for (const p of t.vals) {\n                    fillX(p);\n                }\n            }\n        };\n        fillX(a);\n        fillX(b);\n        if (Object.keys(x).length === 1) {\n            if (Object.keys(x)[0] === \"digit\") {\n                return new Digit(x[Object.keys(x)[0]]);\n            }\n            else {\n                return new Variable({ v: x[Object.keys(x)[0]], name: Object.keys(x)[0] });\n            }\n        }\n        else {\n            let temp = (xs) => xs.length === 2 ?\n                new Plus(xs[0], xs[1]) :\n                new Plus(xs[0], temp(xs.slice(1)));\n            let xs = [];\n            for (const k of Object.keys(x)) {\n                if (k === \"digit\") {\n                    xs.push(new Digit(x[k]));\n                }\n                else {\n                    xs.push(new Variable({\n                        v: x[k],\n                        name: k,\n                    }));\n                }\n            }\n            return temp(xs);\n        }\n    }\n}\nclass Minus extends Nop {\n    constructor() {\n        super([[1, /-/, 2]], \"minus\");\n        this.matches = [[1, /-/, 2]];\n    }\n    evaluate() {\n        const a = this.vals[0].evaluate();\n        const b = this.vals[1].evaluate();\n        if (a instanceof Digit && b instanceof Digit) {\n            return new Digit(a.value - b.value);\n        }\n        if (a instanceof Variable && b instanceof Variable) {\n            if (a.value.name === b.value.name) {\n                return new Variable({\n                    v: a.value.v - b.value.v,\n                    name: a.value.name\n                });\n            }\n            else {\n                return this;\n            }\n        }\n        return this;\n    }\n    toString() {\n        return `${this.vals[0]}-${this.vals[1].evaluate()}`;\n    }\n}\nclass Divides extends Nop {\n    constructor(vals = []) {\n        super([[1, /-/, 2]], \"minus\", vals);\n        this.vals = vals;\n        this.matches = [[/\\\\frac{/, 1, /}{/, 2, /}/], [1, /\\//, 2]];\n    }\n    evaluate() {\n        const a = this.vals[0].evaluate();\n        const b = this.vals[1].evaluate();\n        if (a.name === \"digit\" && b.name === \"digit\") {\n            return new Digit(a.value / b.value);\n        }\n        return this;\n    }\n    toString() {\n        return `${this.vals[0]}/${this.vals[1]}`;\n    }\n    simplify() {\n        const a = this.vals[0].simplify();\n        const b = this.vals[1].simplify();\n        if (a instanceof Digit && b instanceof Digit) {\n            let x = utils_1.reduce(a.value, b.value).map(e => new Digit(e));\n            if (x[1].value === 1)\n                return x[0];\n            return new Divides(x);\n        }\n        else if (a instanceof Variable && b instanceof Variable) {\n            const [na, nb] = utils_1.reduce(a.value.v, b.value.v);\n            return new Divides([\n                new Variable({ name: a.name, v: na }),\n                new Variable({ name: b.name, v: nb })\n            ]);\n        }\n        return this;\n    }\n}\nclass Digit extends Nop {\n    constructor(value = 69) {\n        super([[/[0-9]+/]], \"digit\");\n        this.value = value;\n        this.matches = [[/[0-9]+/]];\n    }\n    toString() {\n        return this.value.toString();\n    }\n    evaluate() {\n        return this;\n    }\n    parse(input) {\n        if (isNaN(input))\n            return new utils_1.Maybe(null);\n        this.value = parseInt(input);\n        return new utils_1.Maybe(this);\n    }\n}\nclass Variable extends Nop {\n    constructor(value = { v: 69, name: \"x\" }) {\n        super([[/[0-9]+[a-z]/]], \"variable\");\n        this.value = value;\n        this.matches = [[/[0-9]+[a-z]/]];\n    }\n    toString() {\n        return `${this.value.v}${this.value.name}`;\n    }\n    evaluate() {\n        return this;\n    }\n    parse(input) {\n        var _a;\n        const match = (_a = input.match(/(?<val>[0-9]+)(?<name>[a-z])/)) === null || _a === void 0 ? void 0 : _a.groups;\n        if (!match)\n            return new utils_1.Maybe(null);\n        const { val, name } = match;\n        if (!val || !name)\n            return new utils_1.Maybe(null);\n        this.value = {\n            v: parseInt(val),\n            name,\n        };\n        return new utils_1.Maybe(this);\n    }\n}\nclass Parenthesis extends Nop {\n    constructor(value) {\n        super([[/\\(/, 1, /\\)/]], \"parenthesis\");\n        this.value = value;\n        this.matches = [[/\\(/, 1, /\\)/]];\n    }\n    toString() {\n        return `(${this.vals[0].toString()})`;\n    }\n    evaluate() {\n        console.log `in parenthis, this.vals[0] ${this.vals[0]}`;\n        return this.vals[0].evaluate();\n    }\n}\nexports.ops = [Parenthesis, Divides, Plus, Minus, Variable, Digit];\n\n\n//# sourceURL=webpack:///./src/math/ops.ts?");

/***/ }),

/***/ "./src/math/utils.ts":
/*!***************************!*\
  !*** ./src/math/utils.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.reduce = exports.findGCD = exports.constant = exports.filterMaybe = exports.sequence = exports.Maybe = exports.id = void 0;\nconst id = (x) => x;\nexports.id = id;\nclass Maybe {\n    constructor(value) {\n        this.value = value;\n    }\n    getValue() {\n        return this.value;\n    }\n    hasValue() {\n        return !this.isNull();\n    }\n    isNull() {\n        return this.value === null;\n    }\n    force(message = \"Tried to force a maybe\") {\n        if (this.value !== null) {\n            return this.value;\n        }\n        else {\n            throw new Error(message);\n        }\n    }\n    map(f) {\n        const v = this.value === null ? null : f(this.value);\n        return new Maybe(v);\n    }\n    else(defaultValue) {\n        if (this.value === null) {\n            return defaultValue;\n        }\n        else {\n            return this.value;\n        }\n    }\n    bind(f) {\n        if (this.value !== null) {\n            return f(this.value);\n        }\n        else {\n            return null;\n        }\n    }\n    show() {\n        if (this.value === null) {\n            return \"Nothing\";\n        }\n        else {\n            return `Just ${JSON.stringify(this.value)}`;\n        }\n    }\n}\nexports.Maybe = Maybe;\nconst sequence = (xs) => {\n    let x = new Maybe([]);\n    for (const t of xs) {\n        if (t.value === null) {\n            return new Maybe(null);\n        }\n        else {\n            x.value.push(t.value);\n        }\n    }\n    return x;\n};\nexports.sequence = sequence;\nconst filterMaybe = (xs) => {\n    let a = xs.filter(b => b.hasValue());\n    if (a.length === 0) {\n        return new Maybe(null);\n    }\n    else {\n        return a[0];\n    }\n};\nexports.filterMaybe = filterMaybe;\nconst constant = (x) => () => x;\nexports.constant = constant;\nconst findGCD = (num1, num2) => {\n    let a = Math.abs(num1);\n    let b = Math.abs(num2);\n    while (a && b && a !== b) {\n        if (a > b) {\n            [a, b] = [a - b, b];\n        }\n        else {\n            [a, b] = [a, b - a];\n        }\n        ;\n    }\n    ;\n    return a || b;\n};\nexports.findGCD = findGCD;\nconst reduce = (a, b) => [a / exports.findGCD(a, b), b / exports.findGCD(a, b)];\nexports.reduce = reduce;\n\n\n//# sourceURL=webpack:///./src/math/utils.ts?");

/***/ })

/******/ });