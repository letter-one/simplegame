// UTIlITY FUNCTI0N$
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function roundRect(canvas, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke == 'undefined') {
    stroke = true;
  }

  if (typeof radius === 'number') {
    radius = {tl: radius, tr: radius, br: radius, bl: radius};
  } else {
    var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
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
  } if (stroke) {
    canvas.stroke();
  }

}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1
    const yDist = y2 - y1

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

// Init variables
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight + 20

const mouse = {
    x: canvas.width / 2,
    y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Other vars
let player
let playerX = canvas.width/2
let playerY = canvas.height/2

let direction
let playerSpeed = 4
let playerStroke = "white"

let fast = false
let stopped = true
let weak = false
let stamina = 100
let health = 300
const regen = 2
let add = true
let canFire = true
let start = true
let bullets = []
let i

let xDiff
let yDiff
let xMove
let yMove
const fract = 190

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})

// Key Listeners
document.onkeydown = checkKey;

function checkKey(e) {
    e = e || window.event;

    if (e.keyCode == '87' && playerStroke != "orange") {
        if (fast == true) {
            fast = false
            playerSpeed = 4
        } if (fast == false) {
            if (weak == true) {
                playerSpeed = 4
            } else {
                playerSpeed = 6
            }
            fast = true
            stamina -= 4
        }
    }

    if (e.keyCode == '32' && playerStroke != "orange" && canFire) {
        canFire = false
        fire()
        for (var i = 1; i < 4; i++) {
            setTimeout(function() {
                fire()
            }, 5 * i)
        }
        setTimeout(function() {
            canFire = true
        }, 400)
    }
}

function updatePlayer() {


    xDiff = mouse.x - playerX
    yDiff = mouse.y - playerY

    playerX += xDiff/(fract / playerSpeed)
    playerY += yDiff/(fract / playerSpeed)

    if (playerX < 35 || playerY < 35 || playerX > canvas.width-35 || playerY > canvas.height-35 || stamina <= 0) {
        playerSpeed = 1
        fast = false
        playerStroke = "orange"
        i = randomIntFromRange(1, 20)
        if (i <= 4) {
            health -= 4
        }
    } else {
        playerStroke = "white"
    }
}

// Objects
function Bullet(x, y, dx, dy) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
}

Bullet.prototype.update = function() {
    this.x += this.dx
    this.y += this.dy
    this.draw()
}

Bullet.prototype.draw = function() {
    c.beginPath()
    c.arc(this.x, this.y, 4, 0, Math.PI * 2, false)
    c.fillStyle = "darkkhaki"
    c.fill()
    c.strokeStyle = "#111"
    c.lineWidth = 2
    c.stroke()
    c.closePath()
}

function fire() {
    if (fast == false) {
        bullets.push(new Bullet(playerX, playerY, xDiff/(fract / playerSpeed)*4 + 0.7*(Math.random() - 0.5), yDiff/(fract / playerSpeed)*5 + 0.7*(Math.random() - 0.5)))
    }
}

// Implementation
function init() {
    c.lineWidth = 5
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = "rgb(0, 0, 0, 0.1)"
    c.fillRect(0, 0, canvas.width, canvas.height)

    if (fast == false) {
        c.stroke()
        if (stamina < 100 && add == true && health >= 60) {
            i = randomIntFromRange(1, 2)
            if (i == 1) {
                stamina += 1
            } if (stopped) {
                stamina += 1
            }
        } if (stamina < 100 && health < 60) {
            i = randomIntFromRange(1, 10)
            if (i == 1) {
                stamina += 1
            }
        }

        if (health < 300 && stamina > 66) {
            i = randomIntFromRange(1, 10)
            if (i <= regen) {
                health += 1
            } if (i > 7 && stopped == true && stamina >= 290) {
                health += 1
            }
        }
    } else { stamina -= 1 }

    c.strokeStyle = "gray"

    if (health <= 60) {
        c.fillStyle = "red"
        weak = true
    } else {
        c.fillStyle = "limegreen"
        weak = false
    }
    c.fillRect(canvas.width/2, canvas.height - 70, health * 0.6666667, 30)
    c.strokeRect(canvas.width/2, canvas.height - 70, 200, 30)
        
    if (stamina <= 20) {
        c.fillStyle = "red"
        weak = true
    } else {
        c.fillStyle = "yellow"
        weak = false
    }
    c.fillRect(canvas.width/2 - stamina*2, canvas.height - 70, stamina*2, 30)
    c.strokeRect(canvas.width/2 - 200, canvas.height - 70, 200, 30)

    for (var i = bullets.length - 1; i >= 0; i--) {
        bullets[i].update()
        if (bullets[i].x < -20 || bullets[i].y < -20 || bullets[i].x > canvas.width + 20 || bullets[i].y > canvas.height + 20) {
            bullets.splice(i, 1)
        }
    }
    c.lineWidth = 5
    c.strokeStyle = playerStroke
    c.fillStyle = "#348"
    c.beginPath()
    player = c.arc(playerX, playerY, 12, 0, Math.PI * 2, false)
    c.closePath()
    c.fill()
    updatePlayer()
}

init()
animate()

setTimeout(function() {
    playerSpeed = 7
    fast = true
    stamina -= 4
}, 100)
