var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

/*################################################
               PBS KIDS VIDEO
################################################*/
$(function(){
  var player,
      playlist,
      kuchucka,
      browsingPlaylist;

  var _API_URL        = 'http://pbskids.org/pbsk/video/api/',
      _AUDIO_LIST_URL = '/video/js/categoryButtonAudio.js',
      _DEFAULT_PARAMS = { 'return' : 'airdate, expirationdate' };

  var sponsorsDropdown, // Dropdown for displaying a series' sponsors when playing full episodes.
      dropdowns  = [],  // Array of all other Dropdowns
      shows      = {},  // Object Containing Properties (i.e. Thumb Urls, Funder Info) for all of the shows under the KIDS Brand
      showTitles = [],  // Array of Show titles to submit on category/topic requests. This is to make sure that all videos returned are KIDS BRAND only
      currentVolume = 1,
      isMuted = false,
      audioTimeout,
      errorTimeout,
      errorTimeoutDelay = 10000,// 10 seconds
      sponsorTimeout,
      sponsorMaxDisplayTime = 15000,//15 seconds
      sponsorTimer,
      sponsorTimerInterval;

  var currentView,
      prevView,
      Views = {
        COMPRESSED : "COMPRESSED",
        TIGHT      : "TIGHT",
        EXPANDED   : "EXPANDED"
      };

  var currentRelease,
      currentSearch   = "",
      currentCategory = "",
      dashWeeklyPicks = "";

  /* iScroll Objects */
  var characterScroll,
      infoScroll,
      nowplayingScroll,
      showsScroll,
      topicsScroll,
      browsingScroll,
      iScrollOpts = {},
      iScrollOpts_info = {},
      iScrollOpts_playlist = {},
      iScrollOpts_browsinglist = {};

  /* Browser/Device Capabilities */
  var isGoogleTV   = (/googletv/gi).test(navigator.appVersion),
      isTouchPad   = (/hp-tablet/gi).test(navigator.appVersion),
      hasPointer   = window.navigator.msPointerEnabled,
      hasTouch     = ('ontouchstart' in window && !isTouchPad);

  /* Event Types */
  var RESIZE_EV = !'onorientationchange' in window ? 'resize' : 'orientationchange',
      START_EV  = hasPointer ? "MSPointerDown" : (!hasTouch ? 'mousedown' : 'touchstart'),
      MOVE_EV   = hasPointer ? "MSPointerMove" : (!hasTouch ? 'mousemove' : 'touchmove'),
      END_EV    = hasPointer ? "MSPointerUp"   : (!hasTouch ? 'mouseup'   : 'touchend'),
      CANCEL_EV = hasPointer ? "MSPointerOut"  : (!hasTouch ? 'mouseout'  : 'touchcancel');

  /* Player Names / IDs */
  var commonName,
      affiliateId;

  /* U.S. KEY CODES */
  var Keyboard = {
          TAB   :  9,
          SPACE : 32,
          ENTER : 13,

          PAGE_UP   : 33,
          PAGE_DOWN : 34,

          END  : 35,
          HOME : 36,

          LEFT  : 37,
          UP    : 38,
          RIGHT : 39,
          DOWN  : 40
      };



  /* GOOGLE ANALYTICS, PAGE & EVENT TRACKING
  ################################################*/
  function trackEvent(category, action, label, value){
    category = commonName + " - " + category;
    action   = ( affiliateId ? affiliateId + " - " : "" ) + action;
    if( window.GA_obj ) if( GA_obj.trackEvent ) GA_obj.trackEvent( category, action, label, value );
  }//trackEvent()


  function init()
  {
    /* Set iScroll Options */
    iScrollOpts = { hScroll:false, dragScrollBars:!(hasTouch || hasPointer), containerClass:"list", scrollbarClass:( hasTouch || hasPointer ? 'touch ' : '') + 'scrollbar', minBarHeight:( hasTouch || hasPointer ? 8 : 36) };

    /* Additional Options for Playlists */
    for(var i in  iScrollOpts){
      iScrollOpts_playlist[i]     = iScrollOpts[i];
      iScrollOpts_browsinglist[i] = iScrollOpts[i];
    }

    /* Additional Options for Info List */
    for(var i in  iScrollOpts) iScrollOpts_info[i] = iScrollOpts[i];
    iScrollOpts_info.bounce = false;
    iScrollOpts_info.dragScrollerWithMouse = false; // don't allow the user to drag this scroller with a mouse
    iScrollOpts_info.onBeforeScrollStart   = null;
    iScrollOpts_info.onBeforeScrollMove    = function(e){e.preventDefault();};

    /* Add Event Listener for Window-Resize and Resize
       (This mostly for just resiziing the player in browsers which fail the Flash and iOS test.) */
    $(window).resize(onResize);
    if(hasTouch) $("body").addClass("has-touch");

    /* Key Board Navigation. Includes GoogleTV key-codes */
    document.onkeydown = isGoogleTV ? onGoogleKeyDown : onKeyDown;

    /* Listen for Video Error Events Prior to constructing the player */
    $(document).on(org.pbskids.video.VideoErrorEvent.GEO_RESTRICTED , onVideoError);
    $(document).on(org.pbskids.video.VideoErrorEvent.VIDEO_EXPIRED  , onVideoError);
    $(document).on(org.pbskids.video.VideoErrorEvent.VIDEO_NOT_FOUND, onVideoError);
    $(document).on(org.pbskids.video.VideoErrorEvent.NO_RESPONSE    , onVideoError);
    $('#error-message button').on(START_EV, function(e){ if(playlist) playlist.next(); else closeErrorMessage(); });

    /* Instantiate Video Player :
       The Player object will first run a Flash-Compatibility test via SWfObject.js
       and an iOS check and send the results to the onPlayerComplete() function. If the
       user is on an iDevice or they have Adobe Flash 10.1+ installed then the finalize()
       function is called and the app finishes initializing.
    */
    player = new org.pbskids.video.Player( "video-player",
                                          {
                                            onPlayerComplete      : onPlayerComplete,
                                            onVideoClick          : "toggle-fullscreen",
                                            muteToggleControl     : "#mute-unmute-button",
                                            pauseToggleControl    : "#controlrack .play-pause",
                                            captionsToggleControl : "#captions-button",
                                            timerDuration         : "#localization-video-length",
                                            timerRemaining        : "#player .timer-remaining",
                                            scrubber              : "#player .scrubber",
                                            volumeDisplay         : "#volume-dropdown .volume-level",
                                            volumeSlider          : "#volume-dropdown .scrubber",
                                            onHoverOverlay        : {url:"http://www-tc.pbskids.org/video/img/button_big.png", width:"58px", height:"30px", fs_url:"http://www-tc.pbskids.org/video/img/button_small.png", fs_width:"78px"},
                                            loadingOverlay        : {url:"http://www-tc.pbskids.org/video/img/arrowspin.gif" , width:"50px", height:"50px", swf:"http://www-tc.pbskids.org/video/img/arrowspin.swf"}
                                          });

    $(window).resize();//first resize
  }//init()


  function finalize(playerInstance)
  {
    /* Enable App
    ***************************************************/
    $(".playlistItem").removeClass("hidden");
    $(".disabled").removeClass("disabled");
    $("button").click(function(e){e.preventDefault();});


    /* Instantiate Playlist
    ***************************************************/
    playlist = new org.pbskids.video.PlayList(
      "now-playing-list", 'playlistItem', playerInstance,
      {iScrollOpts:iScrollOpts_playlist, loadingIndicator:"http://www-tc.pbskids.org/video/img/arrowspin.gif", loadMoreVideosMessage : "Show More Videos", loadMoreButtonClass : "showmore-videos", autoPlay:false, autoPlayNext:!isKindleApp, previousVideoControl:"#controlrack .previous", nextVideoControl:"#controlrack .next"}
    );

    if($("#kuchucka-playlist").length > 0){
      kuchucka = new org.pbskids.video.PlayList(
        "kuchucka-playlist", 'playlistItem', playerInstance,
        {iScrollOpts:"NO_ISCROLL", loadingIndicator:"http://www-tc.pbskids.org/video/img/arrowspin.gif", autoPlay:false, autoPlayNext:false, reverseOrder:true}
      );
    }

    browsingPlaylist = new org.pbskids.video.PlayList(
      "browsing-list", 'playlistItem', playerInstance,
      {iScrollOpts:iScrollOpts_browsinglist, loadingIndicator:"http://www-tc.pbskids.org/video/img/arrowspin.gif", loadMoreVideosMessage : "Show More Videos", loadMoreButtonClass : "showmore-videos", autoPlay:false, autoPlayNext:false}
    );

    buildShowsList();
    buildTopicsList();


    /* Build/Retrieve iScrolls for lists in Dropdowns
    ***************************************************/
    nowplayingScroll = playlist.iScroll;
    browsingScroll   = browsingPlaylist.iScroll;
    showsScroll      = new org.pbskids.iScrollMOD('shows-list-container' , iScrollOpts);
    topicsScroll     = new org.pbskids.iScrollMOD('topics-list-container', iScrollOpts);
    infoScroll       = new org.pbskids.iScrollMOD('series-video-info'    , iScrollOpts_info);

    /* iScroll for Character Buttons */
    characterScroll = new org.pbskids.iScrollMOD('character-list', { hScrollbar:false, vScrollbar:false, onScrollMove: updateCharacterScroll, onScrollEnd: updateCharacterScroll });


    /* Create and Setup Dropdowns w/ Toggle
       Buttons and References to Children iScrolls
    ***************************************************/
    sponsorsDropdown = new Dropdown("sponsors-dropdown", null, null, false);
    dropdowns = [
                  new Dropdown("browsing-dropdown", "browse-button", [nowplayingScroll,showsScroll,topicsScroll,browsingScroll], true, onShowPlaylist),
                  new Dropdown("info-dropdown"    , "info-button"  , [infoScroll])
                ];

    if(hasTouch) $("#volume-button").hide();
    else dropdowns.push(new Dropdown("volume-dropdown"  , "volume-button"));


    /* Add Event Listeners
    ***************************************************/
    $("#player #controlrack span").on(START_EV ,function(){$(this).addClass("down");});
    $("#player #controlrack span").on(END_EV   ,function(){$(this).removeClass("down");});
    $("#player #controlrack span").on(CANCEL_EV,function(){$(this).removeClass("down");});

    playlist.addEventListener(org.pbskids.video.PlaylistEvent.REFRESH_START   , onLoadingPlaylist   , false);
    playlist.addEventListener(org.pbskids.video.PlaylistEvent.REFRESH_COMPLETE, onLoadedPlaylist    , false);
    playlist.addEventListener(org.pbskids.video.PlaylistEvent.COPY_COMPLETE   , onCopiedToPlaylist  , false);
    playlist.addEventListener(org.pbskids.video.PlaylistEvent.APPEND_COMPLETE , onAppendedToPlaylist, false);
    playlist.addEventListener(org.pbskids.video.PlaylistEvent.RELEASE_SELECTED, onReleaseSelected   , false);

    if(kuchucka) {
      kuchucka.addEventListener(org.pbskids.video.PlaylistEvent.COPY_COMPLETE   , onCopiedToKuchucka, false);
      kuchucka.addEventListener(org.pbskids.video.PlaylistEvent.RELEASE_SELECTED, onKuchuckaSelected, false);
    }

    browsingPlaylist.addEventListener(org.pbskids.video.PlaylistEvent.REFRESH_START   , onLoadingBrowsingList , false);
    browsingPlaylist.addEventListener(org.pbskids.video.PlaylistEvent.REFRESH_COMPLETE, onLoadedBrowsingList  , false);
    browsingPlaylist.addEventListener(org.pbskids.video.PlaylistEvent.APPEND_COMPLETE , onLoadedBrowsingList  , false);
    browsingPlaylist.addEventListener(org.pbskids.video.PlaylistEvent.RELEASE_SELECTED, onBrowsingListSelected, false);

    if(!hasTouch){
      $(document).on(org.pbskids.video.VideoEvent.MUTE_CHANGE  , onMuteChange);
      $(document).on(org.pbskids.video.VideoEvent.VOLUME_CHANGE, onVolumeChange);
    }

    /* Character Scroll-Buttons */
    var transitionTime = 200, horizontalPadding = 88;
    $("#character-list-container .scroll-up"   ).click(function(){ characterScroll.scrollTo(0,Math.max(-characterScroll.wrapperH, characterScroll.y),transitionTime,true); });
    $("#character-list-container .scroll-down" ).click(function(){ characterScroll.scrollTo(0,Math.min( characterScroll.wrapperH, characterScroll.y - characterScroll.maxScrollY),transitionTime,true); });
    $("#character-list-container .scroll-left" ).click(function(){ characterScroll.scrollTo(Math.max(-characterScroll.wrapperW + horizontalPadding, characterScroll.x) ,0,transitionTime,true); });
    $("#character-list-container .scroll-right").click(function(){ characterScroll.scrollTo(Math.min( characterScroll.wrapperW - horizontalPadding, characterScroll.x - characterScroll.maxScrollX),0,transitionTime,true); });

    /* Browsing Controls */
    $("#view-now-playing-button").click(function(){ switchBrowsingList($(this), playlist.getContainerID(), nowplayingScroll, currentCategory ); trackEvent("Parents Browsing", "Now Playing"); });
    $("#browse-shows-button"    ).click(function(){ switchBrowsingList($(this), 'shows-list-container'   , showsScroll     , 'Pick a Show'   ); trackEvent("Parents Browsing", "Shows"      ); });
    $("#browse-topics-button"   ).click(function(){ switchBrowsingList($(this), 'topics-list-container'  , topicsScroll    , 'Pick a Topic'  ); trackEvent("Parents Browsing", "Topics"     ); });

    /* Info Buttons */
    $('#series-website-button'                  ).click(function(){ trackEvent("Information", "Visit Series Website", $(this).attr('title')                              ); });
    $('#series-parents-site-button'             ).click(function(){ trackEvent("Information", "More at PBS Parents" , $(this).prop('data-series-title')                  ); });
    $('#series-video-info #marketButton-parents').click(function(){ trackEvent("Information", "Info"                , $(this).prop('data-series-title') + " - PBSParents"); });
    $('#series-video-info #marketButton-shop'   ).click(function(){ trackEvent("Information", "Info"                , $(this).prop('data-series-title') + " - Shop PBS " ); });
    $('#series-video-info #marketButton-itunes' ).click(function(){ trackEvent("Information", "Info"                , $(this).prop('data-series-title') + " - iTunes"    ); });
    $('#info-button'                            ).click(function(){ trackEvent("Information", "Info"); });


    /* Initial Settings
    ***************************************************/
    /* Video Info and Buttons */
    onReleaseSelected();

    /* Layouts and Visibility */
    $(window).resize();


    /* GO!
    ***************************************************/
    loadFirstPlaylist();

  }//finalize()


  function loadAndPlayHostSpot()
  {  /* Get and Play Host Spot */
      $.ajax({
        type     : "GET",
        url      : _API_URL + "getVideos/",
        dataType : 'jsonp',
        data     : {
                     group  : "ipad_kids_intro_dashpicks",
                     player : player.videoType(),
                     flash  : player.isFlashPlayer()
                   },

        fail     : function(){
          if( playlist.hasPlaylist() ) playlist.next();
          else playlist.autoPlay(true);
        },//fail

        success  : function(data)
        {
          var __r = null;
          data = data.items;
          while(data.length){
            var __i = randomInt(data.length - 1);
            __r = data.splice(__i,1)[0];
            if(__r.videos) if(__r.videos[player.videoType()]) break;
            __r = null;
          }

          if(__r) player.loadAndPlay(__r);
          else {
            if( playlist.hasPlaylist() ) playlist.next();
            else playlist.autoPlay(true);
          }

        }//success
      });//ajax()
  }//loadAndPlayHostSpot()


  function loadFirstPlaylist()
  {/* Load Dash's Picks or Deeplinked Content */
    var __opts = {};
    for( var i in  _DEFAULT_PARAMS ) __opts[i] = _DEFAULT_PARAMS[i];

    if(dl_program || dl_category || dl_pid  || dl_guid ){
      __opts.pid      = (dl_pid      || "");
      __opts.guid     = (dl_guid     || "");
      __opts.category = (dl_category || "");
      __opts.program  = (dl_program  || "");

      playlist.autoPlayNext(false);
      playlist.autoPlay(true);
    }
    else{
      __opts.group = "ipad_kids_dashpicks";
      loadAndPlayHostSpot();
    }

    playlist.refresh(__opts);//No query params will return the Newest Videos
  }//loadFirstPlaylist()


  function switchBrowsingList(button, listContainer, iScrollObject, title){
    if(listContainer == nowplayingScroll) onShowPlaylist();
    $("#browsing-dropdown .list").hide();
    $("#no-results-message").hide();
    $("#browsing-dropdown .dropdown-control.selected").removeClass("selected");
    $(button).addClass("selected");
    $('#' + (listContainer || playlist.getContainerID())).show();
    iScrollObject.refresh();
    $('#browsing-dropdown .list-title').html( (title == "ipad_kids_dashpicks" ? dashWeeklyPicks : title) || "&nbsp;");
    if(iScrollObject == nowplayingScroll) playlist.scrollToSelectedItem();
  }//switchBrowsingList()


  function updateCharacterScroll()
  {  /*
      Hide or Show (Reset) the Scroll Buttons
      based on the list x-y coordinates
    */

    if(characterScroll.options.hScroll){
      if(characterScroll.x > characterScroll.maxScrollX){
        $("#character-list-container .scroll-right").resetStyles();
        $("#character-list-container .fade-right").resetStyles();
      }
      else {
        $("#character-list-container .scroll-right").hide();
        $("#character-list-container .fade-right").hide();
      }//end if

      if(characterScroll.x < 0){
        $("#character-list-container .scroll-left").resetStyles();
        $("#character-list-container .fade-left").resetStyles();
      }
      else {
        $("#character-list-container .scroll-left").hide();
        $("#character-list-container .fade-left").hide();
      }//end if

    }
    else{
      if(characterScroll.y > characterScroll.maxScrollY){
        $("#character-list-container .scroll-down").resetStyles();
        $("#character-list-container .fade-bottom").resetStyles();
      }
      else{

        $("#character-list-container .scroll-down").hide();
        $("#character-list-container .fade-bottom").hide();
      }//end if

      if(characterScroll.y < 0){
        $("#character-list-container .scroll-up").resetStyles();
        $("#character-list-container .fade-top").resetStyles();
      }
      else{
        $("#character-list-container .scroll-up").hide();
        $("#character-list-container .fade-top").hide();
      }//end if

    }//end if

    /***************************************************************
      IE7 bug fix: without this line the ".scroll-down" button is
      ~5px from being flush with the container upon re-appearing.
      Clicking the body makes it refresh and correct itself. smh.
    ***************************************************************/
    $("body").click();

  }//updateCharacterScroll()


  function moveToCharacter(characterButton){
    var transitionTime = 200, horizontalPadding = 30, verticalPadding = 4;

    if( characterButton.length == 0 ) return;
    else if( characterButton.length > 1) characterButton = characterButton.first();

    if( currentView == Views.EXPANDED){
      if( characterButton.position().top + characterScroll.y + characterButton.height() > characterScroll.wrapperH - verticalPadding )
        $("#character-list-container .scroll-down").click();

      else if( characterButton.position().top + characterScroll.y < verticalPadding )
        $("#character-list-container .scroll-up").click();
    }
    else{
      if( characterButton.position().left + characterScroll.x + characterButton.width() > characterScroll.wrapperW - horizontalPadding )
        $("#character-list-container .scroll-right").click();

      else if( characterButton.position().left + characterScroll.x < horizontalPadding )
        $("#character-list-container .scroll-left").click();
    }
  }//moveToCharacter()


  function buildShowsList(){
    $.ajax({
            type     : 'GET',
            url      : '/video/js/org.pbskids.shows.js',//_API_URL + "getShows/",
            dataType : 'json',//'jsonp',
            //data     : { "return" : "images,underwriting,description,shop_url,itunes_url,website" },
            success  : (hasTouch || (!supportsMedia('audio/mpeg','audio') && !supportsMedia('audio/ogg','audio')) ? onShowslistLoaded : getShowsAudio)
          });

  }//buildShowsList()


  function getShowsAudio(data){
    $.ajax({
            type     : 'GET',
            url      : _AUDIO_LIST_URL,
            dataType : 'json',
            success  : function(audioData){ onShowslistLoaded(data, audioData); }
          });
  }//getShowsAudio()


  function buildTopicsList(){
    $.ajax({
            type     : 'GET',
            url      : _API_URL + "getCategories/",
            dataType : 'jsonp',
            success  : onTopicslistLoaded
          });
  }//buildTopicsList()


  function randomInt(upperlimit, lowerlimit){
    var u = !isNaN(upperlimit) ? upperlimit : 1; //doing it this way to allow passing 0 as an upperlimit
    var l = (lowerlimit || 0);
    return Math.min(u, Math.floor(l + Math.random() * (u - l +1)));
  }//randomInt()


  function displaySponsor(sponsors){
    clearTimeout(sponsorTimeout);
    for(var i in sponsors){
      $("<img/>")
      .attr({"src":sponsors[i].imageURL, "alt":sponsors[i].name})
      .appendTo(
        $("<a/>")
        .attr({"href":sponsors[i].linkURL, "title":sponsors[i].name})
        .click(function(e){
          if(typeof flashBridge == "function") {
            e.preventDefault(); flashBridge($(this).attr("href"), $(this).attr("title"));
          }
          trackEvent("Sponsors", "logoClicked", $(this).attr("title"));
        })
        .appendTo(
          $("<li/>")
          .appendTo("#sponsors-list")
        )
      );
    }//end for
    sponsorsDropdown.showDropdown();
    sponsorTimer = 0;
    sponsorTimerInterval = setInterval(function(){ sponsorTimer ++ }, 1000);
    sponsorTimeout = setTimeout(function(){
      clearInterval(sponsorTimerInterval);
      sponsorsDropdown.dropdown.hideDropdown();
    }, sponsorMaxDisplayTime);
    trackEvent("Sponsors", "Open", ( currentRelease.series_title || "No-Series-Title" ) + "/" + ( currentRelease.title || "No-Title" ));
  }//displaySponsor()


  function supportsMedia(mimetype, container) {
    var elem = document.createElement(container);
    if(typeof elem.canPlayType == 'function'){
      var playable = elem.canPlayType(mimetype);
      if((playable.toLowerCase() == 'maybe')||(playable.toLowerCase() == 'probably')){
        return true;
      }
    }
    return false;
  }//supportsMedia()


  function closeErrorMessage(){
    if(errorTimeout) clearTimeout(errorTimeout);
    $('#error-message').hide();
    if(player) $('#app').removeClass("disabled");
  }//closeErrorMessage()



  /* Event Handlers and Callbacks
  *********************************************/
  function onVideoError(e){
    if(errorTimeout) clearTimeout(errorTimeout);
    if(player) player.pause();//just in case it wasn't already stopped
    $('#app').addClass("disabled");
    if( e.type == org.pbskids.video.VideoErrorEvent.GEO_RESTRICTED ){
      $('#error-message p.message').html("PBS KIDS Video is restricted to the United States and its territories.<br/>"+
                                         "<small>If you were directed to this page in error, <a href='mailto:audienceservices@pbs.org'>please report the issue here.</a></small>");
      $('#error-message img').attr("src", "http://www-tc.pbskids.org/video/img/icon_nowatch.png").resetStyles();
      $('#error-message button').hide();
      $('#error-message').css("display","block");
    }
    else{
      e.message = e.message.replace(/^Video/,"This video");
      $('#error-message p.message').html("Whoops! " + e.message + ".");
      $('#error-message img').hide();
      $('#error-message button').resetStyles();
      $('#error-message').css("display","block");
      if(playlist) errorTimeout = setTimeout(playlist.next, errorTimeoutDelay);
    }
  }//onVideoError()


  function onPlayerComplete(e){
    if(e.success) {
      commonName  = e.player.commonName();
      affiliateId = e.player.affiliateId();

      $.ajax({//make api request
        type     : "GET",
        url      : _API_URL + "getGroups/",
        dataType : 'jsonp',
        data     : { "endindex" : "1" , "group" : "ipad_kids_dashpicks" },
        success  : function(data)
        {
          dashWeeklyPicks = "Weekly Pick";
          if( data ) if(data.items) if( data.items[0] ) if( data.items[0].short_description ) dashWeeklyPicks = data.items[0].short_description.replace(/weekly pick: /i, "");
          finalize(e.player);
        }
      });
    }
    else {
      $('#error-message p.message').html(e.message);
      $('#error-message img').attr("src", "http://www-tc.pbskids.org/video/img/icon_nowatch.png");
      $('#error-message button').hide();
      $('#error-message').css("display","block");
    }
  }//onPlayerComplete()


  function onShowslistLoaded(data, audioData){
    /* Arrays for capturing program groups */
    var __groups = {
      pkblock : [],
      group_1 : [],
      group_2 : [],
      nogroup : []
    }

    /* Build the Parent's Shows List */
    var __list  = $("#shows-list");
    var __model = $("li.showItem", __list).first();
    __list.empty();

    for(var i in data){
      /* Build Playlist Item */
      var o = __model.clone();
      $("img.bullet", o).attr("src",data[i].thumbnailPreKSmall);
      $("span.label", o).html(data[i].title);
      o.attr("data-program", escape(data[i].title))
       .click(onProgramSelected)
       .appendTo(__list);

      /* Assign Metadata object to group */
      switch(data[i].showGroup.toLowerCase()){
        case "prek block" : __groups.pkblock.push(data[i]); break;
        case "group one"  : __groups.group_1.push(data[i]); break;
        case "group two"  : __groups.group_2.push(data[i]); break;
        default           : __groups.nogroup.push(data[i]); break;
      }//end switch

      /* create series/show object to be referenced later upon
         each video load to populate the information dropdown.
      *********************************************************/
      shows[data[i].title] = data[i];
      showTitles.push(data[i].title);

    }//end for
    if(showsScroll) showsScroll.refresh();

    /* Build the Kid's Character List */
    __list  = $("#character-list ul");
    __model = $("li", __list).first().removeClass("hidden");
    __list.empty();

    /* Build Dash's Picks Button */
    var o = __model.clone();
    $("<img/>")
      .appendTo($("button", o))
      .attr({"src":"http://www-tc.pbskids.org/upload/theplatform/staging/http/images/pbskids/showthumbnails/dash-large.png"});

    if(audioData && typeof audioData == "object")
    {
      $("<audio/>")
        .attr({"width":"0","height":"0", "preload":"auto"})
        .appendTo($("button", o))
        .append($("<source/>").attr({"src":audioData[0]["Dash's Picks"][0]["mp3"],"type":"audio/mp3"      }))
        .append($("<source/>").attr({"src":audioData[0]["Dash's Picks"][0]["ogg"],"type":"audio/ogg"      }))
        .append($("<source/>").attr({"src":audioData[0]["Dash's Picks"][0]["mp3"],"width":"0","height":"0"}));

      $(o)
        .mouseenter(function(){
          delayedAudio( $("audio", this)[0] );
        })
        .mouseleave(function(){
          if(audioTimeout) clearTimeout(audioTimeout);
          $("audio", this)[0].pause();
        });
    }

    o.attr({"data-group":"ipad_kids_dashpicks", "title":"Dash's Picks"})
     .click(onCharacterSelected)
     .on(START_EV , function(e){$(this).addClass("active");})
     .on(END_EV   , function(e){$(this).removeClass("active");})
     .on(CANCEL_EV, function(e){$(this).removeClass("active");})
     .appendTo(__list);

    /* Build Remaining Character Buttons, randomized within their Groups */
    for(var i in __groups){
      while(__groups[i].length > 0) {
        var r = randomInt(__groups[i].length - 1);
        var s = __groups[i].splice(r,1)[0];
        var o = __model.clone();

        $("<img/>").attr({"src":s.thumbnailPreKLarge}).appendTo($("button", o));

        if(audioData)
        if(audioData[0])
        if(audioData[0][s.title])
        {
          $("<audio/>")
            .attr({"width":"0","height":"0", "preload":"auto"})
            .appendTo($("button", o))
            .append( $("<source/>").attr({"src":audioData[0][s.title][0]["mp3"],"type":"audio/mp3"}) )
            .append( $("<source/>").attr({"src":audioData[0][s.title][0]["ogg"],"type":"audio/ogg"}) )
            .append( $("<source/>").attr({"src":audioData[0][s.title][0]["mp3"],"width":"0","height":"0"}) );

          $(o)
            .mouseenter(function(){
              delayedAudio( $("audio", this)[0] );
            })
            .mouseleave(function(){
              if(audioTimeout) clearTimeout(audioTimeout);
              $("audio", this)[0].pause();
            });
        }//end if

        o.attr({"data-program":escape(s.title), "title":s.title})
         .click(onCharacterSelected)
         .on(START_EV , function(e){$(this).addClass("active")   ;})
         .on(END_EV   , function(e){$(this).removeClass("active");})
         .on(CANCEL_EV, function(e){$(this).removeClass("active");})
         .appendTo(__list);
      }//end while
    }//end for

    /* Reconfig the now populated list based on the browser width */
    prevView = null;
    $(window).resize();

  }//onShowslistLoaded()


  function delayedAudio(audio){
    try{
      audio.currentTime = 0;
      audio.volume = isMuted ? 0 : Math.min(1, Math.max(0, currentVolume));
      if(audioTimeout) clearTimeout(audioTimeout);//just in case it wasn't properly cleared on mouseleave
      audioTimeout = setTimeout(function(){ audio.play(); }, 500);
    }
    catch(e){/*Don't bother us*/}
  }//delayedAudio()


  function onTopicslistLoaded(data){
    data = data.items;
    var __list  = $("#topics-list");
    var __model = $("li.topicItem", __list).first();
    var __cleantTitle = function(title){ return title.replace(/\s/g,"_").replace(/\&/g,"and"); };
    var __sortTopics = function (a,b) {
      if ( (a.parent ? a.parent.name : "" ) + a.name < (b.parent ? b.parent.name : "" ) + b.name)
         return -1;
      if ( (a.parent ? a.parent.name : "" ) + a.name > (b.parent ? b.parent.name : "" ) + b.name)
        return 1;
      return 0;
    }//sortTopics()

    data.sort(__sortTopics);
    __list.empty();

    for(i in data){
      if(data[i].name.toLowerCase() != "spanish") {
        var o = __model.clone();
        $("span.label", o).html(data[i].name);
        o.attr("data-category", data[i].name)
         .click(onCategorySelected);

        if( !data[i].parent ){
          o.appendTo( __list ).addClass("parent-category-" + __cleantTitle(data[i].name));
        }
        else {
          var __parentTopic = $( "li.parent-category-" + __cleantTitle(data[i].parent.name), __list);
          var __lastSibling = $( "li." + __cleantTitle(data[i].parent.name) + "-child"     , __list).last();
          if( __parentTopic.length > 0 ) {
            o.addClass("child-topic")
             .addClass(__cleantTitle(data[i].parent.name) + "-child")
             .insertAfter( __lastSibling.length > 0 ? __lastSibling : __parentTopic );
          }
          else {
            o.appendTo(__list);
          }//end if
        }//end if
      }//end if
    }
    if(topicsScroll) topicsScroll.refresh();
  }//onTopicslistLoaded()


  function onShowPlaylist(){
    if(playlist) playlist.scrollToSelectedItem();
  }//onShowPlaylist()


  function onCharacterSelected(e){
    if( ( $(e.currentTarget).attr("data-group") || $(e.currentTarget).attr("data-program") ) == escape(currentCategory) ){
      playlist.next();
      trackEvent("Kids Browsing", "Show Buttons", currentCategory + " - Next Video");
    }
    else {
      $("#character-list ul li").addClass("disabled");
      player.unload();
      playlist.autoPlay(true);
      playlist.autoPlayNext(true);

      var __opts = {};
      for(var i in  _DEFAULT_PARAMS) __opts[i] = _DEFAULT_PARAMS[i];
      __opts.program = unescape($(e.currentTarget).attr("data-program") || "");
      __opts.group   = $(e.currentTarget).attr("data-group");

      playlist.refresh(__opts);
      trackEvent("Kids Browsing", "Show Buttons", (__opts.program || __opts.group) + " - New Category");
    }
  }//onCharacterSelected()


  function onProgramSelected(e){
    var __opts = {};
    for(var i in  _DEFAULT_PARAMS) __opts[i] = _DEFAULT_PARAMS[i];
    __opts.program = unescape($(e.currentTarget).attr("data-program") || "");
    browsingPlaylist.refresh(__opts);
    trackEvent("Parents Browsing", "Shows", __opts.program);
  }//onProgramSelected()


  function onCategorySelected(e){
    var __opts = {};
    for(var i in  _DEFAULT_PARAMS) __opts[i] = _DEFAULT_PARAMS[i];
    __opts.program  = showTitles.join(",");
    __opts.category = $(e.currentTarget).attr("data-category");
    browsingPlaylist.refresh(__opts);
    trackEvent("Parents Browsing", "Topics", __opts.category);
  }//onCategorySelected()


  function onLoadingPlaylist(e){
    switchBrowsingList("#view-now-playing-button", playlist.getContainerID(), nowplayingScroll, e.category);
    dropdowns[0].refreshLists = true;
    kuchuckaVanish();
  }//onLoadingPlaylist()


  function onLoadedPlaylist(e){
    if(kuchucka) if(kuchucka.copyFromPlaylist) kuchucka.copyFromPlaylist(playlist);
    onCompletePlaylist(e)
  }//onLoadedPlaylist()


  function onCopiedToPlaylist(e){
    switchBrowsingList("#view-now-playing-button", playlist.getContainerID(), nowplayingScroll, e.category);
    onCompletePlaylist(e)
  }//onCopiedToPlaylist()


  function onAppendedToPlaylist(e){
    if(kuchucka) if(kuchucka.appendItem) {
      var __list  = $("#kuchucka-playlist");
      var __top   = parseInt(__list.css("top"));
      var __first = $(".playlistItem[data-item-index=1]",__list);
      var __last  = $(".playlistItem",__list).filter(":last");
      for( i in e.playlist ){
        __item = kuchucka.appendItem(e.playlist[i]);
        if(__item){
          if(__first[0] != __last[0]) __item.insertAfter(__first);
          __top -= __item.outerHeight(true);
          __list.css("top", __top);
        }
      }
    }
    onCompletePlaylist(e)
  }//onAppendedToPlaylist()


  function onCompletePlaylist(e){
    $("#character-list ul li").removeClass("disabled").removeClass("selected");
    $('#character-list ul li[data-program="' + escape(e.category) + '"]').addClass("selected");
    $('#character-list ul li[data-group="' + escape(e.category) + '"]').addClass("selected");
    currentCategory = e.category;
    $("ul#now-playing-list").toggleClass("series-playlist", $.inArray(e.category, showTitles) > -1 );
    dropdowns[0].refreshLists = true;
    playlist.autoPlay(false);
    $("ul#now-playing-list li.playlistItem").each(function(){$(this).on("click",function(){$(window).scrollTop(0);});});
  }//onLoadedPlaylist()


  function onCopiedToKuchucka(e){
    var __top = 0;
    if($("#kuchucka").css("display") != "none"){
      var __item = $("#kuchucka-playlist .playlistItem.selected");
      if ( __item.length > 0 ) {
        var __prevItem = __item.prev();
        __top = -__prevItem.position().top - __prevItem.outerHeight(true) ;
      }
      else {
        __top = -$("#kuchucka-playlist").outerHeight(true) - $("#kuchucka").innerHeight() ;
      }
    }
    else{
      __top = -( 2 * $("#kuchucka").innerHeight() );
    }
    $("#kuchucka-playlist").css("top", __top );
  }//onCopiedToKuchucka()


  function onKuchuckaSelected(e){
    playlist.setFocusTo(e.release.guid);
    onReleaseSelected(e);
    trackEvent("Kids Browsing", "Kuchucka", e.release.series_title + "/" + e.release.title);
  }//onKuchuckaSelected()


  function moveKuchucka(guid){
    var __top;
    var __list      = $("#kuchucka-playlist");
    var __itemClass = ".playlistItem";
    var __numItems  = $(__itemClass, __list).length;
    if(!guid) return;

    __list.stop();
    $(__itemClass + ":animated", __list).stop().css("left",0)//safe-guard against the monster of a thousand clicks.

    var __currItem  = $(__itemClass,__list).removeClass("selected").filter(":last");
    var __currIndex =  (__currItem.prop("data-item-index") || 1);
    var __newItem   = $(__itemClass + ".guid_" + guid, __list).addClass("selected");
    if(__newItem.length == 0) return;

    var __indexPos = __newItem.prop("data-item-index");
    var __forwDist =   (__indexPos - __currIndex + __numItems)%__numItems;
    var __backDist = -((__indexPos - __currIndex - __numItems)%__numItems);

    if(__forwDist <= __backDist + 1 || ( __numItems <= 6 ) ) __moveDown(__forwDist);
    else if( parseInt(__list.css("top")) > - __list.outerHeight(true) + 4 ) __moveItemOut(__backDist);
    else __moveUp(__backDist);

    function __moveDown(steps){
      __top = -__newItem.position().top - __newItem.outerHeight(true);
      __list.animate( {"top" : __top}, 200, function(){ __moveItemIn(__insertItemsAbove,steps); } );
    }//__moveDown()

    function __moveUp(steps){
      __top = parseInt(__list.css("top"));
      __insertItemsBelow(steps);
      __top = -__newItem.position().top - __newItem.outerHeight(true);
      __currItem.animate( {"left" : 0}, 200, function(){ __list.animate( {"top" : __top}, 200,  __moveItemIn ); } );
    }//__moveUp()

    function __moveItemIn(onComplete, onCompleteParams){
      __newItem.animate(
        {"left":"120"}, 200,
        function(){
          __top += __newItem.outerHeight(true);
          __list.animate( {"top" : __top}, 200,
            function(){
              $(__itemClass,__list).css("left",0);
              if(onComplete) if(typeof onComplete == "function") {
                if( (typeof onCompleteParams != "object") || !(onCompleteParams instanceof Array) ) onCompleteParams = [onCompleteParams];
                onComplete.apply(this, onCompleteParams);
              }
            }//function()
          );//end animate
        }//function()
      );//end animate
    }//__moveItemIn()

    function __moveItemOut(steps){
      __currItem.css("left",120);
      __top  = -__currItem.position().top - __currItem.outerHeight(true);
      __list.animate( {"top" : __top}, 200,
        function(){
          __currItem.animate( {"left":0}, 200,
            function(){
              if(steps > 1) __moveUp(steps);
              else __insertItemsBelow(steps);
            }
          )
        }
      );
    }//__moveItemOut()

    function __insertItemsAbove(steps){
      for(var i = 1 ; i <= steps ; i++) {
        __top -= $(__itemClass,__list).filter(":last").insertBefore( $(__itemClass,__list).filter(":first") ).css("left","").outerHeight(true);
        __list.css("top", __top);
      }//end for
    }//__insertItemsAbove()

    function __insertItemsBelow(steps){
      for(var i = 1 ; i <= steps ; i++) {
        var __offset = $(__itemClass,__list).filter(":first").insertAfter( $(__itemClass,__list).filter(":last") ).outerHeight(true);
        __top += __offset;
        __list.css("top", __top);
      }//end for
    }//__insertItemsBelow()

  }//moveKuchucka()


  function kuchuckaVanish(playlistData, queryOptions, selectedID){
    /* Like the command "Ninja Vanish" from TMNT, the elements
       within the Kuchucka disappear in a cloud of smoke (poof) */
    $("#kuchucka-playlist .playlistItem").addClass("explode");
    $("#kuchucka-playlist .playlistItem .puff").animate({"width":2} , 400, function(){ $("img", this).hide(); });
    if(playlistData) setTimeout( function(){ kuchucka.copyPlaylistData(playlistData, queryOptions, selectedID); }, 500 );
  }//kuchuckaVanish()


  function onLoadingBrowsingList(e){
    switchBrowsingList(null, browsingPlaylist.getContainerID(), browsingScroll, e.category);
    dropdowns[0].refreshLists = true;
  }//onLoadingBrowsinglist()


  function onLoadedBrowsingList(e){
    if(e.playlist.length == 0 && e.type != org.pbskids.video.PlaylistEvent.APPEND_COMPLETE) $("#no-results-message").css("display","block");
    $("ul#browsing-list").toggleClass("series-playlist", $.inArray(e.category, showTitles) > -1 );
    dropdowns[0].refreshLists = true;
  }//onLoadedBrowsinglist()


  function onBrowsingListSelected(e){
    browsingPlaylist.abortLoad();
    $(window).scrollTop(0);
    if(kuchucka) kuchuckaVanish(browsingPlaylist.getListData(), browsingPlaylist.getQueryOptions(), e.release.guid);
    playlist.autoPlayNext(true);
    playlist.copyFromPlaylist(browsingPlaylist, e.release.guid);
    onReleaseSelected(e);
    browsingPlaylist.purge();
  }//onBrowsingListSelected()


  function onReleaseSelected(e){
    $('#current-video-info').addClass("hidden");
    $('#secondary-parent-buttons .parents-button').addClass("hidden");
    sponsorsDropdown.dropdown.hideDropdown();
    $("#sponsors-list").empty();

    if(e) if(e.release){
      closeErrorMessage();
      currentRelease = e.release;
      moveKuchucka(e.release.guid);

      $('#current-video-info').removeClass("hidden");
      $('#secondary-parent-buttons .parents-button').removeClass("hidden");

      /* Localization Bar */
      $('#localization-series-title').html(e.release.series_title || "No Series Title Available");
      $('#localization-video-title' ).html(e.release.title        || "No Video Title Available");
      $('#localization-video-length').html(player.formatTime(e.release.duration) || "--:--");

      /* Information Dropdown */
      $('#info-dropdown .list-title').html(e.release.series_title || "No Series Title Available");
      if(e.release.series_title) if(shows[e.release.series_title]) {
        var s = shows[e.release.series_title];

        if(e.release.type && s.FunderMessage)
          if(e.release.type.toLowerCase() == "episode" && s.FunderMessage.length > 0)
            displaySponsor(s.FunderMessage);

        $('#series-website-button'     ).attr("title",(e.release.series_title || "")).addHref(e.release.series_url);
        $('#series-parents-site-button').prop("data-series-title",(e.release.series_title || "")).addHref(s.RelatedLinks.pbsparents);

        $('#series-video-info #about-video').html(e.release.title        || "");
        $('#series-video-info #about-show' ).html(s.description          || "No information about this show is available");
        $('#series-video-info #age-range'  ).html(s.ages                 || "The target age range for this show is not available");
        $('#series-video-info #edu-goals'  ).html(s["educational goal"]  || "The educational goals for this show are not available");

        $('#series-video-info #marketButton-parents').prop("data-series-title",(e.release.series_title || "")).addHref(s.RelatedLinks.pbsparents);
        $('#series-video-info #marketButton-shop'   ).prop("data-series-title",(e.release.series_title || "")).addHref(s.RelatedLinks.shoppbs);
        $('#series-video-info #marketButton-itunes' ).prop("data-series-title",(e.release.series_title || "")).addHref(s.RelatedLinks.itunes);

        infoScroll.refresh();
        dropdowns[1].refreshLists = true;
        return;
      }//end if
    }//end if

    $('#series-website-button'     ).addHref(false);
    $('#series-parents-site-button').addHref(false);

    $('#series-video-info #about-video').html("");
    $('#series-video-info #about-show' ).html("No information about this show is available");
    $('#series-video-info #age-range'  ).html("The target age range for this show is not available");
    $('#series-video-info #edu-goals'  ).html("The educational goals for this show are not available");

    $('#series-video-info #marketButton-parents').addHref(false);
    $('#series-video-info #marketButton-shop'   ).addHref(false);
    $('#series-video-info #marketButton-itunes' ).addHref(false);

    infoScroll.refresh();
    dropdowns[1].refreshLists = true;

  }//onReleaseSelected()


  function onMuteChange(e){
    isMuted = e.muted;
    $('#mute-unmute-button').html(e.muted === true ? "Unmute" : "Mute");
    if(e.muted === true) $('#volume-button').addClass("muted");
    else $('#volume-button').removeClass("muted");
  }//onMuteChange()


  function onVolumeChange(e){
    currentVolume = e.volume;
    $('#mute-unmute-button').html(e.muted === true ? "Unmute" : "Mute");
    if(e.muted === true) $('#volume-button').addClass("muted");
    else $('#volume-button').removeClass("muted");
  }//onVolumeChange()


  function onKeyDown(e)
  {
    var keyCode = e.keyCode;

    switch(keyCode)
    {
        case Keyboard.SPACE :
          player.togglePause();
          e.preventDefault();
          break;

        case Keyboard.TAB:
        case Keyboard.RIGHT:
        case Keyboard.LEFT:
        case Keyboard.UP:
        case Keyboard.DOWN:
          //e.preventDefault();

        default: break;

    }//end switch

  }//onKeyDown()


  function onGoogleKeyDown(e)
  { //-- GOOGLE TV KEY CODES ----
    var GoogleKeyboard = {
          NEXT     : 176,
          PREVIOUS : 177,

          FORWARD : 228,
          REWIND  : 227,

          STOP         : 178,
          TOGGLE_PAUSE : 179
        };

    var keyCode = e.keyCode;
    if( keyCode == Keyboard.UP   && currentView != Views.EXPANDED ) keyCode = Keyboard.LEFT;
    if( keyCode == Keyboard.DOWN && currentView != Views.EXPANDED ) keyCode = Keyboard.RIGHT;

    switch(keyCode)
    {

        case Keyboard.SPACE :
        case GoogleKeyboard.TOGGLE_PAUSE: player.togglePause(); break;

        case GoogleKeyboard.NEXT     : playlist.next();      break;
        case GoogleKeyboard.PREVIOUS : playlist.previous();  break;
        case GoogleKeyboard.STOP     : player.pause();       break;

        case GoogleKeyboard.FORWARD : player.seekToTime(player.currentTime() + 10); break;
        case GoogleKeyboard.REWIND  : player.seekToTime(player.currentTime() -  5); break;

        case Keyboard.ENTER:
          if( $("#character-list ul li.focus").length > 0 ) $("#character-list ul li.focus").first().click();
          else $("#character-list ul li.selected").addClass("focus").first().click();
          break;

        case Keyboard.TAB:
        case Keyboard.RIGHT:
        case Keyboard.LEFT:
        case Keyboard.UP:
        case Keyboard.DOWN:
          e.preventDefault();

          var list = "#character-list ul",
              currentItem = $(list + " li.focus").get(0),
              tI, ct, cI;

          if( !currentItem ) {
            currentItem = $(list + " li.selected").get(0) || $(list + " li").get(0);
            $(currentItem).addClass("focus");
            characterScroll.scrollTo(0, 0, 100);
            return;
          }

          tI = $(list + " li").length;//total number of items in set
          ct = ( keyCode == Keyboard.UP || keyCode == Keyboard.DOWN ) ? 3 : 1;
          if( keyCode == Keyboard.LEFT || keyCode == Keyboard.UP ) ct *= -1;
          if( e.shiftKey ) ct *= -1;

          cI = $(currentItem).index();
          cI = (cI + ct + tI) % tI;

          $(list + " li.focus").removeClass("focus");
          currentItem = $(list + " li").eq(cI).addClass("focus");
          moveToCharacter(currentItem);

          break;

        default: break;

    }//end switch

  }//onGoogleKeyDown()


  function onResize()
  { /*************************************************************
      Reconfig the Character Scrolling List based on if its a
      horizontal list that spans the width of the page or not
    *************************************************************/
    if( Math.abs($("#character-list").width() - $(window).width()) > 4 )
			currentView = Views.EXPANDED ;
		else if( $("header hgroup.tabs").length  > 0 ) 
			currentView = $("header hgroup.tabs").css("display") != 'none' ? Views.COMPRESSED : Views.TIGHT;
		else //this should only be true on the kindle app where external links and the "Games" tabs do not exist
			currentView = $("#kuchucka").css("display") == 'none' ? Views.COMPRESSED : Views.TIGHT;

    if(prevView != currentView){
      if( currentView != Views.EXPANDED ){
        $("#character-list ul").width( $("#character-list ul li").length * $("#character-list ul li").outerWidth(true) + 2);
        if(characterScroll){
          characterScroll.options.vScroll = false;
          characterScroll.options.hScroll = true;
          characterScroll.options.onBeforeScrollStart = null;
        }
      }
      else{
        $("#character-list-container ul").css("width","100%");
        if(characterScroll){
          characterScroll.options.vScroll = true;
          characterScroll.options.hScroll = false;
          characterScroll.options.onBeforeScrollStart = function (e) { e.preventDefault(); };
        }
      }//end if

      /* Refresh Character iScrolls */
      if(characterScroll){
        characterScroll.refresh();
        updateCharacterScroll();
        var currentItem = $("#character-list-container ul li.focus").get(0);
        if( !currentItem ) currentItem = $("#character-list-container ul li.selected").get(0);
        if( currentItem ) moveToCharacter( $(currentItem) );
      }

      prevView = currentView;

    }//end if


    /* Refresh  Kuchucka */
    onCopiedToKuchucka(null);


    /* Setup Dropdown iScrolls for Refresh on next Dropdown.showDropdown(). This forces
       iScrolls which were hidden (display:none) when they auto-refreshed on window-resize.
    */
    if(dropdowns)
    for(i in dropdowns){
      dropdowns[i].refreshLists = true;
      dropdowns[i].enableLists = (currentView != Views.COMPRESSED);
      for(j in dropdowns[i].lists){
        if(dropdowns[i].enableLists) dropdowns[i].lists[j].enable();
        else dropdowns[i].lists[j].disable();
        dropdowns[i].lists[j].refresh();// Refresh all children iScroll lists after window resize
      }//end for
    }//end for
  }//onResize()


  /* Custom Classes
  *********************************************/
  Dropdown = function(dropdownID, toggleButtonID, lists, hideOthers, onShowComplete)
  {
    //-- Private Properties ----
    var _that = this;

    //-- Public Properties ----
    this.refreshLists = true;
    this.dropdown     = $("#"+dropdownID);
    this.toggleButton = $("#"+toggleButtonID);
    this.lists        = lists;
    this.enableLists  = true;
    this.hideOthers   = typeof hideOthers == "boolean" ? hideOthers : true;

    //-- Private Methods ----
    var _onShowComplete = function(){
      if(_that.lists) if(_that.refreshLists){
        for(i in _that.lists){
          if(_that.enableLists) _that.lists[i].enable();
          else _that.lists[i].disable();
          _that.lists[i].refresh();// Refresh all children iScroll lists after DOM change
        }
        _that.refreshLists = false;
      }
      if(onShowComplete) if(typeof onShowComplete == "function") onShowComplete.call(this);
    }//_onShowComplete()

    var _showDropdown = function(){
      (_that.dropdown).show().stop().addClass("active");
      if(_that.hideOthers) $("#core-parent-buttons").addClass("hasDropdown");
      if(_that.toggleButton) $(_that.toggleButton).addClass("active");// Highlight toggle button
      if(_that.dropdown.css("position")) _that.dropdown.animate({top: 0}, 200, _onShowComplete);//Drop the List
      else {
        _that.dropdown.css("top",0);//If in narrow-view (pocket device view) still set the top-position in case the window is later made wide
        _onShowComplete();
      }
    }//_showDropdown()

    //-- Public Methods ----
    this.showDropdown = function(){
      if(!_that.hideOthers) _showDropdown();
      else $(".dropdown.active").hideDropdown(true,_that, _showDropdown);
    }//Dropdown.showDropdown()

    //-- Add Classes and Bind Events ----
    if(_that.toggleButton) {
      (_that.toggleButton)
      .addClass("dropdown-toggle")
      .click(function(){
        if((_that.toggleButton).hasClass("active")) _that.dropdown.hideDropdown(true);
        else _that.showDropdown();
      });//.click()
    }//end if

    $(_that.dropdown.selector + " .close-button").click(function(){
      _that.dropdown.hideDropdown(true);
      if(_that == sponsorsDropdown) {
        clearInterval(sponsorTimerInterval);
        trackEvent("Sponsors", "forceClose", ( currentRelease.series_title || "No-Series-Title" ) + "/" + ( currentRelease.title || "No-Title" ), sponsorTimer);
      }
    });//.click()

  }//Dropdown()


  /* Custom jQuery Methods
  *********************************************/
  $.fn.addHref = function(url)
  {
    if(!url) $(this).attr('href', "").addClass("hidden");
    else $(this).attr('href', url).removeClass("hidden");
  }//$.fn.addHref()

  $.fn.hideDropdown = function(deactivate, caller, callbackFunction)
  {
    var dropdownsToHide = $(this).length;
    var hiddenDropdowns = 0;
    var onAnimationComplete = function(dropdown/*: jQuery Object */)
        {
          hiddenDropdowns++
          if(dropdown) dropdown.hide();
          /*
            Callback is the method to drop and activate the selected list. Only call that
            method to drop the list after all of the other lists have been deactivated/hidden/raised.
            Aside from the initial hide, there should never be more than dropdown to deactivate before
            activating the selected list, but this check exists as a "just in case" scenario.
          */
          if(hiddenDropdowns >= dropdownsToHide) if(callbackFunction) callbackFunction.call(caller);
        }//onAnimationComplete()

    if(dropdownsToHide == 0){
      /*
        No dropdowns to deactivate/hide/raise. If a callback
        exists, then activate/show/drop the selected list
      */
      if(callbackFunction) callbackFunction.call(caller);
      return;
    }

    $(this).each(function(){
      $(this).removeClass("active");
      if(deactivate === true) {
        $(".dropdown-toggle.active").removeClass("active");
        $("#core-parent-buttons").removeClass("hasDropdown");
      }
      if( $(this).css("position") ){//Raise the dropdown
        $(this).animate({top: -$(this).outerHeight()}, 200,function(){onAnimationComplete($(this));});
      }
      else{
        //If in narrow-view (pocket device view) still set the top-position in case the window is later made wide
        $(this).css("top",-$(this).outerHeight());
        onAnimationComplete($(this));
      }//end if
    });//.each()
  }//$.fn.hideDropdown()


  $.fn.resetStyles = function()
  {
    $(this).css({
      'display' : '',
      'padding-top' : '',
      'padding-bottom' : '',
      'padding-right' : '',
      'padding-left' : '',
      'margin-top' : '',
      'margin-bottom' : '',
      'margin-right' : '',
      'margin-left' : '',
      'top' : '',
      'left' : '',
      'overflow' : '',
      'position' : '',
      'width' : '',
      'height' : ''
    });
  }//$.fn.resetStyles()


  /* GO!
  ********************************/
  $(document).ready(init);

});


}
/*
     FILE ARCHIVED ON 06:33:21 Sep 26, 2013 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 19:48:39 Feb 11, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 111.835
  exclusion.robots: 0.277
  exclusion.robots.policy: 0.263
  cdx.remote: 0.099
  esindex: 0.012
  LoadShardBlock: 78.857 (3)
  PetaboxLoader3.datanode: 93.913 (5)
  CDXLines.iter: 16.383 (3)
  load_resource: 100.949 (2)
  PetaboxLoader3.resolve: 60.964 (2)
*/