/**********************************
Here is a list of the events that are produced by the flvPlayer.
Data structures are explained below.  NOTE: The mediaType for any event that sends back an entire playlist
is always "ALL".

Events that send in a playlist data type (which can include multiple clips):
onPlaylistBegin -- fired when new playlist data is first received by the player
onPlaylistEnd -- fired when a playlist has completed playing, either naturally or when it is replaced by another playlist
onClipTime -- fired every 5 seconds or so to give a snapshot of the state of the current playlist and the clips within it

Events that send in a single clip data type:
onBeginMedia -- fired when a media first starts playing, after it has buffered sufficiently.
onEndMedia -- fired when a media has completed naturally.  If a media ends because the playlist has been replaced, this event is not fired.
onMidMedia -- fired when a media reaches a point between 40 and 60 percent.  If the user skips over this section of the media, this event is not fired

playlist data type:
pl.currentDate
pl.playlistID
pl.userName
pl.countryCode
pl.regionCode
pl.browser
pl.operatingSystem
pl.feed
pl.affiliateTag
pl.playerName
pl.clips //array of clips below

clip data type:
clip.baseClip.title
clip.baseClip.author
clip.baseClip.abstract
clip.baseClip.copyright
clip.baseClip.height
clip.baseClip.width
clip.baseClip.isAd
clip.baseClip.keywords
clip.baseClip.releaseID
clip.baseClip.releaseLength -- the length of the clip as shown in system, in milliseconds
clip.baseClip.bitrate:Number -- the bitrate of the clip as shown in system, bps (not kbps)
clip.baseClip.trueLength -- the actual length of the clip as determined at runtime, in milliseconds
clip.baseClip.trueBitrate -- the actual bitrate of the clip as determined at runtime, in kbps (not bps)
clip.baseClip.connectionBitrate -- the actual bitrate of the user's connection as determined at runtime, if this data could not be ascertained, this value will be undefined, in kbps (not bps)
clip.baseClip.loadTime -- the total miliseconds between when the request is made for the clip and when the clip starts running.
clip.baseClip.lengthPlayed -- the total miliseconds that the clip actually played, if the clip did not play, this value is undefined
clip.baseClip.rebufferingTime -- the total miliseconds the player spent buffering itself.

***************************************/

tpQOSTypeArray = new Array();
var tpQOScurrentPL;
var tpQOSunloading;

function tpRegisterQOSType(eventType, mediaType, callback)
{
	for (var i = 1; i < tpQOSTypeArray.length; i++)
	{
		if (tpQOSTypeArray[i].eventType == eventType && tpQOSTypeArray[i].mediaType == mediaType && tpQOSTypeArray[i].callback == callback)
		{
			return;//there's already one there, don't put another in
		}
	}	
	var qosTypeObj = {mediaType:mediaType, eventType:eventType, callback:callback}
	tpQOSTypeArray.push(qosTypeObj);
}

function tpUnregisterQOSType(type, callback)
{
	for (var i = 1; i < tpQOSTypeArray.length; i++)
	{
		if (tpQOSTypeArray[i].eventType == eventType && tpQOSTypeArray[i].mediaType == mediaType && tpQOSTypeArray[i].callback == callback)
		{
			tpQOSTypeArray.splice(i, 1);//get rid of the element
			break;
		}
	}
}

//called from the Player when an event is fired
function tpReceiveQOSEvent(eventType, mediaType, obj)
{
	if (obj == undefined) return;//don't do anything, the data is bad
	
	if (eventType == "onClipTime" || eventType == "onPlaylistBegin")
	{
		tpQOScurrentPL = obj;
	}
	else if (eventType == "onPlaylistEnd")
	{
		tpQOScurrentPL = null;//get rid so we don't hit twice if browser closes and a new playlist hasn't yet replaced the old
	}
	
	//go through the type array and see if we have a match
	
	for (var i = 0; i < tpQOSTypeArray.length; i++)
	{
		if (tpQOSTypeArray[i].eventType == eventType && (mediaType == "ALL" || tpQOSTypeArray[i].mediaType == mediaType || tpQOSTypeArray[i].mediaType == "ALL"))
		{
			eval(tpQOSTypeArray[i].callback)(obj);
		}
	}
}

window.onunload = function()
{
	tpQOSUnload();
}

function tpQOSUnload()
{
	if(tpQOScurrentPL == undefined || tpQOScurrentPL == null) return;
	//mock up a playlist end event
	tpQOSunloading = true;
	tpReceiveQOSEvent("onPlaylistEnd", "ALL", tpQOScurrentPL);
}

function tpQOSSendURL(url)
{
	var connection = new Image();
	connection.src = url;
	if (tpQOSunloading)
	{
		for (i = 0; ((!connection.complete) && (i < 100000)); i++)
		{
		}
	}
}
