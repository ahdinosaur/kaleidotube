const Regl = require('regl')
const Resl = require('resl')

var zoom = 1
var speed = 1
// youtube-dl https://youtu.be/pAwR6w2TgxY
var videoUrl = "file:///home/dinosaur/Videos/POGO - Alice-pAwR6w2TgxY.mkv"

const regl = Regl()


// TODO
// each video tile has a texture
// each texture contains all the frames for the time
// on render, iterate through textures with different start texture and start index
// on frame, add frame to next texture and index

const drawVideo = regl({
  frag: `
    precision mediump float;
    uniform vec2 screenShape;
    uniform sampler2D videoTexture;
    uniform vec2 videoShape;
    varying vec2 uv;

    void main () {
      gl_FragColor = texture2D(videoTexture, uv);
    }
  `,

  vert: `
    precision mediump float;
    attribute vec2 position;
    uniform vec2 videoIndex;
    varying vec2 uv;

    void main () {
      uv = vec2(1.0 - position.x, position.y);
      gl_Position = vec4(1.0 - 2.0 * position, 0, 1);
    }
  `,

  attributes: {
    position: [
      [-1, -1], [+1, +1], [-1, +1],
      [-1, -1], [+1, -1], [+1, +1]
    ]
  },

  uniforms: {
    screenShape: ({viewportWidth, viewportHeight}) => {
      return [viewportWidth, viewportHeight]
    },

    videoTexture: regl.prop('texture'),
    videoShape: regl.prop('videoShape'),
  },

  depth: {
    enable: false
  },
  cull: {
    enable: true
  },
  count: 6
})

Resl({
  manifest: {
    video: {
      type: 'video',
      src: videoUrl,
      stream: true
    }
  },

  onDone: ({ video }) => {
    var screenIndexX = 0
    var screenIndexY = 0

    var numScreensX = zoom
    var numScreensY = zoom

    video.autoplay = true
    video.loop = true
    video.muted = true
    video.play()

    console.log(regl.limits)
    console.log('width', video.videoWidth * numScreensX * numScreensY * speed)

    var textures = []
    for (var i = 0; i < numScreensX * numScreensY; i++) {
      textures.push(regl.texture({
        width: video.videoWidth * speed,
        height: video.videoHeight
      }))
    }

    regl.frame(() => {
      var x = video.videoWidth * screenIndexX
      var y = 0
      
      textures[screenIndexY].subimage(video, x, y)

      drawVideo({
        texture: textures[0],
        videoShape: [video.videoWidth, video.videoHeight]
      })

      screenIndexX++
      if (screenIndexX >= numScreensX * speed) {
        screenIndexX = 0
        screenIndexY++
      }
      if (screenIndexY >= numScreensY) {
        screenIndexY = 0
      }
    })
  }
})
