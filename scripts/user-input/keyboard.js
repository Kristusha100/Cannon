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

    // sanitizeCannonAngle
    const farthermostBarrelPointX = cannonX + cannonWidth * Math.cos(cannonAngle)
    const farthermostBarrelPointY = cannonY - cannonWidth * Math.sin(cannonAngle)

    function barrelOfOfScreen () {
        return (farthermostBarrelPointX < 0) ||
            (farthermostBarrelPointX > canvas.width) ||
            (farthermostBarrelPointY < 0) ||
            (farthermostBarrelPointY > canvas.height)
    }

    if (barrelOfOfScreen()) {
        switch (event.key) {
            case 'ArrowLeft':
            case 'ArrowRight':
                
                /*
                Arc-functions change sign weirdly depending on the particular edge
                and the clock- or counter-clock-wise movement. BEWARE!
                */
                
                if (farthermostBarrelPointX < 0) {
                    cannonAngle = Math.acos((0 - cannonX) / cannonWidth)
                    if (event.key === 'ArrowRight') {
                        cannonAngle = -cannonAngle
                    }
                }

                if (farthermostBarrelPointX > canvas.width) {
                    cannonAngle = Math.acos((canvas.width - cannonX) / cannonWidth)
                    if (event.key === 'ArrowLeft') {
                        cannonAngle = -cannonAngle
                    }
                }
                
                if (farthermostBarrelPointY < 0) {
                    cannonAngle = Math.asin((cannonY - 0) / cannonWidth)
                    if (event.key === 'ArrowRight') {
                        cannonAngle = Math.PI - cannonAngle
                    }
                }

                if (farthermostBarrelPointY > canvas.height) {
                    cannonAngle = Math.asin((cannonY - canvas.height) / cannonWidth)
                    if (event.key === 'ArrowLeft') {
                        cannonAngle = Math.PI - cannonAngle
                    }
                }

                break

            case 'ArrowUp':
                if (farthermostBarrelPointX < 0) {
                    const allowedVx = farthermostBarrelPointX
                    const allowedVy = allowedVx * Math.tan(cannonAngle)
                    cannonX -= allowedVx
                    cannonY += allowedVy
                } else if (farthermostBarrelPointX > canvas.width) {
                    const allowedVx = canvas.width - farthermostBarrelPointX
                    const allowedVy = allowedVx * Math.tan(cannonAngle)
                    cannonX += allowedVx
                    cannonY += allowedVy
                }
                if (farthermostBarrelPointY < 0) {
                    const allowedVy = farthermostBarrelPointY
                    const allowedVx = allowedVy / Math.tan(cannonAngle)
                    cannonX -= allowedVx
                    cannonY -= allowedVy
                } else if (farthermostBarrelPointY > canvas.height) {
                    const allowedVy = canvas.height - farthermostBarrelPointY
                    const allowedVx = allowedVy / Math.tan(cannonAngle)
                    cannonX += allowedVx
                    cannonY += allowedVy
                } else {
                    cannonX -= cannonV * Math.cos(cannonAngle)
                    cannonY += cannonV * Math.sin(cannonAngle)
                }
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
