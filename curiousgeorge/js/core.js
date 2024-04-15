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

 ////////////////////////////////////////////////////////
	function openWin(URL,type,w,h) {
	
	var status = 'no';
	var reSize = 'no';
	var scroll = 'no';
	var toolbar = 'no';
	var location = 'no';
	var menubar = 'no';
	var directories = 'no';
	var ewindow;
	
	
	
	if (type == "vid") {
		if (!w) {
			w = 570;
		}
		if (!h) {
			h= 690;
		}
		reSize = 'no';		
	} 	

	if (type == "survey") {
		if (!w) {
			w = 570;
		}
		if (!h) {
			h= 690;
		}
		reSize = 'no';		
		scroll = 'yes';		
	} 	
	
	else {
		if (!w) {
			w = 350;
		}
		if (!h) {
			h= 360;
		}
		reSize = 'yes';		
	} 	
	
	var windowFeatures = 'width='+w+',height='+h+
									',toolbar='+toolbar+',status='+status+
									',scrollbars='+scroll+',resizable='+reSize+
									',menubar='+menubar+
									',location='+location+
									',directories='+directories+''
									
	ewindow = window.open(URL,type,windowFeatures);   
	ewindow.focus();
}


}
/*
     FILE ARCHIVED ON 04:24:53 Jan 16, 2013 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 01:51:06 Apr 15, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.582
  exclusion.robots: 0.067
  exclusion.robots.policy: 0.059
  cdx.remote: 0.065
  esindex: 0.009
  LoadShardBlock: 49.763 (3)
  PetaboxLoader3.datanode: 114.715 (5)
  load_resource: 327.484 (2)
  PetaboxLoader3.resolve: 77.341 (2)
*/