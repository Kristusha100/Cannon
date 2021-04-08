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
