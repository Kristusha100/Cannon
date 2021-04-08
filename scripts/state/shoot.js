function shoot () {
    bullets.push({
        vx: startBulletVelocity * Math.cos(cannonAngle),
        vy: -startBulletVelocity * Math.sin(cannonAngle),
        x: cannonX + cannonWidth * Math.cos(cannonAngle),
        y: cannonY - cannonWidth * Math.sin(cannonAngle),
    })
}
