function hideVideoPlayer() 
{
	document.getElementById('videoframe').src = "";
	document.getElementById('videoPlayer').style.visibility = "hidden";
}
function showVideoPlayer() 
{
	document.getElementById('videoframe').src = "/pbskids2008/wordgirl/adventures/videoloader.html"; 
	document.getElementById('videoPlayer').style.visibility = "visible";
}

function hideCECLogo() 
{
	var cec = document.getElementById("cec_logo");
	cec.style.display = "none";
}

function showCECLogo() 
{
	var cec = document.getElementById("cec_logo");
	cec.style.display = "block";
}

function loadShell(deepPath)
{
	var so = new SWFObject('/pbskids2008/wordgirl/parent.swf', 'wg_parent', '775', '500', '8', '#1277C9');
	so.addParam('allowScriptAccess','always');
	PBS_enable_cdn(so);
	so.addParam('wmode', 'transparent');
	so.addParam('menu', 'false');
	so.addVariable("sitePath", "/pbskids2008/wordgirl/");
	so.addVariable("deepPath", deepPath);
	so.addVariable("swfPath", "/enablecdn/content/swfs/");
	var cookieString = "" + document.cookie;
	if ( cookieString.indexOf("pbskids.fromkids") != -1 ) 
	{
		so.addVariable("logotype", "2");
	} 
	else 
	{
		so.addVariable("logotype", "1");
	}
	so.write('content');
	SWFAddress.setId("wg_parent");
}