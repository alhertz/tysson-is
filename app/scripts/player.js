(function () {

  var
    AUDIO_FILE = 'songs/song',
    waveform = document.getElementById( 'waveform' ),
    ctx = waveform.getContext( '2d' ),
    dancer, kick;

  /*
   * Dancer.js magic
   */
  Dancer.setOptions({
    flashSWF : 'dancer/lib/soundmanager2.swf',
    flashJS  : 'dancer/lib/soundmanager2.js'
  });

  dancer = new Dancer();
  kick = dancer.createKick({
    onKick: function () {
      ctx.strokeStyle = '#FFF';
    },
    offKick: function () {
      ctx.strokeStyle = '#FFF';
      $( 'body' ).css( "background", "#92B4D3" );
    }
  }).on();

  dancer
    .load({ src: AUDIO_FILE, codecs: [ 'ogg', 'mp3' ]})
    .waveform( waveform, { strokeStyle: '#FFF', strokeWidth: 1 });

  Dancer.isSupported() || loaded();
  !dancer.isLoaded() ? dancer.bind( 'loaded', loaded ) : loaded();

  /*
   * Loading
   */

  function loaded () {
    var
      loading = document.getElementById( 'loading' ),
      pause = document.getElementById( 'pause' ),
      anchor  = document.createElement('A'),
      supported = Dancer.isSupported(),
      p;
    $
    anchor.setAttribute( 'href', '#' );
    loading.innerHTML = '';
    loading.appendChild( anchor );

    // Check if supported browser
    if ( !supported ) {
      p = document.createElement('P');
      p.appendChild( document.createTextNode( 'Your browser does not currently support either Web Audio API or Audio Data API. The audio may play, but the visualizers will not move to the music; check out the latest Chrome or Firefox browsers!' ) );
      loading.appendChild( p );
    }

    $( '#play' ).css( "display", "block" );

    // Set Up Initial Play button
    anchor.addEventListener( 'click', function () {
      dancer.play();
      document.getElementById('loading').style.display = 'none';
      $( '#pause' ).css( "display", "block" );
    });

    // Set Up Pause Button
    $( "#pause" ).click(function() {
      dancer.pause();
      $( '#play' ).css( "display", "block" );
      $( '#pause' ).css( "display", "none" );
    });

    // Set Up Play Button
    $( "#play" ).click(function() {
      dancer.play();
      $( '#pause' ).css( "display", "block" );
      $( '#play' ).css( "display", "none" );
    });
  }

  // For debugging
  window.dancer = dancer;

})();