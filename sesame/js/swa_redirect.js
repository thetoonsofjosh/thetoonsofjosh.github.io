var loc = SWFAddress.getPathNames()[0]
if(loc != undefined)
{
	var href = window.location.href;
	var query = href.match(/\?[^\#]*/);
	window.location = "/sesame/"+query+"#/"+loc
}