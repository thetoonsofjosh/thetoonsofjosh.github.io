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

//////////////////////////////////////////////////////
// every page's onLoad, regardless of the page, calls
// this function. each individual page should define its
// own loadContent function.
//////////////////////////////////////////////////////
function onLoad(){
	window.onresize = function(event){
		fixWidths(getSize());
	}
	preloadImgs();
	loadTopNavSFX();
	loadContent();
}
//////////////////////////////////////////////////////
// there is a requirement to play sfx on img rollover
// this swf handles that placement
//////////////////////////////////////////////////////
function loadTopNavSFX(){
	if( typeof PBS_FlashCanPlay == 'function' && !PBS_FlashCanPlay(9) ){
		document.getElementById("topNavSFX").innerHTML = 'Please download the latest version of Flash to view this page.';
	} else {
		var obj	= new SWFObject('topNavSFX.swf', 'topnavsfxswf', '5', '5', '9', '#D97825');
		obj.write('topNavSFX');
	}
}

//////////////////////////////////////////////////////
// for preloading rollover imgs
//////////////////////////////////////////////////////
function preloadImgs(){
	if( document.images ){
		var obj		= new Image();
		var images	= new Array();
		images[0]	= "/dinosaurtrain/media/images/topNav_13-over.jpg";	
		images[1]	= "/dinosaurtrain/media/images/topNav_14-over.jpg";	
		images[2]	= "/dinosaurtrain/media/images/topNav_15-over.jpg";	
		images[3]	= "/dinosaurtrain/media/images/topNav_16-over.jpg";	
		images[4]	= "/dinosaurtrain/media/images/bottomNav_24-over.jpg";	
		images[5]	= "/dinosaurtrain/media/images/bottomNav_25-over.jpg";	
		for(var i=0; i<images.length; i++){
			obj.src	= images[i];
		}
	}
}
//////////////////////////////////////////////////////
// TOP NAV MOUSE EVENTS 
//////////////////////////////////////////////////////
function gamesOver(obj){
	obj.src	= "/dinosaurtrain/media/images/topNav_13-over.jpg";	
	playswfSFX("games");
}
function gamesOut(obj){
	obj.src	= "/dinosaurtrain/media/images/topNav_13.jpg";	
}
function fieldGuideOver(obj){
	obj.src	= "/dinosaurtrain/media/images/topNav_14-over.jpg";	
	playswfSFX("fieldGuide");
}
function fieldGuideOut(obj){
	obj.src	= "/dinosaurtrain/media/images/topNav_14.jpg";	
}
function printablesOver(obj){
	obj.src	= "/dinosaurtrain/media/images/topNav_15-over.jpg";	
	playswfSFX("printables");
}
function printablesOut(obj){
	obj.src	= "/dinosaurtrain/media/images/topNav_15.jpg";	
}
function videoOver(obj){
	obj.src	= "/dinosaurtrain/media/images/topNav_16-over.jpg";	
	playswfSFX("videos");
}
function videoOut(obj){
	obj.src	= "/dinosaurtrain/media/images/topNav_16.jpg";	
}
//////////////////////////////////////////////////////
// Replaces all flash content with the non-flash
// box explaining how to get flash
//////////////////////////////////////////////////////
function getNonFlashContent(title){
	var content 	= "<center><br><br><div class='nonFlashBox'>";
	content		+= "<h2>Flash Plug-in Required for this Web site.</h2>";
	content		+= "<table style='width: 600px;'>";
	content		+= "<tr><td width='50%'><img src='/dinosaurtrain/media/images/nonFlashTrain.gif' alt='Dinosaur Train'></td>";
	content		+= "<td>We're glad you're here! To use the "+title+", you'll ";
	content		+= "need to download the latest version of Adobe Flash Player. ";
	content		+= "Once you have the <a href='BRIDGE'>Adobe Flash Player</a> installed, you can ";
	content		+= "use the "+title+" by clicking here:<br><br>";
	content		+= "<a href='"+location.href+"'>"+location.href+"</a>";
	content		+= "</td></tr></table>";
	content		+= "</div></center>";
	return content;
}
///////////////////////////////////////////////
// gets and returns the size of the browser
///////////////////////////////////////////////
function getSize() {
  var myWidth = 0;
  if( typeof( window.innerWidth ) == 'number' ) {
    //Non-IE
    myWidth = window.innerWidth;
  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    //IE 6+ in 'standards compliant mode'
    myWidth = document.documentElement.clientWidth;
  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    //IE 4 compatible
    myWidth = document.body.clientWidth;
  }
  return ( myWidth > 1099 ) ? 1100 : 960;
}
///////////////////////////////////////////////
// gives us the hostname of the server
///////////////////////////////////////////////
function getHost(){
	var url 	= "" + window.location;
	var parts	= url.split("/");
	return parts[2];	
}
///////////////////////////////////////////////
// fixes the 960vs.1100 problem
///////////////////////////////////////////////
function fixWidths(w){
	fixTopAndContent(w);
	document.getElementById('bottom-right').style.width	= ((w==1100) ? "314" : "247")+"px";
	document.getElementById('bottom-left').style.width	= ((w==1100) ? "321" : "248")+"px";
}
function fixTopAndContent(w){
	document.getElementById('main_content').style.width	= w+"px";
	document.getElementById('top-left').style.width		= ((w==1100) ? "48" : "13")+"px";
	document.getElementById('top-right').style.width	= ((w==1100) ? "133" : "28")+"px";
	if( document.getElementById('swfContent') ){
		document.getElementById('swfContent').style.width = w;
	}
	
}


}
/*
     FILE ARCHIVED ON 18:41:56 Jan 11, 2010 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 16:45:56 Aug 23, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.447
  exclusion.robots: 0.017
  exclusion.robots.policy: 0.008
  esindex: 0.009
  cdx.remote: 6.465
  LoadShardBlock: 219.297 (3)
  PetaboxLoader3.datanode: 114.402 (4)
  PetaboxLoader3.resolve: 256.809 (3)
  load_resource: 169.483
*/