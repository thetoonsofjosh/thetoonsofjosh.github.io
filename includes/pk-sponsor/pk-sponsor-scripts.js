jQuery(document).ready(function($) {



	/*
	==================================================
	CANONICAL (POPULATED) MARKUP SAMPLE
	All you have by default is the outermost DIV.
	==================================================
	<div id="pk-sponsor">
		<span>
			<a href="#">
				<em>Sponsored by:</em>
				<img src="..." alt="" class="logo" />
				<img src="..." alt="" class="tracking" />
				<strong>&nbsp;</strong>
			</a>
		</span>
		<div id="bridge-data">
			<span id="value-bridgeHeadlineText"></span>
			<span id="value-bridgeHeadlineColor"></span>
			<span id="value-bridgeBodyText"></span>
			<span id="value-bridgeFeatureImage"></span>
			<span id="value-bridgeFeatureAlt"></span>
			<span id="value-bridgeJumpBaseColor"></span>
			<span id="value-bridgeJumpTextColor"></span>
			<span id="value-trackingPixel"></span>
		</div>
	</div>
	==================================================
	*/




	//======================
	// Set up all the variables.
	//----------------------
	var tabImage;
	var sponsorUrl;
	//var tabOpacity;
	var tabTextColor;
	//----------------------
	var bridgeHeadlineText;
	var bridgeHeadlineColor;
	var bridgeBodyText;
	var bridgeFeatureImage;
	var bridgeFeatureAlt;
	var bridgeJumpBaseColor;
	var bridgeJumpTextColor;
	var trackingPixelA;
	var trackingPixelB;
	//----------------------



	//======================	
	// Assign real values.
	//----------------------
	function assignValues() {
		tabSponsor				= PBS.KIDS.campaign.sponsor;
		tabImage				= PBS.KIDS.campaign.small_logo_url;
		sponsorUrl				= PBS.KIDS.campaign.url;
		//tabOpacity				= PBS.KIDS.campaign.tab_opacity; ...Deprecated. Using fixed (45%) PNG-innate opacity now.
		tabTextColor			= PBS.KIDS.campaign.tab_text_color;
		//----------------------
		bridgeHeadlineText		= PBS.KIDS.campaign.bridge_page_headline_text;
		bridgeHeadlineColor		= PBS.KIDS.campaign.bridge_page_headline_text_color;
		bridgeBodyText			= PBS.KIDS.campaign.bridge_page_body_text;
		bridgeFeatureImage		= PBS.KIDS.campaign.bridge_page_image_url;
		bridgeFeatureAlt		= PBS.KIDS.campaign.bridge_page_image_alt_text;
		bridgeJumpBaseColor		= PBS.KIDS.campaign.jump_button_color;
		bridgeJumpTextColor		= PBS.KIDS.campaign.jump_button_text_color;
		//----------------------
		var ebRand = Math.random()+'';
	    	ebRand = Math.floor(ebRand * 100000000);
		trackingPixelA			= PBS.KIDS.campaign.pageview_tracking_pixel.replace("{{token}}", ebRand);
		trackingPixelB			= PBS.KIDS.campaign.bridge_tracking_pixel.replace("{{token}}", ebRand);
		//----------------------
	}




	//======================
	// The generic function to actually populate the thing.
	//----------------------
	function populateSponsorTab() {
		$("#pk-sponsor").append("<span />").append("<div id=\"bridge-data\">");
		$("#pk-sponsor span").append("<a class=\"pk-sponsor-link\" />");
		$("#pk-sponsor a")
			.append("<em>Sponsored by:</em>")
			.append("<img src=\"\" alt=\"\" class=\"logo\" />")
			.append("<img src=\"\" alt=\"\" class=\"tracking\" />")
			.append("<strong>&nbsp;</strong>");
		$("#pk-sponsor a").attr("title",tabSponsor).attr("href",sponsorUrl);
		$("#pk-sponsor em").css("color",tabTextColor);
		$("#pk-sponsor .logo").attr("src",tabImage);
		$("#pk-sponsor .tracking").attr("src",trackingPixelA);

		//$("#pk-sponsor strong").fadeTo(0,tabOpacity);


		//----------
		$("#bridge-data")
			.append("<div id=\"value-bridgeHeadlineText\">")
			.append("<div id=\"value-bridgeHeadlineColor\">")
			.append("<div id=\"value-bridgeBodyText\">")
			.append("<div id=\"value-bridgeFeatureImage\">")
			.append("<div id=\"value-bridgeFeatureAlt\">")
			.append("<div id=\"value-bridgeJumpBaseColor\">")
			.append("<div id=\"value-bridgeJumpTextColor\">")
			.append("<div id=\"value-trackingPixelB\">");
		//----------
		$("#value-bridgeHeadlineText").append(bridgeHeadlineText);
		$("#value-bridgeHeadlineColor").append(bridgeHeadlineColor);
		$("#value-bridgeBodyText").append(bridgeBodyText);
		$("#value-bridgeFeatureImage").append(bridgeFeatureImage);
		$("#value-bridgeFeatureAlt").append(bridgeFeatureAlt);
		$("#value-bridgeJumpBaseColor").append(bridgeJumpBaseColor);
		$("#value-bridgeJumpTextColor").append(bridgeJumpTextColor);
		$("#value-trackingPixelB").append(trackingPixelB);
		//----------
	}


	
	//======================
	// Page-specific, stylistic fiddling.
	function stylisticTweaks() {

		// Tweak #1: Webonauts
		if($("body").hasClass("pk-webonauts-landing")) {
			$("#header #nav")
				.css("float","left")
				.css("width","465px");
		}
		// Tweak #2: PreK Games
		if($("body").hasClass("pk-landing-games")) {
			$(".topicPicker").removeClass("topicPicker-lonely");
		}
		// Tweak #3: GO! Games
		if($("body").hasClass("pk-go-games")) {
			if ($("#containerstation").children().length > 0) {
				$("body").addClass("pk-go-games-isLocalized");
			}
		}

	
	}





	//======================
	// ONLY IF WE'RE SURE that we won the Sponsorship Roulette,
	// AND we're sure that the container element exists,
	// THEN go ahead...

	if($("#pk-sponsor").length != 0) {
		if(!$.isEmptyObject(PBS.KIDS.campaign)) {

			stylisticTweaks();
			assignValues();
			populateSponsorTab();

		}
	}








});