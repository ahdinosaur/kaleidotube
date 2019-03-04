var zoom = 0.5

function kaleidotube () {
  var videoEl = document.createElement('video')
  videoEl.src = "file:///home/dinosaur/Videos/POGO - Alice-pAwR6w2TgxY.mkv"
  videoEl.setAttribute('autoplay', true)
  videoEl.setAttribute('loop', true)
  document.body.appendChild(videoEl)

  var width = 0
  var height = 0

  var canvasIndex = 0
  var numCanvases = 0

  var canvasEls = window.canvasEls = []

  videoEl.addEventListener('loadedmetadata', initVideo, false)
  videoEl.addEventListener('timeupdate', drawFrame, false)

  function initVideo (e) {
    width = this.videoWidth * zoom
    height = this.videoHeight * zoom

    this.width = width
    this.height = height

    numCanvases = Math.floor(window.innerWidth / width) * Math.floor(window.innerHeight / height)
    console.log(numCanvases)
  }

  var drawing = false
  function drawFrame (e) {
    if (drawing) return
    drawing = true
    requestAnimationFrame(() => {
      let canvasEl = document.createElement('canvas')
      let canvasContext = canvasEl.getContext('2d')
      canvasEl.width = this.videoWidth
      canvasEl.height = this.videoHeight
      canvasEl.style.width = `${width}px`
      canvasEl.style.height = `${height}px`
      canvasEls.push(canvasEl)
      document.body.insertBefore(canvasEl, videoEl)

      canvasContext.drawImage(this, 0, 0)

      canvasIndex++
      if (canvasIndex >= numCanvases) {
        document.body.removeChild(canvasEls.shift())
      }

      drawing = false
    })
  }
}

kaleidotube()
