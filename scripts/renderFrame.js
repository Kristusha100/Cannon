function renderFrame () {
    // console.log(bullets.length, bullets)
    clearCanvas()
    drawCannon()
    drawBullets()
    updateBulletPositions()
    requestAnimationFrame(renderFrame)
}
