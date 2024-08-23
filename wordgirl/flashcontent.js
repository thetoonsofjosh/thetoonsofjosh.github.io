var flashLinks = parent.gets;
var cookieString = ""+document.cookie;
var flashLogo;
//alert("WORD GIRL parent.gets: "+parent.gets);
if ( cookieString.indexOf("fromkids") != -1 ) {
     flashLogo = 2
} else {
     flashLogo = 1
}
if (PBS_FlashCanPlay(7)) {
    flashContent = '<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" WIDTH=775 HEIGHT=500 id="mymovie">'
                                         + '<PARAM NAME=movie VALUE="http://pbskids.org/_/wordgirl/parent.swf">'
					 + '<PARAM NAME=allowScriptAccess VALUE="always">'
					 + '<PARAM NAME=base VALUE="http://pbskids.org/_/wordgirl/">'
                                         + '<PARAM NAME=quality VALUE=high>'
                                         + '<PARAM NAME=menu VALUE=false>'
                                         + '<PARAM NAME=bgcolor VALUE=#1277C9>'
                                         + '<PARAM NAME="FlashVars" VALUE="movieid=mymovie&deepLinks=' + flashLinks + '&logoType='+flashLogo+'">'
                                         + '<EMBED src="http://www-tc.pbskids.org/wordgirl/parent.swf" base="http://pbskids.org/_/wordgirl/" allowScriptAccess="always" quality=high bgcolor=#1277C9  width=775 height=500 NAME=mymovie swLiveConnect=true TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" FlashVars="movieid=mymovie&deepLinks='+flashLinks + '&logoType='+flashLogo+'">'
                                         + '</EMBED>'
                                         + '</OBJECT>'

    document.getElementById("flashdiv").innerHTML = flashContent;
} else {
	parent.window.location = "noFlash.html";
}
