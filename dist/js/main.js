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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("window.addEventListener('DOMContentLoaded', function () {\n  swipeView();\n  chat();\n  clock();\n\n  function clock() {\n    var elClock = document.querySelector('#clock');\n    setInterval(function () {\n      var date = new Date().toLocaleString('ru', {\n        hour: '2-digit',\n        minute: '2-digit',\n        second: '2-digit'\n      });\n      elClock.innerHTML = date;\n    }, 1000);\n  }\n\n  function chat() {\n    var form = document.querySelector('#chat-form');\n\n    var bodyMsg = function bodyMsg(text) {\n      return \"<div class=\\\"chat__msg\\\">\".concat(text, \"</div>\");\n    };\n\n    var chatMsgs = document.querySelector('.chat__masseges');\n    form.addEventListener('submit', function (e) {\n      e.preventDefault();\n      var msg = form.querySelector('#form-msg');\n      console.log(msg.value);\n      chatMsgs.insertAdjacentHTML('beforeend', bodyMsg(msg.value.replace(/([^>])\\n+/g, '$1<br/>')));\n      chatMsgs.scrollTo({\n        top: chatMsgs.scrollHeight\n      });\n      form.reset();\n    });\n  }\n\n  function swipeView() {\n    var content = document.querySelector('.content');\n    var contentItems = content.querySelectorAll('.content__item');\n    var currentItem = 0;\n    var totalItems = contentItems.length;\n    var Xstart = 0;\n    var Xmove = 0;\n    var distance = 0;\n    var viewDist = 0;\n    var transX = content.style.transform.replace(/[^\\-.\\d]/g, \"\") || 0;\n    content.addEventListener('touchstart', touchStart);\n\n    function touchStart(e) {\n      Xstart = e.changedTouches[0].clientX;\n      transX = content.style.transform.replace(/[^\\-.\\d]/g, \"\") || 0;\n      Ystart = e.changedTouches[0].clientY;\n      content.addEventListener('touchmove', touchMove);\n      content.addEventListener('touchend', touchEnd);\n    }\n\n    function touchMove(e) {\n      Xmove = e.changedTouches[0].clientX;\n      distance = Xmove - Xstart; //start проверки и прерывания на горизонтальные или вертикальные свайпы\n\n      Ymove = e.changedTouches[0].clientY;\n      Ydist = Ymove - Ystart;\n\n      if (Math.abs(Ydist) > 0 && Math.abs(Ydist) >= Math.abs(distance)) {\n        content.style.transform = \"translateX(\".concat(transX, \"%)\");\n        return content.removeEventListener('touchmove', touchMove);\n      }\n\n      distance > 0 ? e.preventDefault() : null; //end проверки и прерывания на горизонтальные или вертикальные свайпы\n      //start произвольный сдвиг не более 50пикс\n\n      viewDist = distance;\n      distance > 50 ? viewDist = 50 : null;\n      viewDist < -50 ? viewDist = -50 : null; //end произвольный сдвиг не более 50пикс\n\n      content.style.transform = \"translateX(calc(\".concat(transX, \"% + \").concat(viewDist, \"px))\");\n    }\n\n    function touchEnd(e) {\n      var distForSwipe = window.getComputedStyle(contentItems[0]).width.replace(/[^\\-.\\d]/g, \"\") * 0.3;\n      var distForBackSwipe = distForSwipe * -1;\n\n      if (distance < 0 && distance < distForBackSwipe) {\n        //swipe to left - go right\n        currentItem++;\n      } else if (distance > 0 && distance > distForSwipe) {\n        //swipe to right - go left\n        currentItem--;\n      }\n\n      currentItem < 0 ? currentItem = 0 : currentItem >= totalItems ? currentItem = totalItems - 1 : null;\n      content.style.transform = \"translateX(\".concat(currentItem * -100, \"%)\");\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/js/main.js?");

/***/ })

/******/ });