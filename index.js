const Regl = require('regl')
const Resl = require('resl')

var zoom = 12
var speed = 1
// youtube-dl https://youtu.be/pAwR6w2TgxY
var videoUrl = "file:///home/dinosaur/Videos/POGO - Alice-pAwR6w2TgxY.mkv"

const regl = Regl()

const drawKaleidotube = regl({
  frag: `
  precision mediump float;
  uniform sampler2D texture0;
  uniform sampler2D texture1;
  uniform sampler2D texture2;
  uniform sampler2D texture3;
  uniform sampler2D texture4;
  uniform sampler2D texture5;
  uniform sampler2D texture6;
  uniform sampler2D texture7;
  uniform sampler2D texture8;
  uniform sampler2D texture9;
  uniform sampler2D texture10;
  uniform sampler2D texture11;
  uniform sampler2D texture12;
  uniform vec2 screenShape;
  uniform vec2 videoShape;
  uniform float videoAspectRatio;
  uniform float frame;
  uniform float zoom;
  varying vec2 uv;

  float walk (float numSteps, float index) {
    return floor(numSteps * index) / numSteps;
  }

  bool inBetween (float start, float stop, float index) {
    if (stop < start) {
      return index > start || index <= stop;
    } else {
      return index > start && index <= stop;
    }
  }

  float revMod (float a, float b) {
    if (a < 0.0) return mod(a + 2.0 * b, b);
    return mod(a, b);
  }

  float map (float x, float in_min, float in_max, float out_min, float out_max) {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }

  void main () {
    /*
     * 

    if (uv.y > y && uv.y <= y + size) {


    gl_FragColor = (1.0 - step(1.0, frame)) * texture2D(texture0, vec2(uv.x, uv.y * zoom));
    gl_FragColor = (step(1.0, frame) - step(2.0, frame)) * texture2D(texture1, vec2(uv.x, uv.y * zoom));

    */

    float size = 1.0 / zoom;
    float y = walk(zoom, frame);
    float x = walk(zoom, mod(frame, zoom));

    if (inBetween(y, mod(y + 1.0 * size, 1.0), uv.y)) {
      if (uv.x < x) {
        gl_FragColor = texture2D(texture0, vec2(uv.x, revMod(uv.y - y, 1.0) * zoom));
      } else {
        gl_FragColor = texture2D(texture1, vec2(uv.x, revMod(uv.y - y, 1.0) * zoom));
      }
    } else if (inBetween(mod(y + 1.0 * size, 1.0), mod(y + 2.0 * size, 1.0), uv.y)) {
      if (uv.x < x) {
        gl_FragColor = texture2D(texture1, vec2(uv.x, revMod(uv.y - y - 1.0 * size, 1.0) * zoom));
      } else {
        gl_FragColor = texture2D(texture2, vec2(uv.x, revMod(uv.y - y - 1.0 * size, 1.0) * zoom));
      }
    } else if (inBetween(mod(y + 2.0 * size, 1.0), mod(y + 3.0 * size, 1.0), uv.y)) {
      if (uv.x < x) {
        gl_FragColor = texture2D(texture2, vec2(uv.x, revMod(uv.y - y - 2.0 * size, 1.0) * zoom));
      } else {
        gl_FragColor = texture2D(texture3, vec2(uv.x, revMod(uv.y - y - 2.0 * size, 1.0) * zoom));
      }
    } else if (inBetween(mod(y + 3.0 * size, 1.0), mod(y + 4.0 * size, 1.0), uv.y)) {
      if (uv.x < x) {
        gl_FragColor = texture2D(texture3, vec2(uv.x, revMod(uv.y - y - 3.0 * size, 1.0) * zoom));
      } else {
        gl_FragColor = texture2D(texture4, vec2(uv.x, revMod(uv.y - y - 3.0 * size, 1.0) * zoom));
      }
    } else if (inBetween(mod(y + 4.0 * size, 1.0), mod(y + 5.0 * size, 1.0), uv.y)) {
      if (uv.x < x) {
        gl_FragColor = texture2D(texture4, vec2(uv.x, revMod(uv.y - y - 4.0 * size, 1.0) * zoom));
      } else {
        gl_FragColor = texture2D(texture5, vec2(uv.x, revMod(uv.y - y - 4.0 * size, 1.0) * zoom));
      }
    } else if (inBetween(mod(y + 5.0 * size, 1.0), mod(y + 6.0 * size, 1.0), uv.y)) {
      if (uv.x < x) {
        gl_FragColor = texture2D(texture5, vec2(uv.x, revMod(uv.y - y - 5.0 * size, 1.0) * zoom));
      } else {
        gl_FragColor = texture2D(texture6, vec2(uv.x, revMod(uv.y - y - 5.0 * size, 1.0) * zoom));
      }
    } else if (inBetween(mod(y + 6.0 * size, 1.0), mod(y + 7.0 * size, 1.0), uv.y)) {
      if (uv.x < x) {
        gl_FragColor = texture2D(texture6, vec2(uv.x, revMod(uv.y - y - 6.0 * size, 1.0) * zoom));
      } else {
        gl_FragColor = texture2D(texture7, vec2(uv.x, revMod(uv.y - y - 6.0 * size, 1.0) * zoom));
      }
    } else if (inBetween(mod(y + 7.0 * size, 1.0), mod(y + 8.0 * size, 1.0), uv.y)) {
      if (uv.x < x) {
        gl_FragColor = texture2D(texture7, vec2(uv.x, revMod(uv.y - y - 7.0 * size, 1.0) * zoom));
      } else {
        gl_FragColor = texture2D(texture8, vec2(uv.x, revMod(uv.y - y - 7.0 * size, 1.0) * zoom));
      }
    } else if (inBetween(mod(y + 8.0 * size, 1.0), mod(y + 9.0 * size, 1.0), uv.y)) {
      if (uv.x < x) {
        gl_FragColor = texture2D(texture8, vec2(uv.x, revMod(uv.y - y - 8.0 * size, 1.0) * zoom));
      } else {
        gl_FragColor = texture2D(texture9, vec2(uv.x, revMod(uv.y - y - 8.0 * size, 1.0) * zoom));
      }
    } else if (inBetween(mod(y + 9.0 * size, 1.0), mod(y + 10.0 * size, 1.0), uv.y)) {
      if (uv.x < x) {
        gl_FragColor = texture2D(texture9, vec2(uv.x, revMod(uv.y - y - 9.0 * size, 1.0) * zoom));
      } else {
        gl_FragColor = texture2D(texture10, vec2(uv.x, revMod(uv.y - y - 9.0 * size, 1.0) * zoom));
      }
    } else if (inBetween(mod(y + 10.0 * size, 1.0), mod(y + 11.0 * size, 1.0), uv.y)) {
      if (uv.x < x) {
        gl_FragColor = texture2D(texture10, vec2(uv.x, revMod(uv.y - y - 10.0 * size, 1.0) * zoom));
      } else {
        gl_FragColor = texture2D(texture11, vec2(uv.x, revMod(uv.y - y - 10.0 * size, 1.0) * zoom));
      }
    } else if (inBetween(mod(y + 11.0 * size, 1.0), y, uv.y)) {
      if (uv.x < x) {
        gl_FragColor = texture2D(texture11, vec2(uv.x, revMod(uv.y - y - 11.0 * size, 1.0) * zoom));
      } else {
        gl_FragColor = texture2D(texture0, vec2(uv.x, revMod(uv.y - y - 11.0 * size, 1.0) * zoom));
      }
    }

    /*
    else if (uv.y < y + 1.0 * size) {
      gl_FragColor = texture2D(texture1, vec2(uv.x, (uv.y - (1.0 / zoom)) * zoom));
    } else if (uv.y < y + 2.0 * size) {
      gl_FragColor = texture2D(texture2, vec2(uv.x, (uv.y - (2.0 / zoom)) * zoom));
    }

    else if (uv.y > y + size && uv.y <= y + 2.0 * size) {
      gl_FragColor = texture2D(texture1, vec2(uv.x, (uv.y - (1.0 / zoom)) * zoom));
    } else if (uv.y > y + 2.0 * size && uv.y <= y + 3.0 * size) {
      gl_FragColor = texture2D(texture2, vec2(uv.x, (uv.y - (2.0 / zoom)) * zoom));
    } else if (uv.y > y + 3.0 * size && uv.y <= y + 4.0 * size) {
      gl_FragColor = texture2D(texture3, vec2(uv.x, (uv.y - (3.0 / zoom)) * zoom));
    } else if (uv.y > y + 4.0 * size && uv.y <= y + 5.0 * size) {
      gl_FragColor = texture2D(texture4, vec2(uv.x, (uv.y - (4.0 / zoom)) * zoom));
    } else if (uv.y > y + 5.0 * size && uv.y <= y + 6.0 * size) {
      gl_FragColor = texture2D(texture5, vec2(uv.x, (uv.y - (5.0 / zoom)) * zoom));
    } else if (uv.y > y + 6.0 * size && uv.y <= y + 7.0 * size) {
      gl_FragColor = texture2D(texture6, vec2(uv.x, (uv.y - (6.0 / zoom)) * zoom));
    } else if (uv.y > y + 7.0 * size && uv.y <= y + 8.0 * size) {
      gl_FragColor = texture2D(texture7, vec2(uv.x, (uv.y - (7.0 / zoom)) * zoom));
    } else if (uv.y > y + 8.0 * size && uv.y <= y + 9.0 * size) {
      gl_FragColor = texture2D(texture8, vec2(uv.x, (uv.y - (8.0 / zoom)) * zoom));
    } else if (uv.y > y + 9.0 * size && uv.y <= y + 10.0 * size) {
      gl_FragColor = texture2D(texture9, vec2(uv.x, (uv.y - (9.0 / zoom)) * zoom));
    } else if (uv.y > y + 10.0 * size && uv.y <= y + 11.0 * size) {
      gl_FragColor = texture2D(texture10, vec2(uv.x, (uv.y - (10.0 / zoom)) * zoom));
    } else if (uv.y > 0.0 && uv.y < y) {
      gl_FragColor = texture2D(texture11, vec2(uv.x, (uv.y - (11.0 / zoom)) * zoom));
    }
    */
  }`,

  vert: `
  precision mediump float;
  attribute vec2 position;
  varying vec2 uv;

  void main () {
    uv = vec2(1.0 - position.x, position.y);
    gl_Position = vec4(1.0 - 2.0 * position, 0, 1);
  }`,

  attributes: {
    position: [
      -2, 0,
      0, -2,
      2, 2]
  },

  uniforms: {

    // float frame = mod(tick, zoom * zoom) / (zoom * zoom);
    frame: function (context, props, batchId) {
      const frame = context.tick % (zoom * zoom) / (zoom * zoom)
      // console.log('props', context.tick, frame)
      return frame
    },

    texture0: regl.prop('texture0'),
    texture1: regl.prop('texture1'),
    texture2: regl.prop('texture2'),
    texture3: regl.prop('texture3'),
    texture4: regl.prop('texture4'),
    texture5: regl.prop('texture5'),
    texture6: regl.prop('texture6'),
    texture7: regl.prop('texture7'),
    texture8: regl.prop('texture8'),
    texture9: regl.prop('texture9'),
    texture10: regl.prop('texture10'),
    texture11: regl.prop('texture11'),

    screenShape: ({viewportWidth, viewportHeight}) => {
      return [viewportWidth, viewportHeight]
    },

    videoShape: regl.prop('videoShape'),
    videoAspectRatio: regl.prop('videoAspectRatio'),

    zoom: regl.prop('zoom'),
    speed: regl.prop('speed'),

    tick: regl.context('tick')
  },

  count: 3
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
    // video.muted = true
    video.play()

    console.log(regl.limits)
    console.log('width', video.videoWidth * numScreensX * numScreensY * speed)

    var textures = []
    for (var i = 0; i < 12; i++) {
      textures.push(regl.texture({
        width: video.videoWidth * numScreensX * speed,
        height: video.videoHeight
      }))
    }

    regl.frame(() => {
      var x = video.videoWidth * screenIndexX * speed
      var y = 0
      
      textures[screenIndexY].subimage(video, x, y)

      drawKaleidotube({
        texture0: textures[0],
        texture1: textures[1],
        texture2: textures[2],
        texture3: textures[3],
        texture4: textures[4],
        texture5: textures[5],
        texture6: textures[6],
        texture7: textures[7],
        texture8: textures[8],
        texture9: textures[9],
        texture10: textures[10],
        texture11: textures[11],

        videoShape: [video.videoWidth, video.videoHeight],
        videoAspectRatio: video.videoWidth / video.videoHeight,
        zoom
      })

      screenIndexX++
      if (screenIndexX >= numScreensX) {
        screenIndexX = 0
        screenIndexY++
      }
      if (screenIndexY >= numScreensY) {
        screenIndexY = 0
      }
    })
  }
})
