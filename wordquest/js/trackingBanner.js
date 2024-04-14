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

function showTrackingBanner() {
	
	var params = {
		quality: "high",
		scale: "noscale",
		allowscriptaccess: "always",
		bgcolor: "#FFFFFF"
	};
	
	var flashvars = {
	};
			
	var attributes = {
		id: "flashTrackingBannerContent",
		name: "flashTrackingBannerContent"
	};
	
	swfobject.embedSWF("https://web.archive.org/web/20130809164352/http://www-tc.pbskids.org/wordquest/media/swf/modules/trackingBanner/trackingBanner.swf", "flashTrackingBannerContent", "960", "90", "9.0.124", "https://web.archive.org/web/20130809164352/http://www-tc.pbskids.org/wordquest/media/swf/global/expressInstall/expressInstall.swf", flashvars, params, attributes);
	
	setStyle('flashTrackingBannerContent','display','block');
	setStyle('trackingBannerContainer','height','110px');
}

function setStyle(objId, style, value){
   document.getElementById(objId).style[style]= value;
}
/* USAGE:
 * objId    = element id.
 * style    = the style to be changed.
 * value    = the value assigned to the style.
*/

}
/*
     FILE ARCHIVED ON 16:43:52 Aug 09, 2013 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 16:06:34 Apr 14, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.639
  exclusion.robots: 0.073
  exclusion.robots.policy: 0.062
  cdx.remote: 0.059
  esindex: 0.009
  LoadShardBlock: 90.521 (3)
  PetaboxLoader3.datanode: 142.636 (5)
  load_resource: 316.468 (2)
  PetaboxLoader3.resolve: 188.379 (2)
*/