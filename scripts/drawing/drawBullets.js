function drawBullets () {
    bullets.map(drawBullet)
}

function drawBullet (bullet) {
    drawRound(bullet.x, bullet.y, bulletRadius) 
}
