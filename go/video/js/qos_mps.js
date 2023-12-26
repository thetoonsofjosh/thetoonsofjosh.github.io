

//register our functionality with the qos component
tpRegisterQOSType("onPlaylistEnd", "ALL", "QOSMPS_handlePLEnd");

//what's the base url for the mps qos?
var QOSMPS_baseUrl = "http://release.theplatform.com/tracker.log"
var QOSMPS_qs = "";
var QOSMPS_baseCount = 0;
var QOSMPS_baseClips = new Array();

function QOSMPS_handlePLEnd(pl)
{
	QOSMPS_baseCount = 0;
	QOSMPS_baseClips.length = 0;
	//the first 3 values are always the same
	QOSMPS_qs = "?type=qos&ver=1";
	//let's parse out the query string
	if (pl.currentDate != undefined) QOSMPS_appendStr_qs("d", pl.currentDate);
	if (pl.userName != undefined) QOSMPS_appendStr_qs("un", pl.userName);
	if (pl.countryCode != undefined) QOSMPS_appendStr_qs("cc", pl.countryCode);
	if (pl.regionCode != undefined) QOSMPS_appendStr_qs("rc", pl.regionCode);
	if (pl.browser != undefined) QOSMPS_appendStr_qs("br", pl.browser);
	if (pl.operatingSystem != undefined) QOSMPS_appendStr_qs("os", pl.operatingSystem);
	if (pl.feed != undefined) QOSMPS_appendStr_qs("p", pl.feed);
	if (pl.player != undefined) QOSMPS_appendStr_qs("pl", pl.player);
	if (pl.affiliate != undefined) QOSMPS_appendStr_qs("af", pl.affiliate);
	if (pl.playlistID != undefined) QOSMPS_appendStr_qs("prid", pl.playlistID);
	for (var i = 0;i < pl.clips.length;i++)
	{
		QOSMPS_parseClip(pl.clips[i]);
	}
	
	if (QOSMPS_baseClips.length > 1) QOSMPS_parseAggregate(pl.playlistID)//parse the aggregate data only if there are 2 or more clips
	QOSMPS_sendData(QOSMPS_qs);
}

function QOSMPS_parseClip(c)
{
	var bc = c.baseClip;
	var isC = false;
	for (var i = 0; i < QOSMPS_baseClips.length; i++)
	{
		if (QOSMPS_baseClips[i].releaseID == bc.releaseID)
		{
			if (c.isAd)
			{
				QOSMPS_appendStr_qs("c" + QOSMPS_baseCount, "1");
				break;
			}
			else
			{
				return;//don't parse this one, it's a repeat content
			}
		}
	}
	QOSMPS_baseClips.push(bc);
	if (bc.releaseID != undefined)  QOSMPS_appendStr_qs("rid" + QOSMPS_baseCount, bc.releaseID);
	
	if (bc.title != undefined && bc.title != null && bc.title != "null")  QOSMPS_appendStr_qs("t" + QOSMPS_baseCount, bc.title);
	if (bc.author != undefined && bc.author != null && bc.author != "null")  QOSMPS_appendStr_qs("a" + QOSMPS_baseCount, bc.author);
	if (bc.releaseLength != undefined)  QOSMPS_appendStr_qs("l" + QOSMPS_baseCount, bc.releaseLength);
	if (bc.bitrate != undefined && bc.bitrate != NaN && bc.bitrate != "NaN")  QOSMPS_appendStr_qs("b" + QOSMPS_baseCount, bc.bitrate);
	if (bc.loadTime != undefined)  QOSMPS_appendStr_qs("lt" + QOSMPS_baseCount, bc.loadTime);
	if (bc.trueLength == undefined && c.baseClip.releaseLength != undefined) bc.trueLength = bc.releaseLength;
	if (bc.lengthPlayed != undefined)
	{
		var percentPlayed = QOSMPS_round((bc.lengthPlayed / bc.trueLength) * 100, 2);
		if (percentPlayed > 100) percentPlayed = 100;
		if (!isNaN(percentPlayed))
		{
			QOSMPS_appendStr_qs("pp" + QOSMPS_baseCount, percentPlayed);
		}
	}
	if (bc.rebufferingTime != undefined)
	{
		var percentRebuff = QOSMPS_round((bc.rebufferingTime / (bc.rebufferingTime + bc.lengthPlayed)) * 100, 2);
		QOSMPS_appendStr_qs("pr" + QOSMPS_baseCount, percentRebuff);
	}
	var percentBW;
	if (bc.connectionBitrate != undefined)
	{
		if (bc.trueBitrate == undefined && bc.bitrate != undefined) bc.trueBitrate == bc.bitrate / 1000;
		percentBW = QOSMPS_round((bc.connectionBitrate / bc.trueBitrate) * 100, 2);
		if (!isNaN(percentBW))
		{
			if (percentBW > 100) percentBW = 100;//cap it out at 100%
		}
		else
		{
			percentBW = 100;
		}
	}
	else
	{
		percentBW = 100;
	}
	if (bc.lengthPlayed != undefined && bc.lengthPlayed > 0)//don't include unless the clip has played
	{
		bc.percentBW = percentBW;
		QOSMPS_appendStr_qs("pb" + QOSMPS_baseCount, percentBW)
	}
	else
	{
		bc.percentBW = undefined;
	}
	if (bc.lengthPlayed != undefined && bc.lengthPlayed > 0)  QOSMPS_appendStr_qs("lp" + QOSMPS_baseCount, bc.lengthPlayed);
	QOSMPS_baseCount++;
}

function QOSMPS_parseAggregate(plid)
{
	if (plid != undefined) QOSMPS_appendStr_qs("rid" + QOSMPS_baseCount, plid);
	var loadTime = QOSMPS_baseClips[0].loadTime;
	var trueLength = 0;
	var lengthPlayed = 0;
	var percentBW = 100;
	var bwLength = 0;//the length of the clips that have bandwidth data
	var rebuffTime = 0;
	var bwCalcArray = new Array();
	//aggregate values
	for (var i = 0; i < QOSMPS_baseClips.length; i++)
	{
		var bc = QOSMPS_baseClips[i];
		if (bc.trueLength != undefined) trueLength += bc.trueLength;
		if (bc.lengthPlayed != undefined)
		{
			if (bc.lengthPlayed > bc.trueLength) bc.lengthPlayed = bc.trueLength;//account for duration errors so pp is always <= 100;
			lengthPlayed += bc.lengthPlayed;
		}
		if (bc.rebufferingTime != undefined) rebuffTime += bc.rebufferingTime;
		if (bc.percentBW != undefined)
		{
			var bwObj = new Object();
			bwObj.percentBW = bc.percentBW;
			bwObj.trueLength = bc.trueLength;
			bwCalcArray.push(bwObj);
			bwLength += bc.trueLength;
		}
	}
	
	//calculate the weighted bandwidth
	var compositeBW = 0;
	if (bwLength > 0)
	{
		for (var i = 0; i < bwCalcArray.length; i++)
		{
			var bwObj = bwCalcArray[i];
			var percentTotal = bwObj.trueLength / bwLength;
			compositeBW += bwObj.percentBW * percentTotal
		}
	}
	if (compositeBW > 100) compositeBW = 100;
	if (trueLength > 0) QOSMPS_appendStr_qs("l" + QOSMPS_baseCount, trueLength);
	if (loadTime != undefined) QOSMPS_appendStr_qs("lt" + QOSMPS_baseCount, loadTime);
	if (lengthPlayed > 0 && trueLength > 0)
	{
		var percentPlayed = QOSMPS_round((lengthPlayed / trueLength) * 100, 2);
		if (percentPlayed > 100) percentPlayed = 100;
		if (!isNaN(percentPlayed)) QOSMPS_appendStr_qs("pp" + QOSMPS_baseCount, percentPlayed);
	}
	if (rebuffTime > 0 && trueLength > 0)
	{
		var percentRebuff = QOSMPS_round((rebuffTime / (rebuffTime + lengthPlayed))*100, 2);
		if (!isNaN(percentRebuff)) QOSMPS_appendStr_qs("pr" + QOSMPS_baseCount, percentRebuff);
	}
	if (compositeBW > 0) QOSMPS_appendStr_qs("pb" + QOSMPS_baseCount, QOSMPS_round(compositeBW, 2));
	if (lengthPlayed > 0) QOSMPS_appendStr_qs("lp" + QOSMPS_baseCount, lengthPlayed);
}

function QOSMPS_appendStr_qs(name, value)
{
	QOSMPS_qs += "&" + name + "=" + value;
}

function QOSMPS_sendData(qString)
{
	//send the query string
	var theUrl = QOSMPS_baseUrl + qString;
	tpQOSSendURL(theUrl);
	//reset the query string
	QOSMPS_qs = ""
	
}

function QOSMPS_round(num, power)
{
	var mult = Math.pow(10, power);
	var raw = num * mult;
	raw = Math.round(raw);
	return raw / mult;
}
/*
function QOSMPS_sendHttpReq(url)
{
	try 
	{
		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	} 
	catch (e) 
	{
		try 
		{
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		} 
		catch (E) 
		{
			xmlhttp = false;
		}
	}
	if (!xmlhttp && typeof XMLHttpRequest!='undefined') 
	{
		try 
		{
			xmlhttp = new XMLHttpRequest();
		} 
		catch (e) 
		{
			xmlhttp=false;
		}
	}
	if (!xmlhttp && window.createRequest) 
	{
		try 
		{
			xmlhttp = window.createRequest();
		} 
		catch (e) 
		{
			xmlhttp=false;
		}
	}
	if (!xmlhttp) return;//maybe we'll try another method
	alert("send xmlhttp " + xmlhttp + ":" + url);
	xmlhttp.open("GET", url, true);//we don't need the return data
}
*/
