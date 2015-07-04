'use strict';
window.UserboundInterface = (function(self) {
  var wavesurfer;
  var track_index = 0;


  function sync_audio_track_buttons_visibility() {
    $(".audio-track-seekers")[
      self.util.current_active_section() === 'music' ?  "addClass" : "removeClass"
    ]("active");
  }

  function bind_audo_player_controls() {
    var controls_selector = '.controls';

    $('.play-pause', '.controls').on('click', function(e) {
      var is_playing = wavesurfer.isPlaying();
      var target = e.target;
      while (!($(target).is(".play-pause"))) {
        target = $(target).parent();
      }
      $(target)[is_playing ? 'removeClass' : 'addClass']('playing');
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
      $('.play-pause').addClass('hide');
      $('.loading-pct').removeClass('hide');
    });
    wavesurfer.on('ready', function() {
      $('.play-pause').removeClass('hide');
      $('.loading-pct').addClass('hide');
    });

    $('.audio-track-seekers').addClass('active');
    load_track(0);
    bind_audo_player_controls();
    sync_audio_track_buttons_visibility();
  }

  return $.extend(self, {
    wavesurfer: wavesurfer,
    setup_audio_player: setup_audio_player,
    sync_audio_track_buttons_visibility: sync_audio_track_buttons_visibility
  });
})(window.UserboundInterface || {});
