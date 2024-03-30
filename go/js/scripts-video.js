$(function(){
/***********************************
 [TODO: Add Description]
***********************************/  
  
  /* Parameters
  **********************************/
  var PLAYER_ID           = "player";
  var PLAYER_WIDTH        = "100%";
  var PLAYER_HEIGHT       = "100%";
  var PLAYER_SWF          = "/pbsk/video/swf/VideoPlayer.swf";
  var EXPRESS_INSTALL_SWF = "/pbsk/video/swf/expressInstall.swf";
  var FLASH_VERSION       = "10.1.0";

  var player          = $("video#"+PLAYER_ID);
  var video_url_flash = player.attr("data-video-flash-src");
  var video_url_ios   = player.attr("data-video-ios-src");
  var isFlashPlayer   = false;
  var isPlayerReady   = false;
  var checkedForFlash = false;
  

  /* Private Methods
  **********************************/
  function init(){
    //-- HTML Object Attributes ----
    var attributes = {};
      attributes.id = attributes.name = PLAYER_ID;
    
    //-- SWF File Parameters ----
    var params = 
    {
      menu              : "false",
      wmode             : "transparent",
      allowFullScreen   : "true",
      allowscriptaccess : "always"
    };
    
    //-- Flash Variables ----
    var flashvars  = 
    {
      //-- Register/Add AS3->JS Event Listeners ----
      PlayerEvents : "{'PlayerReady' : '$.fn.onFlashPlayerReady'}",
      VideoEvents  : "{" +
                      " 'VideoEnd'        : '$.fn.onVideoEnd', " +
                      " 'MuteChange'      : '$.fn.onMuteChange', " +
                      " 'PlayStateChange' : '$.fn.onPlayStateChange' " +
                     "}"
    };
    
    //-- Embed the player SWF (swfobject vs 2.2) ----
    swfobject.embedSWF(PLAYER_SWF, PLAYER_ID, PLAYER_WIDTH, PLAYER_HEIGHT, FLASH_VERSION, EXPRESS_INSTALL_SWF, flashvars, params, attributes, onFlashCheck);
  }
  
  function onFlashCheck(e){
    checkedForFlash = true;
    
    if(!e.success){// flash is NOT enabled
      //-- Add <video/> Event Listeners ----
      player.bind('ended', $.fn.onVideoEnd);
      
      //-- Play Video ----
      player.attr({src:video_url_ios, autoplay:"autoplay"}).get(0).play();
    }
    else{// flash is enabled
      isFlashPlayer = true;
      
      //-- Capture Flash Player Instance ----
      player = e.ref;
    }
    
    if(isPlayerReady)  $.fn.onFlashPlayerReady(); //Necessary because after IE caching the PlayerReady event gets fired before the swfObject onComplete event does.
  }
  
  
  /* Event Handlers (Public Methods via $.fn)
  **********************************************/
  $.fn.onFlashPlayerReady = function(){
    isPlayerReady = true;
    
    if(checkedForFlash) {
      //-- Reveal Video Controls ----
        $(".video-utilities").addClass("video-utilities-enabled");
        
        //-- Add Event Listeners ----
        $(".video-utilities span.play-pause")
          .click(function(){
            if(player.paused() == true) 
              player.unpause();
            else
              player.pause();
          });
          
        $(".video-utilities span.mute-unmute")
          .click(function(){
            if(player.muted() == true) 
              player.unmute();
            else
              player.mute();
          });
          
      //-- Load and Play Video in Flash Player ----
      player.loadAndPlay(video_url_flash);
      
      //-- Ajust Volume based on Player Scroll Position ----
      var player_offset = $(player).offset();
      var player_height = $(player).height();
      var volumelevel = 1 - Math.max(0, Math.min(1, ($(window).scrollTop() - player_offset.top) / player_height ));
      player.volume(volumelevel);
      
      $(window).scroll(function(){
        volumelevel = 1 - Math.max(0, Math.min(1, ($(window).scrollTop() - player_offset.top) / player_height ));
        player.volume(volumelevel);
      });
    }
  }
  
  $.fn.onPlayStateChange = function(e){
    if(e.playState == "playing")
      $(".video-utilities span.play-pause").addClass("play-pause-isPlaying");
    
    else
      $(".video-utilities span.play-pause").removeClass("play-pause-isPlaying");
  }
  
  $.fn.onVideoEnd = function(){
    if(!isFlashPlayer) player[0].webkitExitFullScreen();
    else $(".video-utilities span").hide();
    $(".video-epilogue").css("display","block");
    $(".video-epilogue a").animate({bottom: '0'}, 400, function(){
      if(!isFlashPlayer) player.hide();
    });
  }
  
  $.fn.onMuteChange = function(e){
    if(e.muted == true)
      $(".video-utilities span.mute-unmute").addClass("mute-unmute-isMuted");
    
    else
      $(".video-utilities span.mute-unmute").removeClass("mute-unmute-isMuted");
  }
  
  
  /* GO! (Initialize)
  **********************************/
  init();

});
