// JavaScript Document

/*********************************************************************
	CREATE COOKIES TO SAVE THE USER'S LAST VIDEO VIEWED IN CASE
	THE PAGE IS REFRESHING DUE TO LOGGING-IN OR LOCALIZING 
*********************************************************************/
var setCookies = false;

function setCookiesBoolean(_value){ //Set 'setCookies' boolean value via AS3 external interface.
	setCookies = _value ? _value : false;
}

window.onunload = function(){
	if (setCookies) {
		var currentCategory = getFlashMovie("kidsGoPlayer").getCurrentCategory();
		var currentSearch = getFlashMovie("kidsGoPlayer").getCurrentSearch();
		
		//===  STORE THE LAST VIEWED CATEGORY IN A COOKIE ======================
		if (currentCategory != "null" && currentCategory != null && currentCategory != "") Set_Cookie("pbskidsgo.video.category", currentCategory, 120000, "/", null );
		else {
			Set_Cookie("pbskidsgo.video.category", "", 2, "/", null ); // Set quick expiration if deletion is ignored by cookie-versioning in IE and OPERA
			Set_Cookie("pbskidsgo.video.category", "", -2000, "/", null );
		}
		
		//===  STORE THE LAST USED SEARCH IN A COOKIE ======================
		if (currentSearch != "null" && currentSearch != null && currentSearch != "") Set_Cookie("pbskidsgo.video.search", currentSearch, 120000, "/", null );
		else {
			Set_Cookie("pbskidsgo.video.search", "", 2, "/", null ); // Set quick expiration if deletion is ignored by cookie-versioning in IE and OPERA
			Set_Cookie("pbskidsgo.video.search", "", -2000, "/", null );
		}
	
		//===  STORE THE LAST VIEWED IN A COOKIE ======================
		Set_Cookie("pbskidsgo.video.pid", getFlashMovie("kidsGoPlayer").getCurrentPID(), 120000, "/", null );
	
	}
}
	
	
//LOCALIZATION ===============================================
/*function updateLocalizationBar(_nola,currentShowTitle){
	getFlashMovie("localizationBar").updateLocalizationBar(_nola,currentShowTitle);
}*/

//== DISPLAY FUNCTIONS ========================================
function promptLogin(){
	setCookies = true;
	getFlashMovie("kidsGoPlayer").pausePlayer();
	PKG.prmpt();
}

function pausePlayer(){
	getFlashMovie("kidsGoPlayer").pausePlayer();
}

function toggleLightBox(visible) {
	document.getElementById("LightBoxFill").style.display = visible == "true" ? "block" : "none";
}


//== UTILS ====================================================
function getFlashMovie(movieName) {   
	var isIE = navigator.appName.indexOf("Microsoft") != -1;   
	return (isIE) ? window[movieName] : document[movieName];  
}  

function getUrlVars(){
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
 
	for(var i = 0; i < hashes.length; i++){
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	
	return vars;
}