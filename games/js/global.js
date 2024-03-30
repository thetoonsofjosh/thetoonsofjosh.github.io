(function(b){var o=!1,d=null,u=parseFloat,j=String.fromCharCode,q=Math.min,l=/(-?\d+\.?\d*)$/g,g,a=[],h,m,t=9472,f={},c;if(!Array.indexOf){Array.prototype.indexOf=function(w){for(var v=0,s=this.length;v<s;v++){if(this[v]==w){return v}}return -1}}for(var p=32,k=j(p),r=255;p<r;p++,k=j(p).toLowerCase()){if(a.indexOf(k)!==-1){a.push(k)}}a.sort();b.tinysort={id:"TinySort",version:"1.3.27",copyright:"Copyright (c) 2008-2012 Ron Valstar",uri:"http://tinysort.sjeiti.com/",licenced:{MIT:"http://www.opensource.org/licenses/mit-license.php",GPL:"http://www.gnu.org/licenses/gpl.html"},defaults:{order:"asc",attr:d,data:d,useVal:o,place:"start",returns:o,cases:o,forceStrings:o,sortFunction:d,charOrder:g}};b.fn.extend({tinysort:function(V,L){if(V&&typeof(V)!="string"){L=V;V=d}var T=b.extend({},b.tinysort.defaults,L),v,Q=this,z=b(this).length,ae={},W=!(!V||V==""),H=!(T.attr===d||T.attr==""),ah=T.data!==d,J=W&&V[0]==":",C=J?Q.filter(V):Q,F=T.sortFunction,s=T.order=="asc"?1:-1,P=[];if(T.charOrder!=g){g=T.charOrder;if(!T.charOrder){m=false;t=9472;f={};c=h=d}else{h=a.slice(0);m=false;for(var S=[],B=function(i,ai){S.push(ai);f[T.cases?i:i.toLowerCase()]=ai},N="",X="z",aa=g.length,ac,Z,ad=0;ad<aa;ad++){var x=g[ad],ab=x.charCodeAt(),I=ab>96&&ab<123;if(!I){if(x=="["){var D=S.length,M=D?S[D-1]:X,w=g.substr(ad+1).match(/[^\]]*/)[0],R=w.match(/{[^}]*}/g);if(R){for(ac=0,Z=R.length;ac<Z;ac++){var O=R[ac];ad+=O.length;w=w.replace(O,"");B(O.replace(/[{}]/g,""),M);m=true}}for(ac=0,Z=w.length;ac<Z;ac++){B(M,w[ac])}ad+=w.length+1}else{if(x=="{"){var G=g.substr(ad+1).match(/[^}]*/)[0];B(G,j(t++));ad+=G.length+1;m=true}else{S.push(x)}}}if(S.length&&(I||ad===aa-1)){var E=S.join("");N+=E;b.each(E,function(i,ai){h.splice(h.indexOf(ai),1)});var A=S.slice(0);A.splice(0,0,h.indexOf(X)+1,0);Array.prototype.splice.apply(h,A);S.length=0}if(ad+1===aa){c=new RegExp("["+N+"]","gi")}else{if(I){X=x}}}}}if(!F){F=T.order=="rand"?function(){return Math.random()<0.5?1:-1}:function(av,at){var au=o,am=!T.cases?n(av.s):av.s,ak=!T.cases?n(at.s):at.s;if(!T.forceStrings){var aj=am&&am.match(l),aw=ak&&ak.match(l);if(aj&&aw){var ar=am.substr(0,am.length-aj[0].length),aq=ak.substr(0,ak.length-aw[0].length);if(ar==aq){au=!o;am=u(aj[0]);ak=u(aw[0])}}}var ai=s*(am<ak?-1:(am>ak?1:0));if(!au&&T.charOrder){if(m){for(var ax in f){var al=f[ax];am=am.replace(ax,al);ak=ak.replace(ax,al)}}if(am.match(c)!==d||ak.match(c)!==d){for(var ap=0,ao=q(am.length,ak.length);ap<ao;ap++){var an=h.indexOf(am[ap]),i=h.indexOf(ak[ap]);if(ai=s*(an<i?-1:(an>i?1:0))){break}}}}return ai}}Q.each(function(ak,al){var am=b(al),ai=W?(J?C.filter(al):am.find(V)):am,an=ah?""+ai.data(T.data):(H?ai.attr(T.attr):(T.useVal?ai.val():ai.text())),aj=am.parent();if(!ae[aj]){ae[aj]={s:[],n:[]}}if(ai.length>0){ae[aj].s.push({s:an,e:am,n:ak})}else{ae[aj].n.push({e:am,n:ak})}});for(v in ae){ae[v].s.sort(F)}for(v in ae){var ag=ae[v],K=[],Y=z,af=[0,0],ad;switch(T.place){case"first":b.each(ag.s,function(ai,aj){Y=q(Y,aj.n)});break;case"org":b.each(ag.s,function(ai,aj){K.push(aj.n)});break;case"end":Y=ag.n.length;break;default:Y=0}for(ad=0;ad<z;ad++){var y=e(K,ad)?!o:ad>=Y&&ad<Y+ag.s.length,U=(y?ag.s:ag.n)[af[y?0:1]].e;U.parent().append(U);if(y||!T.returns){P.push(U.get(0))}af[y?0:1]++}}Q.length=0;Array.prototype.push.apply(Q,P);return Q}});function n(i){return i&&i.toLowerCase?i.toLowerCase():i}function e(v,x){for(var w=0,s=v.length;w<s;w++){if(v[w]==x){return !o}}return o}b.fn.TinySort=b.fn.Tinysort=b.fn.tsort=b.fn.tinysort})(jQuery);




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
		// Two:
		if($(".grid-2").length != 0) {
			$(".grid-2").each(function(){
				$(this).find("li").each(function(){
					myPos = $(this).index() + 1;
					$(this).addClass("two-" + myPos);
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
	$(".slotmachine .slots").css({ "height" : "auto", "bottom": "-9px", "top": "auto"}); //should move into page CSS. 
	
	// Reverses the DOM elements - used in slotmachine
    (function($) {
        $.fn.reverseOrder = function() {
	      return this.each(function() {
		    $(this).prependTo( $(this).parent() );
	      });
        };
    })(jQuery);
	
	if($(".slotmachine").length != 0) {
	
		// Prepeare the lever
		$(".slotmachine").append("<h3 id=\"lever\" />");
		$("#lever").append("<em>Spotlighted </em>").append("<span>Games</span>");


		// Re-sort the ULs (1-2-3 becomes 3-2-1)
		$('.slots ul').reverseOrder();
		
		// Currently visable row gets class "current"
		$(".slots ul:last").addClass("current");


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
					bottom: '-=59'
				}, 630, function() { // Callback (re-orient everything).
					$(".slots ul.current").removeClass("current").addClass("former"); 
					
					$(".slots ul.former").prev().addClass("current");
					$(".slots ul.former").clone().removeClass("former").prependTo(".slots");
					$(".slots ul.former").remove();
					
					$("#invisiSlots ul").remove(); // Dump the old links.
					$(".slots ul.current").clone().appendTo("#invisiSlots"); // Replace 'em with the new links.
					
					$(this).css("bottom","-9px");
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
	
	// Adding sticky header scroll detection
	$(document).bind('scroll', function() {
	  var pagePosition = $(document).scrollTop();
	  var headbandHeight = $('#headband-container').height();
	
	  if (pagePosition > headbandHeight){
	    $('header.ledge').addClass('sticky');
	  }
	  if (pagePosition < headbandHeight){
	     $('header.ledge').removeClass('sticky');
	  }	 
	});



});