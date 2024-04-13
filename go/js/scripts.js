jQuery(document).ready(function($) {




    // -----------------------------------------------------------------------------
    // GO! Login Bar
    // -----------------------------------------------------------------------------

    if($("#pbskidsgologinbar").length != 0) {

        // Well, it seems we've successfully logged in. Proceed with tweaking...
        $(".go-login").removeClass("go-login-unauthed");
        $(".go-login-invitation").remove();

    }



    // -----------------------------------------------------------------------------
    // "All Games": Page Identification
    // -----------------------------------------------------------------------------

    if($(".band-pagecontent-allgames").length != 0) {
        $("body").addClass("page-all-games");
    }



    // -----------------------------------------------------------------------------
    // "Newest Games": Teaser
    // -----------------------------------------------------------------------------
    /*
    $(".newest-games-list a").each(function(){
        $(this).hover(
            function(){
                if(!$(this).find(".teaser").is(":animated")){
                    $(this).find(".teaser").stop().slideDown("fast");          
                }
            },
            function(){
                if(!$(this).find(".teaser").is(":animated")){
                    $(this).find(".teaser").slideUp("fast");          
                }
            }
        );
    });
    */
    $(".newest-games-list a").each(function(){
        $(this).mouseover(function(){
            $(this).find(".teaser").show();
        }).mouseout(function(){
            $(this).find(".teaser").hide();
        });
    });






    // -----------------------------------------------------------------------------
    // "Newest Games": REALLY new games
    // -----------------------------------------------------------------------------
    $(".newest-games-list li").each(function(){
        if($(this).hasClass("new")){
            $(this).find("a").prepend("<em class=\"new-ribbon\">New</em>");
        }
    });



    

    // -----------------------------------------------------------------------------
    // "Newest Videos": Full Episodes
    // -----------------------------------------------------------------------------
    $(".column-newest-videos li").each(function(){
        if($(this).hasClass("episode")){
            $(this).find("figure").prepend("<em>Full Episode</em>");
        }
    });




    // -----------------------------------------------------------------------------
    // "Newest Games": Dynamic Scroller
    // -----------------------------------------------------------------------------

    $("#scrolltrack-a").jqxScrollBar({
        width: 474,
        height: 33,
        thumbMinSize: 190,
        showButtons: false
    });

    // Set globally-accessible VALUE variable.
    var newGamesCurValue = 0;

    // Trigger the 'valuechanged' event.
    $("#scrolltrack-a").bind('valuechanged', function (event) {
        var incomingVal = parseInt(event.currentValue);
        var effectiveTrackWidth = 815;
        var trackPortion = incomingVal / 1000;
        var trackPosition = 0 - (trackPortion * effectiveTrackWidth);
        $(".newest-games-list").css("left", trackPosition);
        // Update the "value" variable
        newGamesCurValue = incomingVal;
    });

     // Manual pagination.
    $(".newest-games .paginate").click(function(){

        var targetPosition;

        if($(this).hasClass("paginate-left")) {
            targetPosition = newGamesCurValue - 300;
        } else {
            targetPosition = newGamesCurValue + 300;
        }

        $("#scrolltrack-a").jqxScrollBar("setPosition", targetPosition); 
    });





    // -----------------------------------------------------------------------------
    // "Featured Games": Dynamic Scroller
    // -----------------------------------------------------------------------------

    $("#scrolltrack-b").jqxScrollBar({
        width: 765,
        height: 33,
        thumbMinSize: 332,
        showButtons: false
    });

    // Set globally-accessible VALUE variable.
    var featGamesCurValue = 0;
    
    // Trigger the 'valuechanged' event.
    $("#scrolltrack-b").bind('valuechanged', function (event) {
        var incomingVal = parseInt(event.currentValue);
        var effectiveTrackWidth = 1685;
        var trackPortion = incomingVal / 1000;
        var trackPosition = 0 - (trackPortion * effectiveTrackWidth);
        $(".featured-games-panes").css("left", trackPosition);
        // Update the global variable...
        featGamesCurValue = parseInt(event.currentValue);
    });
    
     // Manual pagination.
    $(".featured-games-framing .paginate").click(function(){

        var targetPosition;

        if($(this).hasClass("paginate-left")) {
            targetPosition = featGamesCurValue - 500;
        } else {
            targetPosition = featGamesCurValue + 500;
        }

        $("#scrolltrack-b").jqxScrollBar("setPosition", targetPosition); 
    });



    // -----------------------------------------------------------------------------
    // Safely insert the "All Shows" button back into the SHOW LEDGE
    // -----------------------------------------------------------------------------
    $(".band-showledge .wrap").prepend("<mark class=\"ledge-allshows\"><a href=\"/everything.html\" title=\"All Shows\">All Shows</a></mark>");






    // -----------------------------------------------------------------------------
    // "Find Your Local Schedule": Personalize if you're localized
    // -----------------------------------------------------------------------------
    if($(".acknowledgement-block-localize img").length != 0) {

        var localStationLogo            = $(".acknowledgement-block-localize img").attr("src");
        
        if($("body").hasClass("home")){
            var promptGraphicUrl        = $(".column-tv-times .content img").attr("src").replace("tv-times.png","tv-times-localized.png");
            $(".column-tv-times .content img").attr("src",promptGraphicUrl);
            $(".column-tv-times footer a span").text("TV Times");
            $(".column-tv-times").addClass("column-tv-times-localized").find("footer").append("<img src=\"" + localStationLogo + "\" class=\"station\" alt=\"Local station logo\" />");    
        }

    }





    // -----------------------------------------------------------------------------
    // Mechanise the "SHOWS" drawer
    // -----------------------------------------------------------------------------
    $(".launchpad .shows a,.drawer-retract,.ledge-allshows a").click(function(){

            if($(".launchpad").hasClass("launchpad-shows")){

                    // Retract the drawer
                    $(".band-showdrawer").animate({
                        top: '-425'
                    }, 300, function() {
                        $(".launchpad").removeClass("launchpad-shows");
                        $(".ledge-allshows").removeClass("ledge-allshows-active");
                        $(".page-interior").removeClass("drawered");
                    });

                    return false;

            } else {
            
                    // Assign styling
                    $(".launchpad").addClass("launchpad-shows");
                    $(".ledge-allshows").addClass("ledge-allshows-active");
                    $(".page-interior").addClass("drawered");
            
                    // Release the drawer
                    $(".band-showdrawer").animate({
                        top: '110'
                    }, 450, function() {
                        // ...
                    });

                    return false;

            }
        
    });





    // -----------------------------------------------------------------------------
    // End-of-video prompt
    // -----------------------------------------------------------------------------
    /*
    function videoEpilogue(){
        $(".video-epilogue a").animate({
            bottom: '0'
          }, 400, function() {
            // Animation complete.
          });
    }

    $("#testrun").click(function(){
        videoEpilogue();
    });
    */



    // -----------------------------------------------------------------------------
    // Fudge the "FOOTER" Burbank links
    // -----------------------------------------------------------------------------
    $(".appendix .jumps li").each(function(){
        $(this).prependTo($(".appendix .jumps ul"));
    });




    // -----------------------------------------------------------------------------
    // ALL GAMES: Tweak every 4th node in a GAME LIST
    // -----------------------------------------------------------------------------
    $(".shelf-gamecat ul,.shelf-topten ul").each(function(){
        $(this).find("li:nth-child(3n)").addClass("exempt");
    });



    // -----------------------------------------------------------------------------
    // ALL GAMES: Throw a bunch of "Back To Top" links in there
    // -----------------------------------------------------------------------------
    $(".shelf-gamecat").each(function(){
        $(this).append("<div class=\"back-to-top\"><a href=\"#top\">Back to top</a></div>");
    });



    // -----------------------------------------------------------------------------
    // ALL GAMES: Give each TOP TEN game a little ribbon
    // -----------------------------------------------------------------------------
    var myIncrement;

    $(".shelf-topten li").each(function(){
        myIncrement = ($(this).index()) + 1;
        $(this).addClass("topten-" + myIncrement).find("a").prepend("<span>" + myIncrement + "</span>");
    });


    // -----------------------------------------------------------------------------
    // ALL GAMES: Topic Picker
    // -----------------------------------------------------------------------------
   /* $(".topic-picker h4").click(function(){
        if($(".topic-picker nav").hasClass("active")){
            $(".topic-picker nav").removeClass("active");
            $(this).closest("nav").find("ul").slideUp(230);
        } else {
            $(".topic-picker nav").addClass("active");
            $(this).closest("nav").find("ul").slideDown(230);
        }
    });

    $(".topic-picker li").click(function(){
        var whereTo = $(this).attr("data-topic");
        var whereToCosmetic = $(this).text();
        $(".topic-picker h4").text(whereToCosmetic);
        $(".topic-picker nav").removeClass("active");
        $(".topic-picker ul").hide();
        window.location.hash = "#" + whereTo;
		
		console.log($(this), whereTo);
    });*/
	
	
// -----------------------------------------------------------------------------
// PROMO - Cartoon studio character swap
// -----------------------------------------------------------------------------
  var swapImages = function (){
      var $active = $('#swap_out .active');
      var $next = ($('#swap_out .active').next().length > 0) ? $('#swap_out .active').next() : $('#swap_out img:first');
      $active.fadeOut(400,function(){
      $active.removeClass('active');
      $next.fadeIn(400).addClass('active');
      });
   }
     // Run our swapImages() function every 3secs
//     var startSwapInterval = function(){
 //	setInterval(swapImages, 3000);
  // }
   // Run our swapImages() function every 3secs
   setInterval(swapImages, 3000);

	
// -----------------------------------------------------------------------------
// GAMES PAGE - sorter tabs
// -----------------------------------------------------------------------------
  $('#tabs .sorter-tabs').bind('click', function(event){
	if ($(event.target).hasClass('active')){
	} else {
	   $('#tabs .sorter-tabs').removeClass('active');
	   $(event.target).addClass('active');
	}	
	//console.log("03");
	event.preventDefault();
	
	if ($(event.target).parent().hasClass('sorter-shows-btn')){
		$('div.options').hide();
		$('#show-tab').show();
	} else {
		$('div.options').hide();
		$('#topics-tab').show();
	}
  });

// -----------------------------------------------------------------------------
// GAMES PAGE - Loads the selected topics
// -----------------------------------------------------------------------------
  $('div.shelf-gamecat, div.shelf-topten').addClass('open');
  $('div.shelf.open').hide().removeClass('open');
  $('div.shelf-gamecat-all').show().addClass('open');
  
  
  $('div.options li').bind('click', function(event){
   var cousinShelf = $(this).children('a').attr('container');
   var shelfSelector = 'div.shelf[name="'+cousinShelf+'"]'
   //console.log(cousinShelf);
  
   $('div.shelf.open').hide().removeClass('open');

  
   $(shelfSelector).show().addClass('open');
   //console.log(shelfSelector);
   
   event.preventDefault();
});
  
// -----------------------------------------------------------------------------
// GAMES PAGE - highlights active topics
// -----------------------------------------------------------------------------
  $('.game-groups').bind('click', function(event){	  
	var e;
	
    if($(event.target).get(0).tagName.toLowerCase() == 'em' || 
	$(event.target).get(0).tagName.toLowerCase() == 'img'){ 
	e = $(event.target.parentNode)
	} 
	else{ e = $(event.target)}

	if ( e.hasClass('active')){
	} else {
	   $('.game-groups').removeClass('active');
	   e.addClass('active');
	}	
	//console.log("04");
	event.preventDefault();
  });
  
// -----------------------------------------------------------------------------
// GAMES PAGE - XXXL graphic slider and top-ten vertical slider
// -----------------------------------------------------------------------------
  $('#slider-feature div').show();
  $('#slider-feature').bxSlider({
    		auto: true,
    		pager: true,
			pause: 6000
  });
			
  $('#top-ten-slider').bxSlider({
    		mode: 'vertical',
			infiniteLoop: false
  });
  

});