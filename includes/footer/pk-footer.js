jQuery(document).ready(function($) {

function isTouchDevice(){
  return (typeof(window.ontouchstart) != 'undefined') ? true : false;
}

if (isTouchDevice()){
	$('body').addClass('has-touch'); 
}

/*

	// Update the text inside MOBILE APPS's tooltip rollover.

	$.getJSON("/mobile/feeds/apps/1.1/apps.json", function(json) {
		var desiredAppTitle = json[0].appTitle;		
		var desiredAppIcon = json[0].icon;
		$(".pk-footer .jumps .mobile .flip-feature").text("NEW: " + desiredAppTitle);
		$(".pk-footer .jumps .mobile .flip-image").attr("src", desiredAppIcon);
	 });

	

	// Tooltip rollover: SHOP
	$(".pk-footer .jumps .shop").mouseover(function(){
		$(".pk-footer .jumps").addClass("jumps-pop-shop");
	}).mouseout(function(){
		$(".pk-footer .jumps").removeClass("jumps-pop-shop");
	});

	
	// Tooltip rollover: JUMP LINK
	$(".pk-footer .jumps li").each(function(){

		var myPopClass;

		$(this).mouseover(function(){

			myPopClass = "jumps-pop-" + $(this).attr("class");
			$(".pk-footer .jumps").addClass(myPopClass);

		}).mouseout(function(){
			
			$(".pk-footer .jumps").removeClass(myPopClass);
			
		});

	});

	
	
	// Switch out the default "Appetizer" HREF (if we're on the Games page)
	if($("body").hasClass("pk-landing-games")) {
		if($(".pk-footer .appetizer a").length != 0) {
			$(".pk-footer .appetizer a").attr("href","/video");
		}
	} 


	
	// Inspect the Mobile variable, and, based on its value, update the "Take Me Back To Mobile View" HREF.
	

	var desiredMobileShell = PBS.KIDS.mobile_base;
	//alert("The intended destination is: " + desiredMobileShell);
	$("#returnToMobile").attr("href",desiredMobileShell);


*/




});