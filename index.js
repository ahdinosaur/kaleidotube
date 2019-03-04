const VideoPlayer = require('video.js')
require('videojs-youtube')

kaleidotube()

var videoUrl = 'https://www.youtube.com/watch?v=pAwR6w2TgxY'

function kaleidotube () {
  var player = VideoPlayer(
    'kaleidotube-player',
    {
      techOrder: ['youtube', 'html5'],
      youtube: {
        ytControls: 2
      },
    },
    function onReady () {
      console.log('player', player)
      //player.play()
      var tech = player.tech({IWillNotUseThisInPlugins: true});
      console.log('tech', tech)
    }
  )

  console.log('hello!')
  window.player = player
}

