var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

function makeID()
{
    var t = "ID";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 8; i++ )
        t += possible.charAt(Math.floor(Math.random() * possible.length));
    return t;
}

function show_flash_tl(flash_source, flash_width, flash_height, flash_vars)
{
	var __attributes = {
	   //align: "left"
	};
	var __params = {
		play : "true",
		menu : "false",
		quality : "autolow",
		wmode : "transparent",
		swliveconnect : "false",
		flashvars : flash_vars,
		allowscriptaccess : "always",
		allowfullscreen : "true",
		salign:"tl"
		//base:""
		//salign:"tl"
		//scale:""
	};
	
	var __id=makeID();
	document.write('<span id="'+__id+'"></span>');//element to replace with Flash
	
	swfobject.embedSWF(
		flash_source, 
        __id, 
        flash_width, 
        flash_height, 
        "9.0.0",
        false, //Express Install
        {}, //FlashVars, settings in __params instead
        __params, //Parameters
        __attributes, //Attributes
        false//callback
	);
}

function show_flash_object(flash_source, flash_width, flash_height, flash_vars)
{
	show_flash(flash_source, flash_width, flash_height, flash_vars);
}

function show_flash(flash_source, flash_width, flash_height, flash_vars)
{
	var __attributes = {
	   //align: "left"
	};
	var __params = {
		play : "true",
		menu : "false",
		quality : "autolow",
		wmode : "transparent",
		swliveconnect : "false",
		flashvars : flash_vars,
		allowscriptaccess : "always",
		allowfullscreen : "true"
		//base:""
		//salign:"tl"
		//scale:""
	};
	
	var __id=makeID();
	document.write('<span id="'+__id+'"></span>');//element to replace with Flash
	
	swfobject.embedSWF(
		flash_source, 
        __id, 
        flash_width, 
        flash_height, 
        "9.0.0",
        false, //Express Install
        {}, //FlashVars, settings in __params instead
        __params, //Parameters
        __attributes, //Attributes
        false//callback
	);
	
}

function show_flash_nd(flash_source, flash_width, flash_height, flash_vars)
{
	show_flash(flash_source, flash_width, flash_height, flash_vars);
}

function show_flash_object_with_name(flash_source, flash_width, flash_height, obj_name, flash_vars)
{
	var __attributes = {
	   //align: "left"
	   name : obj_name
	};
	var __params = {
		play : "true",
		menu : "false",
		quality : "autolow",
		wmode : "opaque",
		swliveconnect : "false",
		flashvars : flash_vars,
		allowscriptaccess : "always",
		allowfullscreen : "true"
		//base:""
		//salign:"tl"
		//scale:""
	};
	
	var __id=makeID();
	document.write('<span id="'+__id+'"></span>');//element to replace with Flash
	
	swfobject.embedSWF(
		flash_source, 
        __id, 
        flash_width, 
        flash_height, 
        "9.0.0",
        false, //Express Install
        {}, //FlashVars, settings in __params instead
        __params, //Parameters
        __attributes, //Attributes
        false//callback
	);
}

function show_flash_object_noembed(flash_source, flash_width, flash_height, flash_vars, page_link, movie_name, keywords)
{
	document.write('<NONSCRIPT><OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://active.macromedia.com/flash2/cabs/swflash.cab#version=3,0,0,0" ID=ECHOECHO WIDTH='+flash_width+' HEIGHT='+flash_height+'>')
	document.write('<noembed><a href="'+page_link+'" alt="'+keywords+'">'+movie_name+'</a></noembed>');
	document.write('<PARAM NAME=movie VALUE="'+flash_source+'">')
	document.write('<PARAM NAME=quality VALUE=AUTOLOW>')
	document.write('<PARAM NAME=play VALUE=true>')
	document.write('<PARAM NAME=wmode VALUE=transparent>')
	document.write('<PARAM NAME=menu VALUE=false>')
	document.write('<PARAM NAME=AllowScriptAccess VALUE=always>')
	document.write('<PARAM NAME=allowFullScreen VALUE=true>')
	document.write('<PARAM NAME=flashvars value="'+flash_vars+'">');
	document.write('<EMBED SRC="'+flash_source+'" allowFullScreen=true AllowScriptAccess=always swLiveConnect=FALSE WIDTH='+flash_width+' HEIGHT='+flash_height+' QUALITY=AUTOLOW MENU=false PLAY=true FLASHVARS="'+flash_vars+'" WMODE=transparent TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash"></EMBED>')
	document.write('</OBJECT><NONSCRIPT>')
}

function show_flash_object_with_name_return(flash_source, flash_width, flash_height, obj_name, flash_vars)
{
	var res = '<NONSCRIPT><OBJECT name="'+obj_name+'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://active.macromedia.com/flash2/cabs/swflash.cab#version=3,0,0,0" ID=ECHOECHO WIDTH='+flash_width+' HEIGHT='+flash_height+'>';
	res+='<PARAM NAME=allowFullScreen VALUE=true>';
	res+='<PARAM NAME=movie VALUE="'+flash_source+'">';
	res+='<PARAM NAME=quality VALUE=AUTOLOW>';
	res+='<PARAM NAME=play VALUE=true>';
	res+='<PARAM NAME=wmode VALUE=transparent>';
	res+='<PARAM NAME=menu VALUE=false>';
	res+='<PARAM NAME=scale VALUE=exactfit>';
	res+='<PARAM NAME=AllowScriptAccess VALUE=always>';
	res+='<PARAM NAME=flashvars value="'+flash_vars+'">';
	res+='<EMBED SRC="'+flash_source+'" allowFullScreen=true scale=exactfit AllowScriptAccess=always swLiveConnect=FALSE WIDTH='+flash_width+' HEIGHT='+flash_height+' QUALITY=AUTOLOW MENU=false PLAY=true FLASHVARS="'+flash_vars+'" WMODE=transparent TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash"></EMBED>';
	res+='</OBJECT></NONSCRIPT>';
	return res;
}

function show_flash_object_with_name_return_samsung(flash_source, flash_width, flash_height, obj_name, flash_vars)
{
	var res = '<OBJECT type="application/x-shockwave-flash" name="'+obj_name+'" WIDTH='+flash_width+' HEIGHT='+flash_height+'>';
	res+='<PARAM NAME=allowFullScreen VALUE=true>';
	res+='<PARAM NAME=movie VALUE="'+flash_source+'">';
	res+='<PARAM NAME=quality VALUE=AUTOLOW>';
	res+='<PARAM NAME=play VALUE=true>';
	res+='<PARAM NAME=wmode VALUE=transparent>';
	res+='<PARAM NAME=menu VALUE=false>';
	res+='<PARAM NAME=scale VALUE=exactfit>';
	res+='<PARAM NAME=AllowScriptAccess VALUE=always>';
	res+='<PARAM NAME=flashvars value="'+flash_vars+'">';
	res+='</OBJECT>';
	return res;
}

}
/*
     FILE ARCHIVED ON 19:58:46 Mar 14, 2014 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 15:57:09 Feb 16, 2025.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.776
  exclusion.robots: 0.039
  exclusion.robots.policy: 0.024
  esindex: 0.014
  cdx.remote: 79.43
  LoadShardBlock: 443.184 (3)
  PetaboxLoader3.datanode: 460.376 (5)
  PetaboxLoader3.resolve: 813.739 (3)
  load_resource: 948.443 (2)
*/