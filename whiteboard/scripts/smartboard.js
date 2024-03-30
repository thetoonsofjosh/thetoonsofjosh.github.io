$(document).ready(function() {
	// $("tr:nth-child(odd)").addClass("odd");

	$('#content table').tablesorter({
		headers: {
			0: {
				sorter: false
			}
		},
		widgets: ['zebra']});
	
	// Scrolling jump links -- code for same-page link detection from 
	// http://www.learningjquery.com/2007/09/animated-scrolling-with-jquery-12
	
	$('a[href*=#]').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var $target = $(this.hash);
			$target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');
			if ($target.length) {
				$($target).scrollTo();
				/*
				var targetOffset = $target.offset().top;
				$('html,body').animate({scrollTop: targetOffset}, 1000);
				*/
				return false;
			}
		}
	});
});

// Create scrollTo Function
$.fn.extend({
	scrollTo: function() {
		var currentPosition = $(window).scrollTop();
		var scrollTargetOffset = this.offset().top;
		// var scrollDuration = Math.abs(scrollTargetOffset - currentPosition);			
        var scrollDuration = 1000;
		$('html, body').animate({
			scrollTop : scrollTargetOffset
		}, scrollDuration);
	}
});
