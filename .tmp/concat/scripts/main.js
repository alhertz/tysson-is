$(document).ready(function() {
  // Load phrase and post button
  $( "#phrase" ).delay(500).fadeIn( 150);
  // Refresh
  $('#refresh').click(function() {
    $.getJSON('scripts/data.json', function(data) {
      var phrase = data.phrases[Math.floor(Math.random()*data.phrases.length)];
      $( "#caption" ).replaceWith('<h1 id="caption">Tysson is ' + phrase.caption + '</h1>');
    });
  });
  // Load Facebook Javascript SDK
  $.ajaxSetup({ cache: true });
  $.getScript('//connect.facebook.net/en_UK/all.js', function(){
    FB.init({
      appId: '252765611559469',
    });     
    $('#loginbutton,#feedbutton').removeAttr('disabled');
    FB.getLoginStatus();
  });
  // Get random object from JSON array
  $.getJSON('scripts/data.json', function(data) {
    var phrase = data.phrases[Math.floor(Math.random()*data.phrases.length)];
    $('<h1 id="caption">Tysson is ' + phrase.caption + '</h1>').prependTo('#phrase');
    // Show Create Form on Say Something Else Click
    $( "#create" ).click(function() {
      $( "#post" ).fadeOut( 500, function() {
        $( "#createForm" ).fadeIn(500);
      });
      // Update #caption DOM Element on input 
      $("#createFormInput").on("keyup change", function() {
        value = this.value;
        $("#caption").text( 'Tysson is ' + value);
      });
      // Post inputed value to facebook
      $( "#createFormPost" ).click(function() {
        FB.ui(
          {
           method: 'feed',
           name: 'TYSSON is',
           description: value,
           link: 'http://tysson.is',
           picture: 'http://tyssonband.com/images/tysson-logo-1500x1500.jpg'
          },
          function(response) {
            if (response && response.post_id) {
              $('#creatForm').fadeOut(500);
              $('#post').fadeOut(500, function() {
                $('#thanks').fadeIn();
              });
            } else {
              $('#createForm').fadeOut(500);
              $('#post').fadeOut(500, function() {
                $('#nope').fadeIn();
              });
            }
          }
        );
      });
    });
    // Trigger Facebook Post Dialog on click
    $( "#say" ).click(function() {
      FB.ui(
        {
         method: 'feed',
         name: 'TYSSON is',
         description: phrase.caption,
         link: 'http://tysson.is',
         picture: 'http://tyssonband.com/images/tysson-logo-1500x1500.jpg'
        },
        function(response) {
          if (response && response.post_id) {
            $('#createForm').fadeOut();
            $('#post').fadeOut(500, function() {
              $('#thanks').fadeIn();
            });
          } else {
            $('#createForm').fadeOut();
            $('#post').fadeOut(500, function() {
              $('#nope').fadeIn();
            });
          }
        }
      );
    });

  });

});