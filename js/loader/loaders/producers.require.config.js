(function( require ){

  function loadSpringrollJSON(href, callback) {
    var xobj = new XMLHttpRequest();
    var url =  'https://' + window.location.hostname + window.location.pathname + '.springrollrc';
    
    if (xobj.overrideMimeType) {
      xobj.overrideMimeType("application/json");
    }
    
    xobj.open('GET', url, true);
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
        callback(xobj.responseText);
      }
    };
    xobj.send(null);
  };
  
  require.config( function(){
    var href = ( window.top != window ) ? document.referrer : window.location.href;
    var cdn  = "https://www-tc.pbskids.org";
    
    if (href.match(/^https?:\/\/((?!www(\-tc)?\.).+)pbskids\.org/)){
      // Override if on any subdomain other than 'www-tc'
      if (href.match(/soup\.pbskids\.org/))
        cdn = "https://soup-tc.pbskids.org";
      
      else if (href.match(/ernie\.pbskids\.org\//))
        cdn = "https://ernie-tc.pbskids.org";

      else
        cdn = 'https://' + window.location.host;
    }

    var shell_root    = cdn + (href.match(/\/~.*\/site\/?/) ? href.substring(0,href.indexOf("site") + 4) + "/" : "/shell/");
    var carson_root   = cdn + (function( m ){ return ( m ? m[0] : "/shell/" ); }( href.match(/(\/~([a-zA-Z0-9]+)\/)|\/cms/) ));
    var messages_root = cdn + '/messages/scripts/';
    var faye_root     = href.match(/chip\.pbskids\.org/) ? 'http://chip.pbskids.org:8080' : href.match(/super-vision-dev\.pbskids\.org/) ? 'http://super-vision-dev.pbskids.org:9000' : "https://supervision.pbskids.org:9300";
    
    if (typeof window.springroll === 'undefined'){
        window.springroll = {};
    }
    window.springroll.env = {};
    loadSpringrollJSON(href, function(response) {
    window.springroll.env = JSON.parse(response);
    });

    require.cdn = cdn;
    return{
      baseUrl: cdn + '/js/',
      urlArgs: "version=1.72",
      shim: {
        'sound': {
          exports: 'createjs'
        },
        'Handlebars': {
          exports: 'Handlebars'
        },
        'faye': {
          exports: 'Faye'
        }
      },
      paths: {
        //jQuery and jQuery Plugins
        'jquery'          : 'loader/lib/jquery/jquery-1.10.2',
        'jquery-easing'   : shell_root + 'js/lib/jquery/plugins/jquery-easing-1.3',
        'jquery-touch'    : shell_root + 'js/lib/jquery/jquery.mobile-1.3.1-touch-swipe-only.min',
        'jquery-mobile'   : shell_root + 'js/lib/jquery/jquery.mobile.custom',
        'jquery-bxslider' : shell_root + 'js/lib/jquery/plugins/jquery.bxSlider.min',

        //PBS KIDS HEADBAND MODULES
        'headband'            : shell_root + 'js/headband/producer-headband',
        'login'               : cdn + '/js/lib/login/login',
        'login-compatibility' : cdn + '/js/lib/login/login-compatibility',
        'localization'        : 'lib/localization/localization',

        //PBS KIDS MESSAGING SYSTEM
        'uuid'              : 'lib/PBS.KIDS.uuid',
        'jquery-noconflict' : messages_root + 'jquery/jquery-noconflict',
        'messages'          : messages_root + 'messages',
        'pubsub'            : messages_root + 'PubSubJS/PBS.KIDS.pubsub',

        //PBS KIDS Supervision
        'super-vision'        : 'pikachu/browser-client',
        'super-vision-overlay': 'pikachu/overlay',
        'socket.io'           : 'lib/PBS.KIDS.socket.io',
        'lodash'              : 'lib/PBS.KIDS.lodash.compat.min',
        'text'                : 'lib/PBS.KIDS.text',
        'Handlebars'          : 'lib/handlebars-v1.3.0',
        'hbars'               : 'lib/PBS.KIDS.hbars',
        'simple-storage'      : 'lib/PBS.KIDS.simple-storage',

        //Progress Tracker
        'utils'               : '/includes/progresstracker/js/utils',
        'queueingLibrary2'    : '/includes/progresstracker/js/queueingLibrary2',
        'game-tracker'        : '/includes/progresstracker/js/game-tracker',
        'identity-0.2'        : '/includes/progresstracker/js/identity-0.2',
        'activity-tracker'    : '/includes/progresstracker/js/activity-tracker',

        //Faye real-time communication client
        'event-emitter' : 'lib/PBS.KIDS.EventEmitter',
        'faye'          : faye_root + '/faye/client',
        'faye-client'   : cdn + '/super-vision/faye-client/connection',

        //Page Views
        'shell' : shell_root + 'js/shell',

        //Other Plugins and Libs
        'images-loaded'   : shell_root + 'js/lib/imagesloaded',
        'sound'           : shell_root + 'js/lib/Sound',
        'howler'          : shell_root + 'audio/howler',
        'swf-object'      : shell_root + 'js/lib/swfobject-2.2.min',

        'kinetic'         : shell_root  + 'js/lib/kinetic-v5.0.1.min',
        'the-wheel'       : shell_root  + 'js/the-wheel/the-wheel',
        'carson'          : carson_root + 'carson/carson',

        'bridge-overlay'  : "lib/bridge-overlay/bridge",
        'bridge-urls'     : "lib/bridge-overlay/bridge.urls",

        'jquery-video'    : 'https://www-tc.pbskids.org/pbsk/video/lib/jquery.pbskidsvideo.min-latest',
        'progress-tracker': 'progress-tracker url has not yet been defined'
      }
    };
  }());


  //Loaders for Supervision
  (function(){
    var getCookie = function(a){var b=document.cookie,c=b.indexOf(" "+a+"=");if(-1==c&&(c=b.indexOf(a+"=")),-1==c)b=null;else{c=b.indexOf("=",c)+1;var d=b.indexOf(";",c);-1==d&&(d=b.length),b=unescape(b.substring(c,d))}return b}
    var isIE7 = Boolean( navigator.appVersion.indexOf("MSIE 7.") != -1 );
    var hasSupervision = !isIE7;
    if( hasSupervision ) require( ["super-vision", "super-vision-overlay"] );
  })();

  //Loaders
  require( ["activity-tracker"],
    function(tracker){
      tracker.start()
    } 
  );
  require( ["messages", "headband"] );//require headband AFTER supervision

}( PBS.KIDS.require ));
