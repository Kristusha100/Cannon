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

    function barrelOfOfScreen () {
        const farthermostBarrelPointX = cannonX + cannonWidth * Math.cos(cannonAngle)
        const farthermostBarrelPointY = cannonY - cannonWidth * Math.sin(cannonAngle)
        return (farthermostBarrelPointX < 0) ||
            (farthermostBarrelPointX > canvas.width) ||
            (farthermostBarrelPointY < 0) ||
            (farthermostBarrelPointY > canvas.height)
    }

    // sanitizeCannonAngle
    if (barrelOfOfScreen()) {
        switch (event.key) {
            case 'ArrowLeft':
                cannonAngle -= 0.1
                break
            case 'ArrowRight':
                cannonAngle += 0.1
                break
            case 'ArrowUp':
                cannonX -= cannonV * Math.cos(cannonAngle)
                cannonY += cannonV * Math.sin(cannonAngle)
                break
            case 'ArrowDown':
                cannonX += cannonV * Math.cos(cannonAngle)
                cannonY -= cannonV * Math.sin(cannonAngle)
                break
        }
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
