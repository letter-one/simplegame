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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/canvas.js":
/*!***********************!*\
  !*** ./src/canvas.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// UTIlITY FUNCTI0N$
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function roundRect(canvas, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke == 'undefined') {
        stroke = true;
    }

    if (typeof radius === 'number') {
        radius = { tl: radius, tr: radius, br: radius, bl: radius };
    } else {
        var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
        for (var side in defaultRadius) {
            radius[side] = radius[side] || defaultRadius[side];
        }
    }

    canvas.beginPath();
    canvas.moveTo(x + radius.tl, y);
    canvas.lineTo(x + width - radius.tr, y);
    canvas.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    canvas.lineTo(x + width, y + height - radius.br);
    canvas.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    canvas.lineTo(x + radius.bl, y + height);
    canvas.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    canvas.lineTo(x, y + radius.tl);
    canvas.quadraticCurveTo(x, y, x + radius.tl, y);
    canvas.closePath();

    if (fill) {
        canvas.fill();
    }if (stroke) {
        canvas.stroke();
    }
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
    var xDist = x2 - x1;
    var yDist = y2 - y1;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

// Init variables
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight + 20;

var mouse = {
    x: canvas.width / 2,
    y: innerHeight / 2
};

var colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

// Other vars
var player = void 0;
var playerX = canvas.width / 2;
var playerY = canvas.height / 2;

var direction = void 0;
var playerSpeed = 4;
var playerStroke = "white";

var fast = false;
var stopped = true;
var weak = false;
var stamina = 100;
var health = 300;
var regen = 2;
var add = true;
var canFire = true;
var start = true;
var bullets = [];
var i = void 0;

var xDiff = void 0;
var yDiff = void 0;
var xMove = void 0;
var yMove = void 0;
var fract = 190;

// Event Listeners
addEventListener('mousemove', function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

addEventListener('resize', function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
});

// Key Listeners
document.onkeydown = checkKey;

function checkKey(e) {
    e = e || window.event;

    if (e.keyCode == '87' && playerStroke != "orange") {
        if (fast == true) {
            fast = false;
            playerSpeed = 4;
        }if (fast == false) {
            if (weak == true) {
                playerSpeed = 4;
            } else {
                playerSpeed = 6;
            }
            fast = true;
            stamina -= 4;
        }
    }

    if (e.keyCode == '32' && playerStroke != "orange" && canFire) {
        canFire = false;
        fire();
        for (var i = 1; i < 4; i++) {
            setTimeout(function () {
                fire();
            }, 5 * i);
        }
        setTimeout(function () {
            canFire = true;
        }, 400);
    }
}

function updatePlayer() {

    xDiff = mouse.x - playerX;
    yDiff = mouse.y - playerY;

    playerX += xDiff / (fract / playerSpeed);
    playerY += yDiff / (fract / playerSpeed);

    if (playerX < 35 || playerY < 35 || playerX > canvas.width - 35 || playerY > canvas.height - 35 || stamina <= 0) {
        playerSpeed = 1;
        fast = false;
        playerStroke = "orange";
        i = randomIntFromRange(1, 20);
        if (i <= 4) {
            health -= 4;
        }
    } else {
        playerStroke = "white";
    }
}

// Objects
function Bullet(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
}

Bullet.prototype.update = function () {
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
};

Bullet.prototype.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, 4, 0, Math.PI * 2, false);
    c.fillStyle = "darkkhaki";
    c.fill();
    c.strokeStyle = "#111";
    c.lineWidth = 2;
    c.stroke();
    c.closePath();
};

function fire() {
    if (fast == false) {
        bullets.push(new Bullet(playerX, playerY, xDiff / (fract / playerSpeed) * 4 + 0.7 * (Math.random() - 0.5), yDiff / (fract / playerSpeed) * 5 + 0.7 * (Math.random() - 0.5)));
    }
}

// Implementation
function init() {
    c.lineWidth = 5;
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = "rgb(0, 0, 0, 0.1)";
    c.fillRect(0, 0, canvas.width, canvas.height);

    if (fast == false) {
        c.stroke();
        if (stamina < 100 && add == true && health >= 60) {
            i = randomIntFromRange(1, 2);
            if (i == 1) {
                stamina += 1;
            }if (stopped) {
                stamina += 1;
            }
        }if (stamina < 100 && health < 60) {
            i = randomIntFromRange(1, 10);
            if (i == 1) {
                stamina += 1;
            }
        }

        if (health < 300 && stamina > 66) {
            i = randomIntFromRange(1, 10);
            if (i <= regen) {
                health += 1;
            }if (i > 7 && stopped == true && stamina >= 290) {
                health += 1;
            }
        }
    } else {
        stamina -= 1;
    }

    c.strokeStyle = "gray";

    if (health <= 60) {
        c.fillStyle = "red";
        weak = true;
    } else {
        c.fillStyle = "limegreen";
        weak = false;
    }
    c.fillRect(canvas.width / 2, canvas.height - 70, health * 0.6666667, 30);
    c.strokeRect(canvas.width / 2, canvas.height - 70, 200, 30);

    if (stamina <= 20) {
        c.fillStyle = "red";
        weak = true;
    } else {
        c.fillStyle = "yellow";
        weak = false;
    }
    c.fillRect(canvas.width / 2 - stamina * 2, canvas.height - 70, stamina * 2, 30);
    c.strokeRect(canvas.width / 2 - 200, canvas.height - 70, 200, 30);

    for (var i = bullets.length - 1; i >= 0; i--) {
        bullets[i].update();
        if (bullets[i].x < -20 || bullets[i].y < -20 || bullets[i].x > canvas.width + 20 || bullets[i].y > canvas.height + 20) {
            bullets.splice(i, 1);
        }
    }
    c.lineWidth = 5;
    c.strokeStyle = playerStroke;
    c.fillStyle = "#348";
    c.beginPath();
    player = c.arc(playerX, playerY, 12, 0, Math.PI * 2, false);
    c.closePath();
    c.fill();
    updatePlayer();
}

init();
animate();

setTimeout(function () {
    playerSpeed = 7;
    fast = true;
    stamina -= 4;
}, 100);

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map