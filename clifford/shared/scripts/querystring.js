
// QUERY STRING AND DATA HANDLING:
top.dataObj=new Object();


function parseQuery() {
	//DEBUG_QS="";
	var s=top.document.location.search;
	s=(s.indexOf('?')==0)?s.substr(1,s.length):s;
	var a=s.split('&');
	for(var i=0;i<a.length;i++) {
		var nv=a[i].split('=');
		if (nv[0]&&nv[1]) {
			//eval([nv[0]] + "= '" + unescape(nv[1]) + "';");
			//-------------------------------
			  top.dataObj[nv[0]]= unescape(nv[1]);
			//-------------------------------
			//DEBUG_QS += (nv[0]+' = '+eval(nv[0]))
		}
	}
	//top.window.defaultStatus = DEBUG_QS
}

parseQuery();


 
  
function setData(n,v) {
	if (v) {//if (!v) v = "0";
		top.dataObj[n]=v} 
	else {
		delete top.dataObj[n];
	};
}

function getData(s) {
	return ((typeof top.dataObj[s] == 'string')?top.dataObj[s]:'undefined');
}
 


function getQS() {
	var i=0;
	var qs="?";
	for (prop in top.dataObj) {
		qs += ((++i>1)?"&":"") + prop+"="+escape(top.dataObj[prop])
	}
	return qs;
}


function getPage(t,l) {
	if (typeof phoneFlag != 'undefined') {
		top.setData('phonenum','');
	}
	//t.location.replace(l + getQS());
	t.location = (l + getQS());
}













