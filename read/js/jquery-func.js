$(function() {
	$('#slider').jcarousel({
		visible: 1,
		scroll: 1,
		wrap: "circular"
	});
	
	
});

function bounce(element) {
	$(element).animate({
		top: '-10px'
	}, {
		duration: 100,
		complete: function() {
			$(element).animate({
				top: 10
			}, {
				duration: 100,
				complete: function() {
					$(element).animate({
						top: 0
					}, {
						duration: 100
					});
				}
			})
		}
	});
}