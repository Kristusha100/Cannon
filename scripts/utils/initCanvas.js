function initCanvas (canvasId) {
    const canvas = document.getElementById(canvasId)
    const ctx = canvas.getContext("2d")

    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight

    return {
        canvas,
        ctx
    }
}
