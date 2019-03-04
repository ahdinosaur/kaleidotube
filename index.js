var zoom = 0.5
var speed = 250
// youtube-dl https://youtu.be/pAwR6w2TgxY
var videoUrl = "file:///home/dinosaur/Videos/POGO - Alice-pAwR6w2TgxY.mkv"

kaleidotube()

function kaleidotube () {
  var videosContainer = document.querySelector('.videos')

  var originalVideoEl = document.createElement('video')
  originalVideoEl.src = videoUrl
  originalVideoEl.setAttribute('loop', true)
  videosContainer.appendChild(originalVideoEl)

  var width = 0
  var height = 0

  originalVideoEl.addEventListener('loadedmetadata', initVideo, false)

  function initVideo (e) {
    width = this.videoWidth * zoom
    height = this.videoHeight * zoom

    var numVideos = Math.floor(window.innerWidth / width) * Math.floor(window.innerHeight / height)
    var videos = [originalVideoEl]
    for (var i = 0; i < numVideos - 1; i++) {
      var nextVideoEl = originalVideoEl.cloneNode()
      nextVideoEl.muted = true
      videosContainer.appendChild(nextVideoEl)
      videos.push(nextVideoEl)
    }

    videos.forEach(video => {
      video.width = width
      video.height = height
    })

    var videoIndex = 0
    iterateVideos()
    function iterateVideos () {
      videos[videoIndex++].play()
      if (videoIndex < videos.length) {
        setTimeout(iterateVideos, speed)
      }
    }
  }
}
