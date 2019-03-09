const Regl = require('regl')
const Resl = require('resl')

var zoom = 16
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
    uniform vec2 numTiles;
    uniform vec2 tileIndex;
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

    uniform vec2 numTiles;
    uniform vec2 tileIndex;
    uniform vec2 screenShape;
    uniform vec2 videoShape;

    varying vec2 uv;

    void main () {
      uv = 0.5 * (1.0 + position);
      vec2 index = tileIndex / numTiles;
      vec2 size = 1.0 / numTiles;
      vec2 pos = 1.0 - 2.0 * mix(index, index + size, uv);
      gl_Position = vec4(pos, 0, 1);
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

    numTiles: regl.prop('numTiles'),
    tileIndex: regl.prop('tileIndex'),

    videoTexture: regl.prop('videoTexture'),
    videoShape: regl.prop('videoShape'),
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
    var numTiles = [zoom, zoom]

    video.autoplay = true
    video.loop = true
    video.muted = true
    video.play()

    var videoShape = [video.videoWidth, video.videoHeight]

    var textures = []
    for (let i = 0; i < numTiles[0] * numTiles[1]; i++) {
      textures.push(regl.texture({
        shape: videoShape
      }))
    }

    var index = 0
    regl.frame(() => {
      textures[index].subimage(video)

      for (var x = 0; x < numTiles[0]; x++) {
        for (var y = 0; y < numTiles[1]; y++) {
          var tileIndex = (1 + index + x + y * numTiles[0]) % textures.length
          drawVideo({
            numTiles,
            videoTexture: textures[tileIndex],
            videoShape,
            tileIndex: [x, y],
          })
        }
      }

      index = (index + 1) % textures.length
    })
  }
})
