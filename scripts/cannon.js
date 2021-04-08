// how to do so that the cannon's barrel doesn't go off-screen?

const { canvas, ctx } = initCanvas('MyCanvas')
cannonY = canvas.height - cannonRadius

document.addEventListener('keydown', reactToKeyboardInput)
requestAnimationFrame(renderFrame)
