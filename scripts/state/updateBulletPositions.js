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
