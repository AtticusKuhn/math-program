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
eval("\nclass Nop {\n    constructor(matches, name, vals = []) {\n        this.matches = matches;\n        this.name = name;\n        this.vals = vals;\n    }\n    parse(input) {\n        let cp_matches = this.matches;\n        let sampleRegex = new RegExp(cp_matches.map(m => {\n            if (typeof m === \"number\") {\n                return \"(.+?)\";\n            }\n            else {\n                return m.toString().substring(1, m.toString().length - 1);\n            }\n        }).join(\"\"));\n        console.log({ sampleRegex });\n        let found = input.match(sampleRegex);\n        if (!found) {\n            return null;\n        }\n        found = [...found].slice(1);\n        const mappedArgs = sequence(found.map(parse));\n        if (!mappedArgs) {\n            return null;\n        }\n        return {\n            value: this,\n            arguements: mappedArgs,\n        };\n    }\n}\nclass Plus extends Nop {\n    constructor() {\n        super([1, /\\+/, 2], \"plus\");\n        this.matches = [1, /\\+/, 2];\n    }\n}\nclass Minus extends Nop {\n    constructor() {\n        super([1, /-/, 2], \"minus\");\n        this.matches = [1, /-/, 2];\n    }\n}\nclass Digit extends Nop {\n    constructor() {\n        super([/[0-9]+/], \"digit\");\n        this.matches = [/[0-9]+/];\n        this.value = 0;\n    }\n    parse(input) {\n        this.value = parseInt(input);\n        return {\n            value: this,\n        };\n    }\n}\nconst ops = [Plus, Minus, Digit];\nconst id = (x) => x;\nconst sequence = (xs) => xs.every(id) ? xs : null;\nconst cls = ops.map(o => new o());\nconst parse = (input) => {\n    const a = cls.find(cl => cl.parse(input));\n    return a ? a.parse(input) : null;\n};\nconst simplifiy = (expr) => {\n    return expr;\n};\nconsole.log(JSON.stringify(parse(\"1+100\"), null, 4));\ntry {\n    Object.assign(window, { parse });\n}\ncatch (_a) { }\n\n\n//# sourceURL=webpack:///./src/math/index.ts?");

/***/ })

/******/ });