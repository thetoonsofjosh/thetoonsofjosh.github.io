/*
 * PBS KIDS Sizing Script
 * http://pbskids.org/
 *
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
 * NAME             MODIFICATION
 * -------------------------------------------------------------
 */

// alert("test...");

/*
function initializePage() {
    var containerHeight;
    if (jQuery('#footer').css('position') == 'static') {
        containerHeight = jQuery('#container').height();
    } else {
        containerHeight = jQuery('#container').height() + jQuery('#footer').height();
    }
    if (containerHeight > jQuery(window).height()) {
        jQuery('#footer').css({
            'position' : 'static'
        });
    } else {
        jQuery('#footer').css({
            'position' : 'static' //temporarily changed 'absolute' to 'static'
        });
    }
}


// Create a variable for the resize timer - this timer reduces the frequency that initializeHomepage gets fired when a user is resizing the window.
var resizeDelay = 0;

// Initialize the homepage on page load.
jQuery(window).load(function() {
    jQuery('#footer').show();
    initializePage();
});


// Reinitialize when window is resized
jQuery(window).bind("resize", function() {
    // Reset the timer every time the resize event is fired.
    clearTimeout(resizeDelay);
    // Set the timer to 300 again -- the initializeHomepage event should fire 300 miliseconds after the user stops resizing the window.
    resizeDelay = setTimeout(initializePage, 300);
});

*/
// All of the above commented out by JPW on 12-21-2010.


jQuery(document).ready(function($) {
    if($("body").hasClass("pk-landing-video")) {
            if( (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i)) ) {
                


                                    // ...
            

            } else {


                                    var criticalViewportHeight = 860;

                                    // First, check it on Initial Page Load.
                                    if($(window).height() < criticalViewportHeight) {
                                        $("html,body,#container").css("height","auto");
                                        $("#container").css("margin-bottom","0px");
                                    } else {
                                        $("html,body,#container").css("height","100%");
                                        $("#container").css("margin-bottom","-149px");
                                    }
                                    // Then, check it again every time the now-loaded page is RE-loaded.
                                    $(window).resize(function(){
                                        if($(window).height() < criticalViewportHeight) {
                                            $("html,body,#container").css("height","auto");
                                            $("#container").css("margin-bottom","0px");
                                        } else {
                                            $("html,body,#container").css("height","100%");
                                            $("#container").css("margin-bottom","-149px");
                                        }
                                    });


        } // end iOS check
    } // end "Video Page" check
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
        initializePage();
    }
}