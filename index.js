var zoom = 0.2

function kaleidotube () {
  var videoEl = document.createElement('video')
  videoEl.src = "file:///home/dinosaur/Videos/POGO - Alice-pAwR6w2TgxY.mkv"
  videoEl.setAttribute('autoplay', true)
  videoEl.setAttribute('loop', true)
  document.body.appendChild(videoEl)

  var canvasIndex = 0
  var canvasEls = []
  var canvasContexts = []

  videoEl.addEventListener('loadedmetadata', initVideo, false)
  videoEl.addEventListener('timeupdate', drawFrame, false)

  function initVideo (e) {
    var width = this.videoWidth * zoom
    var height = this.videoHeight * zoom

    this.width = width
    this.height = height

    for (var i = 0; i < (window.innerWidth / width); i++) {
      for (var j = 0; j < (window.innerHeight / height); j++) {
        let canvasEl = document.createElement('canvas')
        let canvasContext = canvasEl.getContext('2d')
        canvasEl.width = width
        canvasEl.height = height
        canvasEls.push(canvasEl)
        canvasContexts.push(canvasContext)
        document.body.appendChild(canvasEl)
      }
    }
  }

  function drawFrame (e) {
    console.log('canvasIndex', canvasIndex, canvasContexts)
    canvasContexts[canvasIndex].drawImage(this, 0, 0)
    canvasIndex = (canvasIndex + 1) % canvasEls.length
  }
}

kaleidotube()
