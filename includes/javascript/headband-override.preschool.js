$('body').live('headband-ready', function(){
 $('button.brand-action-toggle').bind('mousedown', function(event) {
    if ($('#site-exlpore-menu').hasClass('closed')){ 
      var updatedPlayerHeight = $("#flashcontent").height()-70;
      $("#flashcontent").height(updatedPlayerHeight);
      $(".flash-replaced embed").height(updatedPlayerHeight);
    } else {
      setTimeout(function(){
        var updatedPlayerHeight = $("#flashcontent").height()+70; 
        $("#flashcontent").height(updatedPlayerHeight);
        $(".flash-replaced embed").height(updatedPlayerHeight); 
      },500);  
    }
 });
 
 $('button#explorer-close').bind('mousedown', function(event) {
  setTimeout(function(){
    var updatedPlayerHeight = $("#flashcontent").height()+70; 
    $("#flashcontent").height(updatedPlayerHeight);
    $(".flash-replaced embed").height(updatedPlayerHeight); 
  },500);  
 });
 
 var outsideResize = function(event) {
   if ($('body').hasClass('headband-open')){ 
     setTimeout(function(){
      if ($('#cboxOverlay').is(':visible')) { 
	   console.log('do nothing');   
      } else {
        var updatedPlayerHeight = $("#flashcontent").height()+70; 
        $("#flashcontent").height(updatedPlayerHeight);
        $(".flash-replaced embed").height(updatedPlayerHeight);    
      }     
     },500);
   }                
 }
 $('div.pk-footer').bind('click', outsideResize);
 
});

function flashCloseHeadband() {
   if ($('#site-exlpore-menu').hasClass('open')){ 
     $('#site-exlpore-menu').find('#explorer-close').fadeOut(100); 
     $('#site-exlpore-menu ul.handpicked-shows').fadeOut(800); 
	 $('#site-exlpore-menu').slideUp().removeClass('open').addClass('closed').addClass('pk-resize');
	 $('button.brand-action-toggle').removeClass('active');
	 $('#mobile-sub-nav').removeClass('pk-resize');
	 setTimeout(function(){
        var updatedPlayerHeight = $("#flashcontent").height()+70; 
        $("#flashcontent").height(updatedPlayerHeight);
        $(".flash-replaced embed").height(updatedPlayerHeight); 
      },500); 
   }
   if ($('#mobile-sub-nav.active').hasClass('open')){ 
     $('#headband-grownups-block ul li.button').fadeOut(100);
     $('#mobile-sub-nav').slideUp().removeClass('open').addClass('closed').addClass('pk-resize'); 
     $('#headband-grownups-block ul li.label').removeClass('active');
	 $('#site-exlpore-menu').removeClass('pk-resize');
	 setTimeout(function(){
        var updatedPlayerHeight = $("#flashcontent").height()+70; 
        $("#flashcontent").height(updatedPlayerHeight);
        $(".flash-replaced embed").height(updatedPlayerHeight); 
      },500); 
   }
   $('body').removeClass('headband-open');      
 }

