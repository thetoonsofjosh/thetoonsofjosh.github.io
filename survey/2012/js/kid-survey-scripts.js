jQuery(document).ready(function($) {




	if (!FlashDetect.installed) {
		// No Flash! Well, let's move on with this...
		$(".kidSurvey-loading").fadeOut("fast");
	} else {
		// Flash is installed. We can safely instantiate SoundManger...
		soundManager.url = 'js/swf/';
		soundManager.flashVersion = 9; // optional: shiny features (default = 8)
		soundManager.useFlashBlock = false; // optionally, enable when you're ready to dive in
		soundManager.useHTML5Audio = true;
		soundManager.onready(function() {
			//First screen load
			if(typeof parent.GA_obj != 'undefined'){ parent.GA_obj.trackPageview('/survey/2012/gender/'); }
	  		// SoundManager is ready to use.
		});
		soundManager.onload = function() {
			// Define clips
			var clipSurveyIntro = soundManager.createSound({
				id: 'soundA',
				url: 'audio/01-help-make-pbs-better.mp3'
			});
			var clipSurveyAge = soundManager.createSound({
				id: 'soundB',
				url: 'audio/02-how-old-are-you.mp3'
			});
			var clipSurveyThanks = soundManager.createSound({
				id: 'soundC',
				url: 'audio/03-thank-you.mp3'
			});
			// Begin		
			clipSurveyIntro.load({
				volume:100,
				onfinish:startSurvey()
			});		
			// Clip 1: On modal introduction
				function startSurvey() {
					$(".kidSurvey-loading").fadeOut("fast");
					soundManager.stopAll();
					clipSurveyIntro.play();
				}
			// Clip #2: How old are you
				$(".surveyGenderOptions strong").click(function(){
					soundManager.stopAll();
					clipSurveyAge.play();
				});
			// Clip #3: Thanks
				$(".panel-age strong").click(function(){
					soundManager.stopAll();
					clipSurveyThanks.play();
				});
		} // ...end soundManager.onload
	} // ...end Flash detection. Onward with basic functionality...





	

	// ---------------------------------------------------------------------------------
	// NON-SOUNDMANAGER, NON-FLASH-DEPENDENT, GLOBAL, BASIC FUNCTIONALITY FOLLOWS....
	// ---------------------------------------------------------------------------------


	// JUST FOR LOCAL DEV
	$(".closeBtn").click(function(){
		parent.PBS.KIDS_SURVEY.$.fancybox.close();
	});
	$(".allDone").click(function(){
		parent.PBS.KIDS_SURVEY.$.fancybox.close();	
	});


	// The "What Is This?" explanatory screen
	if($(".whatIsThis span").length != 0) {
		// Instantiate the screen
		$(".whatIsThis span").each(function(){
			$(this).click(function(){
				$(".panel-info").animate({ top: 0 }, 500);
			});
		});
		// Retract the screen
		$(".panel-info .closeInfo").click(function(){
			$(".panel-info").animate({ top: -300 }, 350);
		});

	}

	// Restrict text input to only allow numbers (requires "Numeric" plugin)
	if($("#enterOtherAge").length != 0) {
		$("#enterOtherAge").numeric();
	}


	// Answered-question storage variables
	var surveyAnswerGender;
	var surveyAnswerAge;


	// Panel-advancement events
	// GENDER
	if($(".surveyGenderOptions").length != 0) {
		$(".surveyGenderOptions li").each(function(){
			$(this).click(function(){
				var pickedGender = $(this).attr("class");
				if(pickedGender == "surveyGender-boy") { surveyAnswerGender = "boy" }
				if(pickedGender == "surveyGender-girl") { surveyAnswerGender = "girl" }
				if(typeof parent.GA_obj != 'undefined'){
 							parent.GA_obj.trackPageview('/survey/2012/age/?gender=' + surveyAnswerGender + '&path=' + parent.location.pathname);
	 			}
				$(".panel-intro").animate({ left: -510 }, 350);
			});
		});
	}

	// AGE
	if($(".surveyAgeOptions").length != 0) {

		$("#enterOtherAge").keypress(function() {
			if($(".surveyAge-custom strong").is(":visible")){
				// do nothing
			} else {
				$(".surveyAge-custom").animate({
					left: 222
				}, 450, function(){
					// animation done
				});
				$(".surveyAge-custom strong").fadeIn("slow");				
			}			
		});

		// If they picked one of the preset ages
		$(".surveyAgeOptions strong").each(function(){
			$(this).click(function(){
				surveyAnswerAge = $(this).text();
				advanceToEpilogue();
			});
		});

		// If they tried a custom age
		$(".surveyAge-custom strong").click(function(){
			var customAge = $("#enterOtherAge").val();
			if(customAge == "" || customAge == 0) {
				alert("Whoops! You either need to pick an age from 3 through 9, or type in a custom age.");
			} else {
				surveyAnswerAge = $("#enterOtherAge").val();
				$("#enterOtherAge").val("")
				advanceToEpilogue();
			}
		});

		// Wrapping up
		function advanceToEpilogue() {

			//Send Survey data to GA
			var result = 'gender=' + surveyAnswerGender + '&age=' + surveyAnswerAge + '&path=' + parent.location.pathname;

			if(typeof parent.GA_obj != 'undefined'){
 							parent.GA_obj.trackPageview('/survey/2012/complete/?' + result);
 						}

			$(".panel-age").animate({ left: -510 }, 350, function(){
				// animation done.
			})
		}
	}

});
