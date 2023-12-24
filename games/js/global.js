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

jQuery(document).ready(function($) {



	// JavaScript is turned on
	$("body").addClass("hasJs");	



	// Games Grid (topic pages)
	if($(".gamesList").length != 0) {
		$(".gamesList li:nth-child(4n)").each(function(){
			$(this).addClass("fourth");
		});
	}
	if($(".topicsList").length != 0) {
		$(".topicsList li:nth-child(5n)").each(function(){
			$(this).addClass("fifth");
		});
	}


	// If we DON'T have a Partnership promo, then .topicPicker should slide over.
	if($(".topicPicker").length != 0) {
		if($(".partnership").length == 0) {
			$(".topicPicker").addClass("topicPicker-lonely");
		}
	}


	// "Games By Educational Topic" Picker
	if($(".topicPicker").length != 0) {
		$(".topicPicker ul").hide();
		$(".topicPicker li:last-child").addClass("last");
		$(".topicPicker h5").mouseover(function() {
  			$(this).addClass("active");
 		}).mouseout(function(){ $(this).removeClass("active");
		}).mousedown(function(){ $(this).addClass("pressed");
		}).mouseup(function(){ $(this).removeClass("pressed");
		});
		$(".topicPicker h5").mousedown(function(){
			if(!$(".topicPicker").hasClass("opened")) {
				$(this).next().slideDown("fast");				
				$(this).parent().addClass("opened");
			} else {
				$(this).next().slideUp("fast");
				$(this).parent().removeClass("opened");
			}
		});
		$(".topicPicker ul a").each(function(){
			$(this).click(function(){
				$(".topicPicker ul").hide();
				$(".topicPicker").removeClass("opened");				
			});
		});
	}


	// Grid of Topic Icons
	if($(".gamesByTopic").length != 0) {

		// Basic mouse controls
		$(".gamesByTopic li a").each(function(){
			$(this).mouseover(function(){
				if($(this).parent().hasClass("alltopics")) {
					$(this).parent().addClass("alltopics-hovered");
				} else {
					$(this).parent().addClass("hovered");
				}
			}).mouseout(function(){
				if($(this).parent().hasClass("alltopics")) {
					$(this).parent().removeClass("alltopics-hovered");
				} else {
					$(this).parent().removeClass("hovered");
				}
			});
		});

		// Give special kerning treatment to overlong game titles (e.g., "Super Why's Reading Power Bingo")
		$(".gamesList li mark").each(function(){
			var titleStringLength = $(this).text().length;
			var maximumChars = 28; /* this can be subjectively tweaked over time */
			if (titleStringLength >= maximumChars) {
				$(this).addClass("verbose");
			}
		});

	}


	// Minor ephemeral additions
	if($(".popular ul").length != 0) {
		$(".popular li a").each(function(){
			$(this).wrapInner("<span>");
		});
	}
	if($(".panels").length != 0) {
		$(".panels").wrap("<div class=\"panelsViewport\">");
	}
	if($("footer section .legal").length != 0) {
		$("footer .legal li:last").addClass("last");
	}
	if($("footer nav ul").length != 0) {
		var howManyJumps = $("footer nav ul li").length;
		$("footer nav ul").addClass("footerPromos-" + howManyJumps);
	}








	// Billboard
	if($(".billboard").length != 0) {

		// Game Info
		if($(".gameInfo").length != 0) {
				$(".gameInfo").append("<em />").append("<span />");
				$(".billboard .panels a").each(function(){
					$(this).mouseover(function(){
						var curShow = $(this).find("img").attr("alt");
						var curGame = $(this).find("span").text();
						var curTopics = $(this).attr("data-topics");
						if(!curShow == "") {
							$(".gameInfo em").html(curShow + ": " + curGame);
							$(".gameInfo span").html("TOPICS: " + curTopics);
							$(".gameInfo").show();
						}
					}).mouseout(function(){
						$(".gameInfo").hide();
					});
				});
		}
	
		// Prevent the Up & Down buttons from actually following-through with their HREFs
		$(".billboard aside a").each(function(){
			$(this).click(function(){
				return false;
			});
		});

		// Tell each Panel how many children it has
		$(".panels ul").each(function(){
			var myShows = $(this).find("li").length;
			$(this).addClass("grid-" + myShows);
		});


		// Rearrange the sort order so that #1 is actually 2nd in the sequence
		$(".panels ul:eq(2)").prependTo(".panels");


		// Make sure everyone can fit
		// Six:
		if($(".grid-6").length != 0) {
			$(".grid-6").each(function(){
				$(this).find("li:nth-child(3),li:nth-child(6)").addClass("exempt");
			});
		}
		// Five:
		if($(".grid-5").length != 0) {
			$(".grid-5").each(function(){
				$(this).find("li").each(function(){
					myPos = $(this).index() + 1;
					$(this).addClass("fiver-" + myPos);
				});
			});
		}


		// Functionality
		$(".billboard aside a").mousedown(function(){
			if($(this).parent("span").hasClass("up")) {
				$(this).parent("span").addClass("up-click");
			} else {
				$(this).parent("span").addClass("down-click");
			}
		}).mouseup(function(){
			if($(this).parent("span").hasClass("up")) {
				$(this).parent("span").removeClass("up-click");
			} else {
				$(this).parent("span").removeClass("down-click");
			}
		});


		$(".billboard aside a").click(function(){

			if(!$(".panels").hasClass("locked")) {

					if($(this).parent().hasClass("up")) {		// UP!
						$(".billboard .panels").addClass("locked").animate({
							top: '-=330'
						}, 500, function() {					// Silently reposition us, then grab the FIRST panel and shove it UNDERNEATH the stack, then unlock.
							$(".panels").css("top","-311px");
							$(".panels ul:first").appendTo(".panels");
							$(".panels").removeClass("locked");
							// Animation complete.
						});
					} else {									// DOWN!
						$(".billboard .panels").addClass("locked").animate({
							top: '+=330'
						}, 500, function() {					// Silently reposition us, then grab the LAST panel and throw it on TOP of the stack, then unlock.
							$(".panels").css("top","-311px");
							$(".panels ul:last").prependTo(".panels");
							$(".panels").removeClass("locked");
							// Animation complete.
						});
					}
			
			} // end check for are-we-or-are-we-not locked
		});

	} // end billboard existence check






	// Slot Machine
	if($(".slotmachine").length != 0) {

		// Prepeare the lever
		$(".slotmachine").append("<h3 id=\"lever\" />");
		$("#lever").append("<em>Spotlighted </em>").append("<span>Games</span>");


		// Re-sort the ULs (1-2-3 becomes 3-2-1)
		$(".slots ul:eq(1)").prependTo(".slots");
		$(".slots ul:eq(2)").prependTo(".slots");
		


		// Tweak the markup
		$("<div id=\"invisiSlots\" />").insertAfter(".slotmachine h1");
		$(".slots ul:last").clone().appendTo("#invisiSlots");
		$(".slots ul,#invisiSlots ul").each(function(){
			$(this).find("li:last").addClass("last");
		});

		// Stylish embiggening
		$("#lever").mouseover(function(){
			if(!$(this).hasClass("locked")) {
				$(this).find("em").addClass("hovered");				
			}
		}).mouseout(function(){
			if(!$(this).hasClass("locked")) {
				$(this).find("em").removeClass("hovered");				
			}
		});

		// Functionality
		$("#lever").click(function(){

			if(!$("#lever").hasClass("locked")) { // Only go forward if I'm unlocked...

				$("#lever").addClass("locked");
				$("#lever").find("em").attr("class","");
				$("#lever em").animate({
					top: '31'
				}, 150, function() {
					$("#lever em").animate({ // Callback (ascent stage).
						top: 0
					}, 600, function() {
						$("#lever").removeClass("locked");
						// Ascent stage complete.
					});
					// Whole animation complete.
				});
				$(".slots").animate({
					top: '+=59'
				}, 630, function() { // Callback (re-orient everything).
					$(this).css("top","-116px");
					$(".slots ul:last").prependTo(".slots");
					$("#invisiSlots ul").remove(); // Dump the old links.
					$(".slots ul:last").clone().appendTo("#invisiSlots"); // Replace 'em with the new links.
					// Whole animation complete.
				});


			} // end check for are-we-are-we-not locked
		});
	} // end slot machine





	// Throw me a random wallpaper
	if($(".gamesGrid").length != 0) {
		if($("hgroup h1").text() == "Earth Day Games"){

			// This is a special occasion, like a holiday or Earth Day or something.
			// Element bears its own cosmetic class.
//			alert("I AM EARTH DAY");
			// Feed it a special cosmetic class.

		} else {

			// This is a normal listing page.
			// Randomize its cosmetic theme.
			var randomNum = Math.ceil(Math.random()*7); /* Pick number between 1 and 7 */
			$(".gamesGrid").addClass("gamesGrid-" + randomNum);

		}
   	}



	// "Back to Games" Wooden Board
	if($(".backToGames").length != 0) {
			$(".backToGames").mouseover(function(){
				$(this).animate({top:'0px'},{queue:false,duration:125});
			}).mouseout(function(){
				$(this).animate({top:'-7px'},{queue:false,duration:300});			
			});
	}


	// "All Topics" page: link hover effect
	if($(".topicsList").length != 0) {

		$(".topicsList li a").each(function(){
			$(this).hover(function(){
				$(this).find("span").css("left","4px").css("top","4px").animate({left:'0px',top:'0px'},{queue:false,duration:100});
			}, function(){
				$(this).find("span").animate({left:'4px',top:'4px'},{queue:false,duration:75});
			}).mousedown(function(){
				$(this).find("span").css("left","4px").css("top","4px");
			}).mouseup(function(){
				$(this).find("span").css("left","4px").css("top","4px").animate({left:'0px',top:'0px'},{queue:false,duration:100});
			});
		});

	}



	// "Games by Topic" Pages
	if($(".gamesList").length != 0) {
		
		$(".gamesList em").hide();
		
		// "Game Goals" teaser
		$(".gameGoals").hide();
		if(!$(".gamesList").hasClass("gamesList-standalones")) {
			$(".gamesList li a").each(function(){
				var myGoals = $(this).attr("data-goals");
				$(this).mouseover(function(){
					$(".gameGoals").find("span").text(myGoals);
					$(".gameGoals").show();
				}).mouseout(function(){
					$(".gameGoals").hide();
				});
			});
		}

		// Related Topics: Little bit of ephemeral styling
		if($(".relatedTopics").length != 0) {
			$(".relatedTopics li:first").addClass("first");
		}
		
		// Wobbly popup animation for each game rollover
		$(".gamesList li a").each(function(){

			// First, define it for TOPIC pages
			if(!$(".gamesList").hasClass("gamesList-standalones")) {
				$(this).hover(function(){
					$(this).find("span").css("left","4px").animate({left:'0px'},{queue:false,duration:100}).css("background-position","0px -62px").addClass("lit");
					$(this).find("em").css("top","0").css("left","0").fadeIn(90);
				}, function(){
					$(this).find("span").animate({left:'4px'},{queue:false,duration:50}).css("background-position","0px 0px").removeClass("lit");
					$(this).find("em").css("top","23px").css("left","4px").hide();
				});
			} else {
			// Then, define it for less-common STANDALONE pages (e.g.: coloring, music)
				$(this).hover(function(){
					$(this).find("span").css("left","4px").animate({left:'0px',top:'13px'},{queue:false,duration:50}).addClass("lit");
				}, function(){
					$(this).find("span").animate({left:'4px',top:'17px'},{queue:false,duration:30}).removeClass("lit");
				});
			}

		});
	}



});

}
/*
     FILE ARCHIVED ON 05:20:25 Oct 01, 2011 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 07:12:32 Dec 12, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 73.666
  exclusion.robots: 0.15
  exclusion.robots.policy: 0.134
  cdx.remote: 0.115
  esindex: 0.016
  LoadShardBlock: 38.127 (3)
  PetaboxLoader3.datanode: 40.048 (4)
  load_resource: 38.072
  PetaboxLoader3.resolve: 26.662
*/