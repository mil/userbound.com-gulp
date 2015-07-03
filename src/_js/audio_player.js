'use strict';
var UserboundInterface = (function(self) {
  var wavesurfer;
  var track_index = 0;

  function set_music_track_delta(delta) {
    console.log(delta);
    $(".controls .date-caption").addClass("fade-down");
  }

  function bind_audo_player_controls() {
    var controls_selector = '.controls';

    $('.play-pause', '.controls').on('click', function(e) {
      var is_playing = wavesurfer.isPlaying();
      $(e.target)[is_playing ? 'removeClass' : 'addClass']('playing');
      wavesurfer[is_playing ? 'pause' : 'play']();
    });
    $('a', '.audio-track-seekers').on('click', function(e) {
      var target = $(e.target);
      while (!$(target).is("a")) {
        target = $(target).parent();
      }
      if ($(target).hasClass('hidden')) { return; }

      var next = $(target).hasClass('next');
      track_index = track_index + (next ? 1 : -1);
      load_track(track_index);
      e.preventDefault();
    });
  }

  function load_track(index) {
    var keys = Object.keys(self.tracks);
    $('.audio-track-seekers .next')[
      index + 1 > keys.length - 1 ? 'addClass' : 'removeClass'
    ]('hidden');
    $('.audio-track-seekers .previous')[
      index - 1 < 0 ? 'addClass' : 'removeClass'
    ]('hidden');
    $('.play-pause').removeClass('playing');
    $('.date-caption .inner').html(keys[index]);
    wavesurfer.load('/works/' + self.tracks[keys[index]]);
  }

  function setup_audio_player() {
    if ($(".music-entry").length === 0) { return; }

    wavesurfer = Object.create(WaveSurfer);
    wavesurfer.init({
      container: $(".music-entry")[0],
      waveColor: '#e8e8e8',
      progressColor: '#423f37',
      cursorColor: '#e8e8e8',
      hideScrollbar: true
      //cursorWidth: 1
    });

    wavesurfer.on('loading', function(pct) {
      $(".loading-pct").html(pct + '%');
      $('.play-pause')[pct === 100 ? 'removeClass' : 'addClass']('hide');
      $('.loading-pct')[pct === 100 ? 'addClass' : 'removeClass']('hide');
    });
    wavesurfer.on('ready', function () {});

    $('.audio-track-seekers').addClass('active');
    load_track(0);
    bind_audo_player_controls();
  }

  return {
    wavesurfer: wavesurfer,
    setup_audio_player: setup_audio_player,
    set_music_track_delta: set_music_track_delta
  };
})(UserboundInterface || {});
