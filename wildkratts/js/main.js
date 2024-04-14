
// detect domain
var domain = window.location.hostname.toLowerCase();
var subdomain = domain.indexOf('.') >= 0 ? domain.substring(0, domain.indexOf('.')) : '';
var pbs = domain.indexOf('pbskids') >= 0;
var test = domain == 'wktest';

var mediaDomain = domain;
if ( pbs & subdomain != 'soup' ) mediaDomain = 'thetoonsofjosh.github.io';


// config
var tvoMode = !pbs && !test;
var urlRoot = 'https://' + domain + '/wildkratts/';
var mediaUrlRoot = 'https://' + mediaDomain + '/wildkratts/';

// FLASH DIMENSIONS
var width = tvoMode ? "100%" : "960";
var height = tvoMode ? "100%" : "575";

// SWFOBJECTIFICATION

var flashVars = {
	tvoMode: tvoMode,
	urlRoot: urlRoot,
	mediaUrlRoot: mediaUrlRoot,
	contentPath: mediaUrlRoot+swfContentPath,
	autostart: false,
	controlbar: "over"
};

if ( typeof swfLoaderPath != 'undefined' && window.location.search.indexOf('loader=false')==-1 )
	flashVars.loaderPath = mediaUrlRoot+swfLoaderPath;
	
if ( typeof videoFlashVars != 'undefined' )
	for (attrname in videoFlashVars) { flashVars[attrname] = videoFlashVars[attrname]; }
	
if ( typeof disableHomeLink != 'undefined' && disableHomeLink == true )
	flashVars.disableHomeLink = true;
	
var params = {
	allowScriptAccess: 'always',
	allowFullScreen: 'true',
	wmode: 'opaque'
};

var swf = window.location.search.indexOf('shell=false')==-1 ? mediaUrlRoot+"WKShell.swf" : swfContentPath;

swfobject.embedSWF(swf, "flashcontent", width, height, "9.0.159.0", urlRoot+"expressInstall.swf", flashVars, params, null, onSWFEmbedded);
swfobject.addDomLoadEvent(onSWFEmbedded);
swfobject.addLoadEvent(onSWFEmbedded);

// FOCUS

function onSWFEmbedded() {
	var f = swfobject.getObjectById('flashcontent');	
	if (f) { 
		onkeydown = f.focus();
		f.tabIndex = 0; f.focus(); 
	}	
}

// AUTH INIT

$(function() {
	initAuth(); 
});
