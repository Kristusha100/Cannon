function drawCannon () {
    drawRound(cannonX, cannonY, cannonRadius)
    ctx.beginPath()
    ctx.moveTo(cannonX, cannonY)
    const xProjection = cannonWidth * Math.cos(cannonAngle)
    const yProjection = cannonWidth * Math.sin(cannonAngle)
    ctx.lineTo(cannonX + xProjection, cannonY - yProjection)
    ctx.stroke()
}
