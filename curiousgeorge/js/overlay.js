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

// Using jQuery from headband that is bound to PBS.KIDS.$_auth, not $

jQuery(document).ready(function() {

    // Set height of overlay to match page height
    jQuery(window).resize(function() {
        var page_height = jQuery(document).height();
        var page_width = jQuery(document).width();

        jQuery('#cg-overlay .cg-fade').height(page_height + 41).width(page_width);
    });

    jQuery('.cg-overlay-trigger').click(function (e){
	jQuery('#cg-overlay').fadeIn();
	GA_obj.trackEvent("curiousgeorge.com bridge", "Open");
	e.preventDefault();
    });

    jQuery('.advanceToDestination').click(function(e){
	GA_obj.trackEvent("curiousgeorge.com bridge", "Follow link");
    });

    jQuery('#cg-overlay .cg-overlay-close').click(function (e){
	jQuery('#cg-overlay').fadeOut();
	GA_obj.trackEvent("curiousgeorge.com bridge", jQuery(e.target).attr('title'));
	e.preventDefault();
    });

});

}
/*
     FILE ARCHIVED ON 11:17:30 Aug 25, 2013 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 01:51:14 Apr 15, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.929
  exclusion.robots: 0.127
  exclusion.robots.policy: 0.115
  cdx.remote: 0.09
  esindex: 0.013
  LoadShardBlock: 64.699 (3)
  PetaboxLoader3.datanode: 175.892 (4)
  load_resource: 207.502
  PetaboxLoader3.resolve: 90.367
*/