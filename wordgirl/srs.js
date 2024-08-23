var flashLinks = parent.gets;
if (PBS_FlashCanPlay(7)) {
    flashContent = '<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" WIDTH=775 HEIGHT=500 id="mymovie">'
                                         + '<PARAM NAME=movie VALUE="parent.swf">'
                                         + '<PARAM NAME=quality VALUE=high>'
                                         + '<PARAM NAME=menu VALUE=false>'
                                         + '<PARAM NAME=bgcolor VALUE=#1277C9>'
                                         + '<PARAM NAME="FlashVars" VALUE="movieid=mymovie&deepLinks=' + flashLinks + '">'
                                         + '<EMBED src="parent.swf" quality=high bgcolor=#1277C9  width=775 height=500 NAME=mymovie swLiveConnect=true TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" FlashVars="movieid=mymovie&deepLinks='+flashLinks+'">'
                                         + '</EMBED>'
                                         + '</OBJECT>'

    document.getElementById("flashdiv").innerHTML = flashContent;
} else {
	parent.window.location = "noFlash.html";
}