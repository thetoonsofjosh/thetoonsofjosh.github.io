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

document.write("<script type='text/javascript' src='https://web.archive.org/web/20100329201816/http://www.pbs.org/includes/flash/swfobject.js'></script>");
document.write("<script type='text/javascript' src='https://web.archive.org/web/20100329201816/http://pbskids.org/go/video/js/qos.js'></script>");
document.write("<script type='text/javascript' src='https://web.archive.org/web/20100329201816/http://pbskids.org/go/video/js/ga.js'></script>");
document.write("<script type='text/javascript' src='https://web.archive.org/web/20100329201816/http://pbskids.org/go/video/js/qos_mps.js'></script>");
document.write("<script type='text/javascript' src='https://web.archive.org/web/20100329201816/http://pbskids.org/modules/kidsgo/setcookie.js'></script>");
document.write("<script type='text/javascript' src='https://web.archive.org/web/20100329201816/http://pbskids.org/modules/kidsgo/window.js'></script>");
document.write("<link rel='stylesheet' type='text/css' href='https://web.archive.org/web/20100329201816/http://pbskids.org/includes/localize/localize.css'>");
document.write("<link rel='stylesheet' type='text/css' href='https://web.archive.org/web/20100329201816/http://pbskids.org/includes/javascript/yui/2.5.2/build/container/assets/skins/sam/container.css'>");
document.write("<script type='text/javascript' src='https://web.archive.org/web/20100329201816/http://pbskids.org/includes/javascript/yui/2.5.2/build/yahoo-dom-event/yahoo-dom-event.js'></script>");
document.write("<script type='text/javascript' src='https://web.archive.org/web/20100329201816/http://pbskids.org/includes/javascript/yui/2.5.2/build/connection/connection-min.js'></script>");
document.write("<script type='text/javascript' src='https://web.archive.org/web/20100329201816/http://pbskids.org/includes/javascript/yui/2.5.2/build/container/container-min.js'></script>");
document.write("<script type='text/javascript' src='https://web.archive.org/web/20100329201816/http://pbskids.org/includes/localize/localize.js'></script>");
    
//    SET THIS VALUE TO "true" IF THE PLATFORM IS DOWN AND/OR PLAYER IS DOWN
//  when set to "true" each instance of the broadband player will display a "Site Down" page.
var siteDown = false;

function getUrlVars(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
 
    for(var i = 0; i < hashes.length; i++){
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    
    return vars;
}

if(!this.pbs) this.pbs = {};
if(!pbs.kidsgo) pbs.kidsgo = {};
pbs.kidsgo.broadbandplayer = {};

pbs.kidsgo.broadbandplayer.init = function(_stationID, _supersite, _configObj) {
    //GET PID FROM URL
    var urlPID;
    var urlCategory;
    var accountPortalID = _configObj && _configObj.feedID ? _configObj.feedID : "rjSDErhLvLTAl4Q__FuvtUBOdfslKYDM"; //production feed if not other feed is set
    var communityAccountID = _configObj && _configObj.communityID ? _configObj.communityID : 824012198; // production community if no other community is set
    var host = _configObj && _configObj.host ? _configObj.host : "pbskids.org"; // production host if no other host is set
    var path = _configObj && _configObj.path ? _configObj.path : "/go/video/"; //production path if no other path is set
    var cdn = _configObj && _configObj.cdn ? _configObj.cdn : "https://web.archive.org/web/20100329201816/http://www-tc.pbskids.org/go/video/"; // production cdn if no other cdn is set
    var releasesEndIndex = 100;
    var categoriesEndIndex = 100;
    var showsEndIndex = 30;
    
    var GET_vars = getUrlVars();
    urlPID = GET_vars["pid"] ;
    urlCategory = GET_vars["category"];

    var noFlashText = _configObj && _configObj.noFlashText ? _configObj.noFlashText : "";
    
    //END GET PID FROM URL
    // create container div for flash
    if (!siteDown) {
        var _flashcontentDiv = document.getElementById('flashcontent');
        
        if ( _flashcontentDiv == null) {
            document.write("<div id='flashcontent' style='height: 800px;width:100%'></div>");
        } else {
            _flashcontentDiv.style.width = '100%';
            _flashcontentDiv.style.height = '800px';
        }
        var stationLogo = "https://web.archive.org/web/20100329201816/http://www.pbs.org/images/stations/standard/"+_stationID+".gif";

        var html_str ='<script type="text/javascript">var fo = new SWFObject("http://' + host + path + 'broadband_player.swf", "PBS Kids Go!", "100%", "100%", "9", "#ffffff");fo.addParam("wmode", "transparent");fo.addParam("quality", "high");fo.addParam("align", "middle");fo.addParam("play", "true");fo.addParam("loop", "true");fo.addParam("scale", "noScale");fo.addParam("wmode", "transparent");fo.addParam("devicefont", "false");fo.addParam("menu", "false");fo.addParam("allowFullScreen", "true");fo.addParam("allowNetworking", "all");fo.addParam("allowScriptAccess", "always");fo.addVariable("supersite", "'+_supersite+'");fo.addVariable("airdatesURL", "'+cdn+'airdates.swf");fo.addVariable("STATION_TVDATA_NAME", "'+_stationID+'");fo.addVariable("pidToPlayer", "'+urlPID+'");fo.addVariable("categoryToPlayer", "'+urlCategory+'");fo.addVariable("accountPortalID", "'+accountPortalID+'");fo.addVariable("stationLogo", "'+stationLogo+'");fo.addVariable("communityAccountID", '+communityAccountID+');fo.addVariable("releasesEndIndex", '+releasesEndIndex+');fo.addVariable("categoriesEndIndex", '+categoriesEndIndex+');fo.addVariable("showsEndIndex", '+showsEndIndex+');fo.addVariable("swfHost","'+cdn+'");fo.addVariable("newHeaderURL","https://web.archive.org/web/20100329201816/http://www-tc.pbs.org/upload/theplatform/staging/http/images/kidsgo/headers/newVideos.jpg");'

    
           html_str += cdn == './' ? '' : 'PBS_enable_cdn(fo);';
        html_str += 'fo.write("flashcontent");</script>';
    
    } else {
    
    html_str = '<style type="text/css">body {margin: 0px;height: 100%;width: 100%;}</style> <table border="0" cellspacing="0" cellpadding="0" width="100%" height="90%" valign="middle"><tr><td><div style="margin:auto; width:760px; height:376px"><img src="https://web.archive.org/web/20100329201816/http://pbskids.org/go/video/images/down.jpg" border="0" alt="Our site is down, but we will be back soon. Just play outside or clean your room!"></div></td></tr></table>' ; 
    
    }
    
    document.write(html_str);
}; 

}
