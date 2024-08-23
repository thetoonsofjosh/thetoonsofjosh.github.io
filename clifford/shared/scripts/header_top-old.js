// universal initial path to header images ***NEEDS TO BE SWITCHED WHEN ON SERVER***
// var headimgpath = "/WINDOWS/Desktop/clifford/shared/images/";
var headimgpath = "/clifford/shared/images/";

// universal path to home ***NEEDS TO BE SWITCHED WHEN ON SERVER***
// var homepath = "/WINDOWS/Desktop/clifford/";
var homepath = "/clifford/";

// info for correct ALT tags
var arrPage = new Array("home", "bigideas", "games", "stories", "printables", "friends", "backstage", "caregiver", "tv", "sitemap");
var arrAlt = new Array("Home", "Big Ideas", "Games", "Stories", "Printables", "Friends", "Backstage", "Caregivers", "TV Schedule", "Site Map");
var strAlt = "";

for (i = 0; i < arrPage.length; i++) {
	if (pageSite == arrPage[i]) { // if name of page (pageSite) matches up with name in first array
		strAlt = arrAlt[i]; // alt tag replaced with word(s) in second array from same position
	}
}

// will write out top header bar
function doHeader() {
	var buf = "";
	buf += "<table cellspacing=0 cellpadding=0 border=0 width=583 height=55>\n";
	buf += "<!-- begin header table -->\n";
	buf += "<tr>\n";
	buf += "<td><a href=\"http://pbskids.org\"><img src=\"" + headimgpath + "pbs.gif\" width=56 height=56 border=0 alt=\"PBS Kids\"></a></td>\n";
	buf += "<td><a href=\"" + homepath + pageSite + "/index.html\"><img src=\"" + headimgpath + pageSite + "/title.gif\" width=384 height=56 border=0 alt=\"" + strAlt + "\"></a></td>\n";
	buf += "<td><a href=\"" + homepath + "index.html\"><img src=\"" + headimgpath + "topnav_right.gif\" width=143 height=56 border=0 alt=\"Clifford the Big Red Dog\"></a></td>\n";
	buf += "</tr>\n";
	buf += "<!-- begin header underline bar table -->\n";
	buf += "<tr>\n";
	buf += "<td colspan=3><img src=\"" + headimgpath + pageSite + "/title_bar.gif\" width=583 height=11></td>\n";
	buf += "</tr>\n";
	buf += "</table>\n";
	
	document.write(buf);
}