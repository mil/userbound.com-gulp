'use strict';

module.exports = function($, globals, util, router) {
  var wavesurfer;
  var track_index = 0;


  function sync_audio_track_buttons_visibility() {
    $.z(".audio-track-seekers")[
      util.current_active_section() === 'music' ?  "addClass" : "removeClass"
    ]("active");
  }

  function bind_audo_player_controls() {
    var controls_selector = '.controls';

    $.z('.play-pause', '.controls').on('click', function(e) {
      var is_playing = wavesurfer.isPlaying();
      var target = e.target;
      while (!($.z(target).is(".play-pause"))) {
        target = $.z(target).parent();
      }
      $.z(target)[is_playing ? 'removeClass' : 'addClass']('playing');
      wavesurfer[is_playing ? 'pause' : 'play']();
    });
    $.z('a', '.audio-track-seekers').on('click', function(e) {
      var target = $.z(e.target);
      while (!$.z(target).is("a")) {
        target = $.z(target).parent();
      }
      if ($.z(target).hasClass('hidden')) { return; }

      var next = $.z(target).hasClass('next');
      track_index = track_index + (next ? 1 : -1);
      load_track(track_index);
      e.preventDefault();
    });
  }

  function load_track(index) {
    var keys = Object.keys(globals.tracks);

    //router.navigate([
    //  '/works/music',
    //  keys[index].replace(/\//g, '-')
    //].join("/"));

    $.z('.audio-track-seekers .next')[
      index + 1 > keys.length - 1 ? 'addClass' : 'removeClass'
    ]('hidden');
    $.z('.audio-track-seekers .previous')[
      index - 1 < 0 ? 'addClass' : 'removeClass'
    ]('hidden');
    $.z('.play-pause').removeClass('playing');
    $.z('.date-caption .inner').html(keys[index]);
    wavesurfer.load('/works/' + globals.tracks[keys[index]]);
  }

  function setup_audio_player() {
    if ($.z(".music-entry").length === 0) { return; }
    console.log("G");

    wavesurfer = Object.create($.WaveSurfer);
    wavesurfer.init({
      container: $.z(".music-entry")[0],
      waveColor: '#e8e8e8',
      progressColor: '#423f37',
      cursorColor: '#e8e8e8',
      hideScrollbar: true,
      normalize: true
      //cursorWidth: 1
    });

    wavesurfer.on('loading', function(pct) {
      $.z(".loading-pct").html(pct + '%');
      $.z('.play-pause').addClass('hide');
      $.z('.loading-pct').removeClass('hide');
    });
    wavesurfer.on('ready', function() {
      $.z('.play-pause').removeClass('hide');
      $.z('.loading-pct').addClass('hide');
    });
    wavesurfer.on('finish', function() {
      wavesurfer.stop();
      $.z('.play-pause', '.controls').removeClass('playing');
    });

    $.z('.audio-track-seekers').addClass('active');
    load_track(0);
    bind_audo_player_controls();
    sync_audio_track_buttons_visibility();
    globals.sync_callback = sync_audio_track_buttons_visibility;
  }

  return {
    wavesurfer: wavesurfer,
    setup_audio_player: setup_audio_player,
    load_track: load_track,
    sync_audio_track_buttons_visibility: sync_audio_track_buttons_visibility
  };
};
