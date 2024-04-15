var containerId;
var frameId;

function loadGame(path, width, height)
{
	containerId = "gamecontainer";
	frameId = "gameframe";
	var divString = '<div id="gamecontainer"><div id="game"><iframe id="'+frameId+'" scrolling="no" frameborder="0"></iframe></div></div>';
	$("#wrapper").after(divString);
	var ww = $(window).width();
	$("#gamecontainer").css({'width':width, 'height':height, 'left':(ww/2)-(width/2)});
	$("#gameframe").attr("src",'/sesame/swf/gameloader.html?swf=/sesame/'+path+'&w='+width+'&h='+height+'&rnd='+Math.floor(Math.random()*1000)); 
	$(window).bind('resize', scale);
}

function closeGame()
{
	$("#"+frameId).attr("src","/sesame/swf/empty.html"); 
	$("#"+containerId).remove();
	$(window).unbind('resize', scale);
}

function scale(e)
{
	var ww = $(window).width();
	var fw = $("#"+containerId).width();
	var left = (ww/2) - (fw/2);
	$("#"+containerId).css('left',left);
}

function loadVideoPlayer()
{
	containerId = 'videocontainer';
	frameId = 'videoframe';
	
	var url = window.location.href;
	var query = "";
	var pid = url.match(/(\&|\?)pid\=([a-zA-Z\_\-0-9]*)/g);
	if (pid){
		query = "?pid=" + pid.join().split("=")[1] + "&";
	}
	var channel = url.match(/(\&|\?)channel\=([0-9]*)/g);
	if (channel){
		query = "?channel=" + channel.join().split("=")[1];
	}
	var divString = '<div id="'+containerId+'"><iframe id="'+frameId+'" scrolling="no" allowTransparency="true" frameborder="0"></iframe></div>';
	$("#wrapper").after(divString);
	var ww = $(window).width();
	var t = $("#"+containerId).css('top').replace("px", "");
	var headbandOpen = false;
	$("#"+containerId).css({'left':(ww/2)-(875/2)});
	$("#"+frameId).attr("src",'/sesame/videoPlayer/index.html' + query);
	$(window).bind('resize', scale);
	$(".brand-action-toggle").click(function(){
		headbandOpen = !headbandOpen;
		var newTop = headbandOpen ? parseInt(t) + 70 : t;
		$("#"+containerId).animate({top:newTop});
	});
}

function unloadVideoPlayer()
{
	closeGame();
}