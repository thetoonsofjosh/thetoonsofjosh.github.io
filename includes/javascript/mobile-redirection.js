if(window.location.search.match(/frommobile/) || $.cookie('frommobile')){
	$.cookie('frommobile', 1);
	jQuery(document).ready(function($) {
	
		$(".pk-footer").addClass("pk-footer-fromMobile");

		$("#returnToMobile").click(function(){
			//alert($(this).attr("href"));
			$.cookie("frommobile", null);
		});

	});
}



if(!$.cookie('frommobile') && navigator.userAgent.match(/(iPod|iPad|iPhone)/i) ){
      window.location = 'http://m.pbskids.org'+ window.location.pathname;
}

