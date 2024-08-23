// universal initial path to navbar images ***NEEDS TO BE SWITCHED WHEN ON SERVER***
// var navimgpath = "/WINDOWS/Desktop/clifford/shared/images/bottomnav/";
var navimgpath = "/clifford/shared/images/bottomnav/";
// universal initial path to linked pages ***NEEDS TO BE SWITCHED WHEN ON SERVER***
// var navpagepath = "/WINDOWS/Desktop/clifford/";
var navpagepath = "/clifford/";

// switches images on page
function switchImg(imageName, imageSrc) {
	if (document.images) {
    	document.images[imageName].src = imageSrc;
	}
}

// arrays for icons and rollovers
// every page needs to have id for pageSite (i.e., var pageSite="stories") in script section
// in order to have correct icon already hilited
var arrNavIcons = new Array("home", "bigideas", "games", "stories", "printables", "friends", "backstage", "caregiver", "tv");
var arrNavIconsOver = new Array("home_over", "bigideas_over", "games_over", "stories_over", "printables_over", "friends_over", "backstage_over", "caregiver_over", "tv_over");
for (i = 0; i < arrNavIcons.length; i++) {
	if (pageSite == arrNavIcons[i]) {
		arrNavIcons[i] = arrNavIconsOver[i];
	}
}

// preload images
var newNavArray = new Array();
for (i = 0; i < arrNavIconsOver.length; i++) {
	newNavArray[i] = new Image();
	newNavArray[i].src = navimgpath + arrNavIconsOver[i] + ".gif";
}

// will write out bottom nav bar
function doNavBar() {
	var buf = "";
	buf += "<table border=0 cellpadding=0 cellspacing=0 background=\"" + navpagepath + "shared/images/" + pageSite + "/bottomnav.gif\" width=750 height=72>\n";
	buf += "<tr>\n";
	buf += "<td valign=bottom>\n";
	buf += "<!-- nested icons table -->\n";
	buf += "<table border=0 cellpadding=0 cellspacing=0 width=750 height=72 background=\"" + navpagepath + "shared/images/netscape.gif\">\n";
	buf += "<tr>\n";
	buf += "<!-- home -->\n";
	buf += "<td rowspan=2><a href=\"" + navpagepath + "index.html\" onMouseover=\"switchImg('home', navimgpath + arrNavIconsOver[0] + '.gif'); return true\" onMouseout=\"switchImg('home',navimgpath + arrNavIcons[0] + '.gif'); return true\"><img name=\"home\" src=\"" + navimgpath + arrNavIcons[0] + ".gif\" width=88 height=72 border=0 alt=\"Home\"></a></td>\n";
	buf += "<!-- big ideas -->\n";
	buf += "<td rowspan=2><a href=\"" + navpagepath + "bigideas/index.html\" onMouseover=\"switchImg('big', navimgpath + arrNavIconsOver[1] + '.gif'); return true\" onMouseout=\"switchImg('big', navimgpath + arrNavIcons[1] + '.gif'); return true;\"><img name=\"big\" src=\"" + navimgpath + arrNavIcons[1] + ".gif\" width=82 height=72 border=0 alt=\"Big Ideas\"></a></td>\n";
	buf += "<!-- games -->\n";
	buf += "<td rowspan=2><a href=\"" + navpagepath + "games/index.html\" onMouseover=\"switchImg('games', navimgpath + arrNavIconsOver[2] + '.gif'); return true\" onMouseout=\"switchImg('games', navimgpath + arrNavIcons[2] + '.gif'); return true\"><img name=\"games\" src=\"" + navimgpath + arrNavIcons[2] + ".gif\" width=82 height=72 border=0 alt=\"Games\"></a></td>\n";
	buf += "<!-- stories -->\n";
	buf += "<td rowspan=2><a href=\"" + navpagepath + "stories/index.html\" onMouseover=\"switchImg('stories', navimgpath + arrNavIconsOver[3] + '.gif'); return true\" onMouseout=\"switchImg('stories', navimgpath + arrNavIcons[3] + '.gif'); return true\"><img name=\"stories\" src=\"" + navimgpath + arrNavIcons[3] + ".gif\" width=82 height=72 border=0 alt=\"Stories\"></a></td>\n";
	buf += "<!-- printables -->\n";
	buf += "<td rowspan=2><a href=\"" + navpagepath + "printables/index.html\" onMouseover=\"switchImg('print', navimgpath + arrNavIconsOver[4] + '.gif'); return true\" onMouseout=\"switchImg('print', navimgpath + arrNavIcons[4] + '.gif'); return true\"><img name=\"print\" src=\"" + navimgpath + arrNavIcons[4] + ".gif\" width=82 height=72 border=0 alt=\"Printables\"></a></td>\n";
	buf += "<!-- friends -->\n";
	buf += "<td rowspan=2><a href=\"" + navpagepath + "friends/index.html\" onMouseover=\"switchImg('friends', navimgpath + arrNavIconsOver[5] + '.gif'); return true\" onMouseout=\"switchImg('friends', navimgpath + arrNavIcons[5] + '.gif'); return true\"><img name=\"friends\" src=\"" + navimgpath + arrNavIcons[5] + ".gif\" width=82 height=72 border=0 alt=\"Friends\"></a></td>\n";
	buf += "<!-- backstage -->\n";
	buf += "<td rowspan=2><a href=\"" + navpagepath + "backstage/index.html\" onMouseover=\"switchImg('backstage',navimgpath + arrNavIconsOver[6] + '.gif'); return true\" onMouseout=\"switchImg('backstage',navimgpath + arrNavIcons[6] + '.gif'); return true\"><img name=\"backstage\" src=\"" + navimgpath + arrNavIcons[6] + ".gif\" width=82 height=72 border=0 alt=\"Backstage\"></a></td>\n";
	buf += "<!-- caregiver -->\n";
	buf += "<td rowspan=2><a href=\"" + navpagepath + "parentsteachers/index.html\" onMouseover=\"switchImg('caregiver', navimgpath + arrNavIconsOver[7] + '.gif'); return true\" onMouseout=\"switchImg('caregiver', navimgpath + arrNavIcons[7] + '.gif'); return true\"><img name=\"caregiver\" src=\"" + navimgpath + arrNavIcons[7] + ".gif\" width=88 height=72 border=0 alt=\"Parents and Teachers\"></a></td>\n";
	buf += "<!-- tv schedule -->\n";

buf +=  "<td rowspan=2><a href='/cgi-registry/localize/kids_airdates.cgi?title_id=CBDG' onMouseover=\"switchImg('tv', navimgpath + arrNavIconsOver[8] + '.gif'); return true\" onMouseout=\"switchImg('tv', navimgpath + arrNavIcons[8] + '.gif'); return true\"><img name='tv' src='" + navimgpath + arrNavIcons[8] + ".gif' width='82' height='72' border='0' alt='TV Schedule'></a></td>\n";
	buf += "</tr>\n";
	buf += "<tr>\n";
	buf += "</tr>\n";
	buf += "</table>\n";
	buf += "</td>\n";
	buf += "</tr>\n";
	buf += "</table>\n";
	
	document.write(buf);
}
