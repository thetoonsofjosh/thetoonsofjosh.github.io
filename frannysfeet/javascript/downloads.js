// JavaScript Document
// Decides whether to put wallpaper or a screensaver preview in the cell
<!--
function placeImage(){
	var tmp1 = location.href.split("?");
	var locVars = tmp1[1];
	var varsArray = locVars.split("&");
	
	// Set the size var
	var tmp = varsArray[0].split("=");
	var size = tmp[1];
	
	// Set the item num
	var tmp = varsArray[1].split("=");
	var num = tmp[1];
	
	// Set the type
	var tmp = varsArray[2].split("=");
	var kind = tmp[1];
	
	var makeScreen = "javascript:viewPage('index.html?page=screen', 'screen_html.html');";
	var makeWall = "javascript:viewPage('index.html?page=wall', 'wall_html.html');";
	
	if(kind == "screen"){
		var addie = "screensavers/screensaver" + num + ".swf";
		document.write('<br /><br /><div align="center"><a href="#" onclick="' + makeScreen + '"><img src="images/backtoscreen.jpg" width="169" height="51" border="0" alt="Back to Screensavers"/></a></div><br /><br />');
		document.write('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" width="700" height="525">');
			document.write('<param name="movie" value="' + addie + '">');
			document.write('<param name="quality" value="high">');
			document.write('<embed src="' + addie + '" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="700" height="525"></embed>');
		document.write('</object>');
		
	} else if (kind == "wall"){
		var addie = "wallpaper/wallpaper_" + num + "_" + size + ".jpg";
		document.write('<br /><br /><div align="center"><a href="#" onclick="' + makeWall + '"><img src="images/backtowall.jpg" width="155" height="51" border="0" alt="Go back to the Wallpaper"/></a></div><br /><br />');
		document.write('<img src=' + addie + ' width="700" height="525" alt="Wallpaper">');
		document.write('<br /><br /><p>Right click on the image and choose: Set as wallpaper or Set as Background</p>');
		
	} else if (kind == "coloring"){
		var addie = "coloring/coloring_" + num + ".jpg";
		document.write('<iframe width="1" height="1" frameborder=0 src=' + addie + ' name="coloringpage" id="coloringpage"></iframe>');
		document.write('<br />');
		document.write('<table width="700" border="0" cellspacing="0" cellpadding="0">');
			document.write('<tr>');
				document.write('<td width="299"><div align="right"><a href="coloring_html.html"><img src="images/backtocolor.jpg" width="177" height="51" border="0" alt="Back to Coloring Pages"/></a></div></td>');
				document.write('<td width="27">&nbsp;</td>');
				document.write('<td width="299"><a href="javascript:parent.coloringpage.focus();parent.coloringpage.print();"><img src="images/printthispage.gif" width="139" height="50" border="0" alt="Print this Page"/></a></td>');
		  	document.write('</tr>');
		document.write('</table>');
		document.write('<br /><br /><img src=' + addie + ' width="575" height="744">');
	}
}

function writeTitle(){
	var tmp1 = location.href.split("?");
	var locVars = tmp1[1];
	var varsArray = locVars.split("&");
	
	// Set the size var
	var tmp = varsArray[0].split("=");
	var size = tmp[1];
	
	// Set the item num
	var tmp = varsArray[1].split("=");
	var num = tmp[1];
	
	// Set the type
	var tmp = varsArray[2].split("=");
	var kind = tmp[1];
	
	if(kind == "screen"){
		document.write("<title>Franny's Feet . Screensavers | PBS KIDS</title>");
	} else if (kind == "wall"){
		document.write("<title>Franny's Feet . Wallpaper | PBS KIDS</title>");
	} else if (kind == "coloring"){
		document.write("<title>Franny's Feet . Coloring Pages | PBS KIDS</title>");
	}
}

//-->
