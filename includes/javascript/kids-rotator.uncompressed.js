/*
 * KIDS Rotator Script
 * http://pbskids.org/
 *
 * Created by Nate Eagle
 *
 * This is the current, uncompressed version of this file. This should be used for any modifications, then minified and placed in
 * kids-rotator.min.js to be used as the production copy.
 *
 * Date: 2009-11-04 (Wed, 04 Nov 2009)
 * Revision: 1
 *
 * Modification log:
 * 
 * NAME				MODIFICATION
 * -------------------------------------------------------------
 */

// Set speed of auto-advance
var advanceDelay = 10000;

// Go to the next .content item
function goNext(rotate, transition) {
	// Test if it's at the end of the list
	if ( jQuery('#kids-rotator-content .content.active').next().length > 0 ) {
		if ( transition == true ) {
			jQuery('#kids-rotator-content .content.active').fadeOut('slow');
			jQuery('#kids-rotator-content .content.active').next().fadeIn('slow');
		}
		else {
			jQuery('#kids-rotator-content .content.active').hide();
			jQuery('#kids-rotator-content .content.active').next().show();
		}
		jQuery('#kids-rotator-content .content.active').removeClass('active').next().addClass('active');
	}
	// If it doesn't, go to first item in the list
	else {
		if ( transition == true ) {
			jQuery('#kids-rotator-content .content.active').fadeOut('slow');
			jQuery('#kids-rotator-content .content.active').parent().children(':first-child').fadeIn('slow');
		}
		else {
			jQuery('#kids-rotator-content .content.active').hide();
			jQuery('#kids-rotator-content .content.active').parent().children(':first-child').show();
		}
		jQuery('#kids-rotator-content .content.active').removeClass('active').parent().children(':first-child').addClass('active');
	}
	// Test to see whether it's been sent by a timer or a click
	if ( rotate == true ) {
		// If by a timer, keep it going
		clearTimeout(rotator);
		rotator = setTimeout ('goNext(true, true)', advanceDelay);
	}
	else {
		// If by a click, stop automatic advance
		clearTimeout(rotator);
	}
}

// Go to the previous .content item
function goBack(rotate, transition) {
	if ( jQuery('#kids-rotator-content .content.active').prev().length > 0) {
		if ( transition == true ) {
			jQuery('#kids-rotator-content .content.active').fadeOut('slow');
			jQuery('#kids-rotator-content .content.active').prev().fadeIn('slow');
		}
		else {
			jQuery('#kids-rotator-content .content.active').hide();
			jQuery('#kids-rotator-content .content.active').prev().show();
		}
		jQuery('#kids-rotator-content .content.active').removeClass('active').prev().addClass('active');
	}
	else {
		if ( transition == true ) {
			jQuery('#kids-rotator-content .content.active').fadeOut('slow');
			jQuery('#kids-rotator-content .content.active').parent().children(':last-child').fadeIn('slow');
		}
		else {
			jQuery('#kids-rotator-content .content.active').hide();
			jQuery('#kids-rotator-content .content.active').parent().children(':last-child').show();
		}
		jQuery('#kids-rotator-content .content.active').parent().children(':last-child').removeClass('active').parent().children(':last-child').addClass('active');
	}
	clearTimeout(rotator);
	rotator = setTimeout ('goNext(true, true)', advanceDelay);
}

jQuery(window).load(function(){
	jQuery('#footer').show();
});

jQuery(document).ready(function() {
	
	/* jQuery('#kids-rotator-content .content').each(function () {
		jQuery(this).show();
		jQuery(this).hide();
	}); */
	
	// Randomly select one of the first two items to display
	var randomNumber = (Math.floor(Math.random()*2) + 1);
	// Display one of the first two items and assign it the class of 'active'
	jQuery('#kids-rotator-content .content:nth-child(' + randomNumber + ')').show().addClass('active');
	
	
	// If the second one is pulled up, remove the first one and place it after the second so that it is viewed immediately after the first one
	if (randomNumber == 2) {
		jQuery('#kids-rotator-content .content:nth-child(1)').clone().insertAfter('#kids-rotator-content .content:nth-child(2)');
		jQuery('#kids-rotator-content .content:nth-child(1)').remove();
	}
	
	// Start up the auto-advance
	rotator = setTimeout ('goNext(true, true)', advanceDelay);
	
	// Create click function for Next button
	jQuery('#nav-next').click(function() {
		// For now, at least, we want auto-advance to continue.  Just remove 'true' to take this away.
		goNext(false, false);
		return false;
	});
	
	// Create click function for Back button
	jQuery('#nav-back').click(function() {
		goBack(false, false);
		return false;
	});
	
	// On mouseover, pause auto-advance
	jQuery('#kids-rotator').mouseover(function() {
		// console.log('pause');
		clearTimeout(rotator);
	});
	// On mouseout, resume auto-advance
	jQuery('#kids-rotator').mouseout(function() {
		// console.log('restart');
		rotator = setTimeout ('goNext(true, true)', (advanceDelay/2));
	});
});