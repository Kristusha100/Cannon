function drawRound (x, y, r) {
    ctx.beginPath()
    ctx.arc(x, y, r, 0, 2*Math.PI)
    ctx.fill()
    ctx.stroke()  
}
