// JavaScript Document
$(document).ready(function(){
    var cb_top;
    var player;
    
    getPlayer = function (){ // Get Instance of ProducerPlayer.swf
        var isIE = navigator.appName.indexOf("Microsoft") != -1;   
        return (isIE) ? window["ProducerPlayer"] : document["ProducerPlayer"];  
    }

		loadPlaylist = function (categoryName){
			if(!player) player = getPlayer();
			if(player) if(player.refreshReleaseList) player.refreshReleaseList(categoryName);
		}
    
		$(".video-pop-up")
		.css("cursor","pointer")
		.click(function(){
      if(!player) player = getPlayer();
      if(!player) {
				var initCategory = $('span.category-button.selected').attr("data-category-name");
				if(!initCategory){
					initCategory = $('span.category-button:eq(0)').attr("data-category-name");
					$('span.category-button:eq(0)').addClass("selected");
				}
				var el = $('div.container');
				$(el).css("display","block");
				$.colorbox.settings.speed = 0;
        $.colorbox({
          html:$('.container'),
          onComplete:function(){
            var configObj = {};
						configObj.category = initCategory;
           	configObj.controlLayoutURL = "http://pbskids.org/producerplayer/data/metaLayout-KidsPreschool.xml";
						configObj.playerSkinURL = "http://www-tc.pbskids.org/producerplayer/swf/skins/skinKidsPreschool.swf";
						configObj.playerColorScheme = "http://pbskids.org/producerplayer/colorschemes/kidspreschool-scheme.xml";
						configObj.releaseListSkinURL = "http://www-tc.pbskids.org/producerplayer/swf/skins/skinKidsGoSquared.swf";
						configObj.releaseListColorScheme =
						"<colorschemes>"+
							"<releaseList>"+
								"<backgroundColor>0x89DBD8</backgroundColor>"+
								"<frameColor>0x89DBD8</frameColor>"+
								"<itemBackgroundColor>0x89DBD8</itemBackgroundColor>"+
								"<itemBackground2Color>0x89DBD8</itemBackground2Color>"+
								"<itemBackgroundHoverColor>0xFFED1B</itemBackgroundHoverColor>"+
								"<itemBackgroundSelectedColor>0xFFED1B</itemBackgroundSelectedColor>"+
								"<itemFrameColor>0x89DBD8</itemFrameColor>"+
								"<textColor>0xFFFFFF</textColor>"+
								"<text2Color>0xFFFFFF</text2Color>"+
								"<textFrameColor>0xFFFFFF</textFrameColor>"+
								"<textHoverColor>0x5B7900</textHoverColor>"+
								"<textSelectedColor>0x5B7900</textSelectedColor>"+
								"<thumbnailFrameColor>0xFFFFFF</thumbnailFrameColor>"+
								"<thumbnailFrameColor>0xFFFFFF</thumbnailFrameColor>"+
								"<scrollButtonColor>0xFFED1B</scrollButtonColor>"+
								"<scrollIconColor>0xF27F00</scrollIconColor>"+
								"<scrollThumbColor>0xFFED1B</scrollThumbColor>"+
								"<scrollTrackColor>0xF27F00</scrollTrackColor>"+
								"<scrollTrackFrameColor>0xF27F00</scrollTrackFrameColor>"+
							"</releaseList>"+
						"</colorschemes>";
						configObj.dockBanner = "false";
						configObj.dockReleaseList = "right";
						configObj.aspectRatio = "16:9";
						configObj.playerPaddingTop = 20;
						configObj.playerPaddingLeft = 20;
						configObj.releaseListWidth = 300;
						configObj.releaseListHeight = 440;
						configObj.releaseListPaddingTop = 0;
						configObj.releaseListPaddingLeft = 42;
						configObj.containerWidth = 842;
						configObj.containerHeight = 455;
						configObj.releaseCols = 1;
						
            pbs.kidsgo.producerplayer.init(configObj,"playerWrapper");
            
            $.colorbox.close = function(){
              if(!player) player = getPlayer();
              if(player) if(player.pausePlayer) player.pausePlayer(true);
              $("#colorbox").css({"top":"-9999px"});
              $("#cboxOverlay").hide();
            }
            
            cb_top = $("#colorbox").css("top");
						
						$('span.category-button')
						.hover(function(){$(this).addClass("hover");},function(){$(this).removeClass("hover");})
						.click(function(){
								$('span.category-button.selected').removeClass("selected");
								$(this).addClass("selected");
								loadPlaylist($(this).attr("data-category-name"));
						});
						
	        }
        });	
      }
      else {
        $("#colorbox").css({"top":cb_top});
        $("#cboxOverlay").show();
        if(!player) player = getPlayer();
        if(player) if(player.pausePlayer) player.pausePlayer(false);
      }
    });
  });