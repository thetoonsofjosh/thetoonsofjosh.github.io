// Javascript for every Raising Readers page
$(document).ready(function(){
	$("h2:contains('&'), #navigation li a:contains('&')").contents().each(function() {
		if(this.nodeType == 3) {
			$(this).replaceWith(this.nodeValue.replace( /&/g, "<abbr title='and' class='amp'>&</abbr>" ));
		};
	});

});