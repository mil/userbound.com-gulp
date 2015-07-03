'use strict';
var UserboundInterface = (function(my) {
  var tracks = {
    '6/17/15': 'db048.wav',
    '6/18/15': 'db049.wav'
  };

  function set_music_track_delta(delta) {
    console.log(delta);
    $(".controls .date-caption").addClass("fade-down");
  }

  function setup_audio_player() {
    window.wavesurfer = Object.create(WaveSurfer);

    $('.play-pause', '.controls').on('click', function(event) {
      if (wavesurfer.isPlaying()) {
        $(this).removeClass("playing");
        wavesurfer.pause();
      } else {
        $(this).addClass("playing");
        wavesurfer.play();
      }
    });

    $.each($(".music-entry"), function(i, el) {
      wavesurfer.init({
        container: $(".music-entry")[0],
        waveColor: '#e8e8e8',
        progressColor: '#423f37',
        cursorColor: '#e8e8e8',
        hideScrollbar: true
        //cursorWidth: 1
      });

      wavesurfer.on('ready', function () {
      });

      wavesurfer.load('/works/' + $(el).attr("data-filename"));
    });
  }

  return {
    setup_audio_player: setup_audio_player,
    set_music_track_delta: set_music_track_delta
  };
})(UserboundInterface || {});
