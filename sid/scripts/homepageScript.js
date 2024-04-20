var funbookPage=1;
var funbookMessages=new Array();
funbookMessages[0]="What does Sid see?";
funbookMessages[1]="Draw Gerald's Kite!";
funbookMessages[2]="What did May find?";
funbookMessages[3]="What did Gabriela grow?";
funbookMessages[4]="Weather cube";
funbookMessages[5]="Did you observe something new today?";
funbookMessages[6]="Families";
funbookMessages[7]="Trace your hands!";
funbookMessages[8]="What did you have for lunch?";
funbookMessages[9]="_____________'s Journal";

function gotoActivity(id)
{
 thisMovie("myFlash").gotoActivity(id);
}

function thisMovie(movieName) {
         if (navigator.appName.indexOf("Microsoft") != -1) {
             return window[movieName];
         } else {
             return document[movieName];
         }
}

function showSponsors(){
        document.getElementById("sponsorsFull").style.visibility="visible";
        document.getElementById("sponsorsMini").style.visibility="hidden";
}
function hideSponsors(){
        document.getElementById("sponsorsFull").style.visibility="hidden";
        document.getElementById("sponsorsMini").style.visibility="visible";
}

function openParents(){
        window.open("parentsAndTeachers.html");
}

function getURLString(){
       var url=document.location.href;
       var urlArray=url.split("/");
       var count=urlArray.length;
	   
	   

       if(urlArray[count-2]=="#"){
                return(urlArray[count-1]);
       }
       if(urlArray[count-3]=="#"){
                return(urlArray[count-2]);
       }
	   
	   //new seo (static html pages) linking
	   var page=urlArray[count-1];
	   page=page.replace(".html","");
	   return(page);
	   
	   //pbs has problems redircting from IE Aand Safari, use "?" instead
	   //this works, but creates some other problems in the main navigation
	   var lastPartArray=urlArray[count-1].split("html?");
	   if(lastPartArray.length>1){
		   var lastPart=lastPartArray[lastPartArray.length-1];
		   return(lastPart);
	   }
	   
	   
       return("false");
}
function getBaseDir(){
	var url=document.location.href;
	var urlArray=url.split("/");
	var count=urlArray.length;
	if(urlArray[count-2] == "games" || urlArray[count-2] == "zones"){
		return("../");
	}
	else{
		return("");
	}
}

function returnVideoName(){
   var url=document.location.href;
   var urlArray=url.split("/");
   var count=urlArray.length;
   var page=urlArray[count-1];
   var video=page.split("-");
   return(video[1]);
}


function swapImage(obj,img){
	obj.src="media/images/" + img;
}

function move(oNode){

	iY = event.y;
	iYTwo = iY - Mary;
	if (iYTwo <= 0) iYTwo = 0;
	oNode.style.top=iYTwo;

	iX = event.x;
	iXTwo = iX - Paul;
	if (iXTwo <= 0) iXTwo = 0;
	oNode.style.left=iXTwo;
	document.getElementById("coords").innerHTML=iXTwo + ", "+iYTwo;
	
}
function getMary(oNode){

	iY = event.y;
	John = oNode.style.pixelTop;
	Mary =iY - John;

	iX = event.x;
	John = oNode.style.pixelLeft;
	Paul =iX - John;
}

function preloadTheImages(){
	var imgHolder=new Array();
	for(var a=0;a<preloadImages.length;a++){
		imgHolder[a]=new Image();
		imgHolder[a].src="media/images/" + preloadImages[a];
	}
}
function funbookBtnClick(d){
	var dir=-1;
	if(d=="right"){
		dir=1;
	}
	funbookPage+=dir;
	if(funbookPage<1){
		funbookPage=1;
	}
	else if(funbookPage>10){
		funbookPage=10;
	}
	else{
		//flip page
		str='<div class="funbookTitle">'+funbookMessages[funbookPage-1]+'</div>';
		str+='<div style="float:left"><a href=""><img src="media/images/fb_printBtn.jpg" style="visibility: hidden;class="noBorder" /></a></div>';
		str+='<div style="clear:both"></div><img src="media/images/fb_p' + funbookPage + '.jpg" />';
		document.getElementById("funbookDiv").innerHTML=str;
	}
	if(funbookPage==1){
		document.getElementById("leftBtn").style.visibility="hidden";
	}
	else{
		document.getElementById("leftBtn").style.visibility="visible";
	}
	if(funbookPage==10){
		document.getElementById("rightBtn").style.visibility="hidden";
	}
	else{
		document.getElementById("rightBtn").style.visibility="visible";
	}
}
function getGoogleCode(){
	return(GA_env);
}
	

