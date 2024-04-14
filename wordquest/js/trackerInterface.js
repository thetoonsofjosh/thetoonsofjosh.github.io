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

function sendPageView(pageURL) {
	
	var sendURL = "WORDQUEST_" + pageURL;

	//alert("sendPageView, " + sendURL);
	//console.log("sendPageView, " + sendURL);
	GA_obj.trackPageview(sendURL);
}

function sendEvent(category, action, opt_label, opt_value) {

	var sendCategory = "WORDQUEST_" + category;
	
	if (opt_value == "" || opt_value == undefined) {
		GA_obj.trackEvent(sendCategory, action, opt_label);
	}
	else {
		
		var value = Number(opt_value);
		
		GA_obj.trackEvent(sendCategory, action, opt_label, value);
	}
	
	//console.log("sendEvent, " + sendCategory + ", " + action + ", " + opt_label + ", " + opt_value);
	//alert("sendEvent, " + sendCategory + ", " + action + ", " + opt_label + ", " + opt_value);
}

}
/*
     FILE ARCHIVED ON 16:35:37 Aug 09, 2013 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 16:06:34 Apr 14, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.565
  exclusion.robots: 0.069
  exclusion.robots.policy: 0.059
  cdx.remote: 0.057
  esindex: 0.01
  LoadShardBlock: 41.316 (3)
  PetaboxLoader3.datanode: 144.043 (5)
  load_resource: 180.155 (2)
  PetaboxLoader3.resolve: 67.96 (2)
*/