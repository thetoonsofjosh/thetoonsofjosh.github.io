// -----------------------------------------------------------
// Univeral method for javascript->flash setvariable
// -----------------------------------------------------------

/* -----------------------------------------------------------
----------Supporting Browsers----------
PC:
IE 5 and higher
Netscape 6 and higher
Moz/Firebird all
Opera 7 and higher

Mac OSX:
IE 5.2
Safari all
Netscape 6 and higher
Moz/Firebird/Camino all
Opera 6 and higher

Linux:
Konqueror assumed
----------------------------------------------------------- */



// -----------------------------------------------------------
// Detection snippet from http://www.dithered.com/javascript/browser_detect/index.html
// -----------------------------------------------------------
var ua        = navigator.userAgent.toLowerCase(); 
var is_pc_ie  = ( (ua.indexOf('msie') != -1 ) && ( ua.indexOf('win') != -1 ) && ( ua.indexOf('opera') == -1 ) && ( ua.indexOf('webtv') == -1 ) );



/* -----------------------------------------------------------
function setFlashVariables(movieid, flashquery)

movieid: id of object tag, name of movieid passed in through FlashVars
flashquery: querystring of values to set. example( var1=foo&var2=bar )
----------------------------------------------------------- */
function setFlashVariables(movieid, flashquery){
	var i,values;
	if(is_pc_ie){
		var chunk = flashquery.split("&");
		for(i in chunk){
			values = chunk[i].split("=");
			document[movieid].SetVariable(values[0],values[1]);
		}
	}else{
		var divcontainer = "flash_setvariables_"+movieid;
		if(!document.getElementById(divcontainer)){
			var divholder = document.createElement("div");
			divholder.id = divcontainer;
			document.body.appendChild(divholder);
		}
		document.getElementById(divcontainer).innerHTML = "";
		var divinfo = "<embed src='gateway.swf' FlashVars='lc="+movieid+"&fq="+escape(flashquery)+"' width='0' height='0' type='application/x-shockwave-flash'></embed>";
		document.getElementById(divcontainer).innerHTML = divinfo;
	}
}