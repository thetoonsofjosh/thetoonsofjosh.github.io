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

/*
 * Homepage Sizing Script
 * http://pbskids.org/
 *
 * Created by Nate Eagle
 * Text Resize Detector from A List Apart: http://www.alistapart.com/articles/fontresizing/ by Christian Heilmann and Lawrence Carvalho
 *
 * This is the current, uncompressed version of this file. This should be used for any modifications, then minified and placed in
 * homepage-size.min.js to be used as the production copy.
 *
 * Date: 2009-11-04 (Wed, 04 Nov 2009)
 * Revision: 1
 *
 * Modification log:
 * 
 * DATE         NAME				MODIFICATION
 * -------------------------------------------------------------
 * 2010-4-29    Nate Eagle          Place functions inside anonymous function, pass in the jQuery object so $ can be used instead of 'jQuery', other small optimizations    
 */

(function($){

    var win = $(window);

    // The home of all sizing logic
    function initializeHomepage() {
        var winHeight,
            winWidth, 
            footer, 
            footerHeight, 
            flashHeight,
            flashWidth;

//      footer = $('#footer');
		footer = $('.pk-footer');
        footerHeight = footer.outerHeight('true');
        flashHeight = win.height() - footerHeight;
        flashWidth = '100%';
        
        // Set minimum height and width
        if (flashHeight < 505) { flashHeight = 505 };
        if (win.width() < 955) { flashWidth = '955px' };
        
        $('#flashcontent').height(flashHeight + 'px');	
        $('#container').width(flashWidth);
        
        $('.flash-replaced embed').height(flashHeight + 'px');
    }

    // Create a variable for the resize timer - this timer reduces the frequency that initializeHomepage gets fired when a user is resizing the window.
    var resizeDelay = 0;

    // Initialize the homepage on page load.
    // To prevent possible race conditions with the CSS, we have it on window.load rather than document.ready
    $(win).load(function() {
        initializeHomepage();
    });

    // Reinitialize when window is resized
    win.bind("resize", function() {
        // Reset the timer every time the resize event is fired.
        clearTimeout(resizeDelay);
        // Set the timer to 300 again -- the initializeHomepage event should fire 300 miliseconds after the user stops resizing the window.
        resizeDelay = setTimeout(initializeHomepage, 300);
    });

    // Reinitialize when text size is changed
    // Requires that the /includes/javascript/textresizedetector.js script be included in the header of the page.

    // A List Apart's Font Resize Detector
    function init()  {
        var iBase = TextResizeDetector.addEventListener(onFontResize,null);
    }

    //id of element to check for and insert control
    TextResizeDetector.TARGET_ELEMENT_ID = 'container';

    //function to call once TextResizeDetector has init'd
    TextResizeDetector.USER_INIT_FUNC = init;
    function onFontResize(e,args) {
        var resized = document.getElementById('container');
        if(resized){
            initializeHomepage();
        }
    }

})(jQuery);


}
/*
     FILE ARCHIVED ON 22:41:51 Aug 09, 2013 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 16:06:34 Apr 14, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.543
  exclusion.robots: 0.065
  exclusion.robots.policy: 0.055
  cdx.remote: 0.05
  esindex: 0.01
  LoadShardBlock: 63.214 (3)
  PetaboxLoader3.datanode: 243.265 (5)
  load_resource: 595.106 (2)
  PetaboxLoader3.resolve: 406.383 (2)
*/