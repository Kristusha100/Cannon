// how to do so that the cannon's barrel doesn't go off-screen?

function degreesToRadians (degrees) {
    return Math.PI * degrees / 180 
}

const canvas = document.getElementById('MyCanvas')
const ctx = canvas.getContext("2d")

canvas.width = canvas.clientWidth
canvas.height = canvas.clientHeight

const cannonWidth = 100
const cannonHeight = 50
const cannonRadius = 20
const startBulletVelocity = 50
const bulletRadius = 5
const g = 1
const collisionLosses = 0.5
const airLosses = 0.99

let bullets = []
let cannonX = cannonRadius
let cannonY = canvas.height - cannonRadius
const cannonV = 5
let cannonAngle = degreesToRadians(10)
const minCannonAngle = -Infinity // degreesToRadians(10)
const maxCanonAngle = Infinity // degreesToRadians(80)

function renderFrame () {
    // console.log(bullets.length, bullets)
    clearCanvas()
    drawCannon()
    drawBullets()
    updateBulletPositions()
    requestAnimationFrame(renderFrame)
}

function reactToKeyboardInput (event) {
    switch (event.key) {
        case 'ArrowLeft':
            cannonAngle += 0.1
            break
        case 'ArrowRight':
            cannonAngle -= 0.1
            break
        case 'ArrowUp':
            cannonX += cannonV * Math.cos(cannonAngle)
            cannonY -= cannonV * Math.sin(cannonAngle)
            break
        case 'ArrowDown':
            cannonX -= cannonV * Math.cos(cannonAngle)
            cannonY += cannonV * Math.sin(cannonAngle)
            break
        case ' ':
            shoot()
    }

    // sanitizeCannonState

    // don't allow barrel rotation beyond certain limits
    // sanitizeCannonAngle
    if (cannonAngle > maxCanonAngle) {
        cannonAngle = maxCanonAngle
    }
    if (cannonAngle < minCannonAngle) {
        cannonAngle = minCannonAngle
    }

    // don't allow movement beyond the edge of the screen
    // sanitizeCannonPosition
    if (cannonX < cannonRadius) {
        cannonX = cannonRadius
    }
    if (cannonX > canvas.width - cannonRadius) {
        cannonX = canvas.width - cannonRadius
    }
    if (cannonY < cannonRadius) {
        cannonY = cannonRadius
    }
    if (cannonY > canvas.height - cannonRadius) {
        cannonY = canvas.height - cannonRadius
    }
}

function clearCanvas () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function drawCannon () {
    drawRound(cannonX, cannonY, cannonRadius)
    ctx.beginPath()
    ctx.moveTo(cannonX, cannonY)
    const xProjection = cannonWidth * Math.cos(cannonAngle)
    const yProjection = cannonWidth * Math.sin(cannonAngle)
    ctx.lineTo(cannonX + xProjection, cannonY - yProjection)
    ctx.stroke()
}

function drawBullets () {
    bullets.map(drawBullet)
}

function drawRound (x, y, r) {
    ctx.beginPath()
    ctx.arc(x, y, r, 0, 2*Math.PI)
    ctx.fill()
    ctx.stroke()  
}

function drawBullet (bullet) {
    drawRound(bullet.x, bullet.y, bulletRadius) 
}

function updateBulletPositions () {
    bullets.map(updateBulletPosition)
}

function updateBulletPosition (bullet) {
    bullet.x += bullet.vx
    bullet.y += bullet.vy

    // gravity, beatch!
    bullet.vy += g
    // console.log(bullet.vy)

    // air is not vacuum, too
    bullet.vx *= airLosses
    // console.log(bullet.vx)
    
    if (bullet.y <= 0) {
        bullet.y = 0 // -bullet.y // or just 0
        bullet.vy = -bullet.vy 
    }

    const dy = bullet.y - canvas.height
    if (dy > 0) {
        bullet.y = canvas.height // - dy // or just canvas.height
        bullet.vy = -bullet.vy * collisionLosses
    }

    if (bullet.x > canvas.width || bullet.x < 0) {
        bullets = bullets.filter(b => b !== bullet)
    }
}

function shoot () {
    bullets.push({
        vx: startBulletVelocity * Math.cos(cannonAngle),
        vy: -startBulletVelocity * Math.sin(cannonAngle),
        x: cannonX + cannonWidth * Math.cos(cannonAngle),
        y: cannonY - cannonWidth * Math.sin(cannonAngle),
    })
}

document.addEventListener('keydown', reactToKeyboardInput)
requestAnimationFrame(renderFrame)
