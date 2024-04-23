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

(function() {

    var exclude = [ /^\/designsquad/ ]; 
    
    for (var i=0; i < exclude.length; i++){ 
	if (window.location.pathname.match(exclude[i])){
	    return 0;
	}  
    }

    var getCookie = function(c_name) {
	if (document.cookie.length>0) {
            c_start=document.cookie.indexOf(c_name + "=");
            if (c_start!=-1) {
		c_start=c_start + c_name.length+1;
		c_end=document.cookie.indexOf(";",c_start);
		if (c_end==-1) c_end=document.cookie.length;
		return unescape(document.cookie.substring(c_start,c_end));
            }
	}
	return "";
    };
    
    var surveyed = getCookie('surveyed');

    var FREQUENCY = 1000;
    var rn;


    if (!surveyed){	
	rn = Math.floor(Math.random() * FREQUENCY);
	if (rn == 0){
	    
	    var head = document.getElementsByTagName('head')[0];
            var js = document.createElement('script');
            js.setAttribute('type', 'text/javascript');
	    js.setAttribute('src', '/survey/2014/js/pbskids-survey.js');
            head.appendChild(js);	 
	}
    }
    
})();

}
/*
     FILE ARCHIVED ON 21:52:46 Mar 07, 2014 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 22:56:00 Apr 23, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.699
  exclusion.robots: 0.087
  exclusion.robots.policy: 0.076
  cdx.remote: 0.066
  esindex: 0.01
  LoadShardBlock: 52.703 (3)
  PetaboxLoader3.datanode: 88.998 (5)
  load_resource: 160.136 (2)
  PetaboxLoader3.resolve: 99.441 (2)
*/