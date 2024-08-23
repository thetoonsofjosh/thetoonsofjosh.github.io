var AudioDelay = 500;

function hintPopup(page) {
	//alert(page);
	lastwin = window.open(page, "hintPopup", "width=400,height=300,scrollbars=yes,resizable=yes");
	setTimeout("lastwin.focus();", 200);
}

function hintAll() {
	lastwin = window.open("/clifford/kids/hints/hint_all.html", "hintPopup", "width=620,height=400,scrollbars=yes,resizable=yes");
	setTimeout("lastwin.focus();", 200);
}

function trueReturn () { return true; }

// DefaultImage(0, "name", "image");

function DefaultImage(theAnchor, theName, theImage) {
	noSwap = theName;
	
	// var num = document.anchors.length;
	// for (i = 0; i < num; i++) {
	// 	if ((typeof document.anchors[i].name == "string") && (document.anchors[i].name == theName))
	// 		break;
	// }
	//document.anchors[theAnchor].href = "#";

	document[theName].src = theImage;
}

function newImage(arg) {
	if (document.images) {
		rslt = new Image();
		rslt.src = arg;
		return rslt;
	}
}

function changeImages() {
	if (document.images && (preloadFlag == true)) {
		for (var i = 0; i < changeImages.arguments.length; i += 2) {
			if ((typeof noSwap == "string") && (noSwap == changeImages.arguments[i]))
				;
			else
				document[changeImages.arguments[i]].src = changeImages.arguments[i + 1];
		}
	}
}

gameFlag1 = false;
gameFlag2 = false;

function gameSetFlag(num) {
	eval("gameFlag" + num + " = true;");
}

function gameChangeImages(num) {
	if (document.images && (preloadFlag == true) && (eval("gameFlag" + num) != true)) {
		for (var i = 1; i < gameChangeImages.arguments.length; i += 2) {
			document[gameChangeImages.arguments[i]].src = gameChangeImages.arguments[i + 1];
		}
	}
}

function preloadNav() {
	gameFlag = false;
	globalnav_01_over = newImage("/clifford/images/botnav/globalnav_01-over.gif");
	globalnav_02_over = newImage("/clifford/images/botnav/globalnav_02-over.gif");
	globalnav_03_over = newImage("/clifford/images/botnav/globalnav_03-over.gif");
	globalnav_04_over = newImage("/clifford/images/botnav/globalnav_04-over.gif");
	globalnav_05_over = newImage("/clifford/images/botnav/globalnav_05-over.gif");
	globalnav_06_over = newImage("/clifford/images/botnav/globalnav_06-over.gif");
	globalnav_07_over = newImage("/clifford/images/botnav/globalnav_07-over.gif");
}

function preloadCliff() {
	clifford_index_02_over = newImage("/clifford/images/helpcliff/index/clifford_index_02-over.gif");
	clifford_index_08_over = newImage("/clifford/images/helpcliff/index/clifford_index_08-over.gif");
	clifford_index_12_over = newImage("/clifford/images/helpcliff/index/clifford_index_12-over.gif");
	clifford_index_17_over = newImage("/clifford/images/helpcliff/index/clifford_index_17-over.gif");
	clifford_index_19_over = newImage("/clifford/images/helpcliff/index/clifford_index_19-over.gif");

	cliff_kiss_02_over = newImage("/clifford/images/helpcliff/innernav/cliff_kiss_02-over.gif");
	cliff_kiss_04_over = newImage("/clifford/images/helpcliff/innernav/cliff_kiss_04-over.gif");
	cliff_kiss_06_over = newImage("/clifford/images/helpcliff/innernav/cliff_kiss_06-over.gif");
	cliff_kiss_07_over = newImage("/clifford/images/helpcliff/innernav/cliff_kiss_07-over.gif");

	cliff_slide_02_over = newImage("/clifford/images/helpcliff/innernav/cliff_slide_02-over.gif");
	cliff_slide_04_over = newImage("/clifford/images/helpcliff/innernav/cliff_slide_04-over.gif");
	cliff_slide_06_over = newImage("/clifford/images/helpcliff/innernav/cliff_slide_06-over.gif");
	cliff_slide_07_over = newImage("/clifford/images/helpcliff/innernav/cliff_slide_07-over.gif");

	cliff_helpcliff_easy_02_over = newImage("/clifford/images/helpcliff/innernav/cliff_helpcliff_easy_02-ove.gif");
	cliff_helpcliff_easy_03_over = newImage("/clifford/images/helpcliff/innernav/cliff_helpcliff_easy_03-ove.gif");
	cliff_helpcliff_easy_04_over = newImage("/clifford/images/helpcliff/innernav/cliff_helpcliff_easy_04-ove.gif");
	cliff_helpcliff_easy_06_over = newImage("/clifford/images/helpcliff/innernav/cliff_helpcliff_easy_06-ove.gif");
	cliff_helpcliff_easy_08_over = newImage("/clifford/images/helpcliff/innernav/cliff_helpcliff_easy_08-ove.gif");
	cliff_helpcliff_easy_09_over = newImage("/clifford/images/helpcliff/innernav/cliff_helpcliff_easy_09-ove.gif");
	cliff_helpcliff_hard_02_over = newImage("/clifford/images/helpcliff/innernav/cliff_helpcliff_hard_02-ove.gif");
	cliff_helpcliff_hard_03_over = newImage("/clifford/images/helpcliff/innernav/cliff_helpcliff_hard_03-ove.gif");
	cliff_helpcliff_hard_04_over = newImage("/clifford/images/helpcliff/innernav/cliff_helpcliff_hard_04-ove.gif");
	cliff_helpcliff_hard_06_over = newImage("/clifford/images/helpcliff/innernav/cliff_helpcliff_hard_06-ove.gif");
	cliff_helpcliff_hard_08_over = newImage("/clifford/images/helpcliff/innernav/cliff_helpcliff_hard_08-ove.gif");
	cliff_helpcliff_hard_09_over = newImage("/clifford/images/helpcliff/innernav/cliff_helpcliff_hard_09-ove.gif");
}

function preloadBTS() {
	topnav_clifford_over = newImage("/clifford/images/bts/bts_kidshome-over.gif");
	scenes_innernav_02_over = newImage("/clifford/images/bts/innernav/scenes_innernav_02-over.gif");
	scenes_innernav_03_over = newImage("/clifford/images/bts/innernav/scenes_innernav_03-over.gif");
	scenes_innernav_04_over = newImage("/clifford/images/bts/innernav/scenes_innernav_04-over.gif");
	scenes_innernav_05_over = newImage("/clifford/images/bts/innernav/scenes_innernav_05-over.gif");
}

function preloadTbone() {
	topnav_clifford_over = newImage("/clifford/images/ttown/houses/tbone_kidshome-over.gif");
	tbone_innernav_02_over = newImage("/clifford/images/ttown/innernav/tbone_innernav_02-over.gif");
	tbone_innernav_03_over = newImage("/clifford/images/ttown/innernav/tbone_innernav_03-over.gif");
	tbone_innernav_04_over = newImage("/clifford/images/ttown/innernav/tbone_innernav_04-over.gif");
	tbone_innernav_05_over = newImage("/clifford/images/ttown/innernav/tbone_innernav_05-over.gif");
	tbone_innernav_06_over = newImage("/clifford/images/ttown/innernav/tbone_innernav_06-over.gif");
	tbone_innernav_07_over = newImage("/clifford/images/ttown/innernav/tbone_innernav_07-over.gif");
	tbone_innernav_09_over = newImage("/clifford/images/ttown/innernav/tbone_innernav_09-over.gif");
}

function preloadCleo() {
	topnav_clifford_over1 = newImage("/clifford/images/cleo/ball/cleo_kidshome_ball.gif");
	topnav_clifford_over2 = newImage("/clifford/images/cleo/bones/cleo_kidshome_bone.gif");
	topnav_clifford_over3 = newImage("/clifford/images/cleo/stache/cleo_kidshome_stach.gif");
	topnav_clifford_over4 = newImage("/clifford/images/cleo/sundae/cleo_kidshome_sun.gif");
	topnav_clifford_over5 = newImage("/clifford/images/cleo/cleo_kidshome_hat.gif");
	topnav_clifford_over6 = newImage("/clifford/images/cleo/sweat/cleo_kidshome_sweat.gif");
	cleo_innernav_02_over = newImage("/clifford/images/cleo/innernav/cleo_innernav_02-over.gif");
	cleo_innernav_03_over = newImage("/clifford/images/cleo/innernav/cleo_innernav_03-over.gif");
	cleo_innernav_04_over = newImage("/clifford/images/cleo/innernav/cleo_innernav_04-over.gif");
	cleo_innernav_05_over = newImage("/clifford/images/cleo/innernav/cleo_innernav_05-over.gif");
	cleo_innernav_06_over = newImage("/clifford/images/cleo/innernav/cleo_innernav_06-over.gif");
	cleo_innernav_07_over = newImage("/clifford/images/cleo/innernav/cleo_innernav_07-over.gif");
	cleo_innernav_09_over = newImage("/clifford/images/cleo/innernav/cleo_innernav_09-over.gif");
}

function preloadEmily() {
	topnav_clifford_over = newImage("/clifford/images/emily/ee_kidshome-over.gif");
	emily_innernav_02_over = newImage("/clifford/images/emily/innernav/emily_innernav_02-over.gif");
	emily_innernav_03_over = newImage("/clifford/images/emily/innernav/emily_innernav_03-over.gif");
	emily_innernav_04_over = newImage("/clifford/images/emily/innernav/emily_innernav_04-over.gif");
	emily_innernav_06_over = newImage("/clifford/images/emily/innernav/emily_innernav_06-over.gif");
}

function preloadIslanders() {
	topnav_clifford_over = newImage("/clifford/images/islanders/islanders_kidshome.gif");
	island_innernav_02_over = newImage("/clifford/images/islanders/innernav/island_innernav_02-over.gif");
	island_innernav_03_over = newImage("/clifford/images/islanders/innernav/island_innernav_03-over.gif");
	island_innernav_04_over = newImage("/clifford/images/islanders/innernav/island_innernav_04-over.gif");
	island_innernav_06_over = newImage("/clifford/images/islanders/innernav/island_innernav_06-over.gif");
}

function preloadPostcards() {
	post_kidshome_over = newImage("/clifford/images/postcards/post_kidshome-over.gif");
}

function preloadPreview() {
	post_kidshome_over = newImage("/clifford/images/view/view_kidshome-over.gif");
}

function preloadIndex() {
	gameFlag = false;
	home_ear_over = newImage("/clifford/homeimages/home_ear-over.gif");
	home_clifford_over = newImage("/clifford/homeimages/home_clifford-over.gif");
	home_text_over = newImage("/clifford/homeimages/home_text-over.gif");
	home_text_over013 = newImage("/clifford/homeimages/home_text-over-13.gif");
	home_text_over014 = newImage("/clifford/homeimages/home_text-over-14.gif");
	home_text_over015 = newImage("/clifford/homeimages/home_text-over-15.gif");
	home_text_over016 = newImage("/clifford/homeimages/home_text-over-16.gif");
	home_islanders_over = newImage("/clifford/homeimages/home_islanders-over.gif");
	home_emily_over = newImage("/clifford/homeimages/home_emily-over.gif");
	home_cleo_over = newImage("/clifford/homeimages/home_cleo-over.gif");
	home_cleo2_over = newImage("/clifford/homeimages/home_cleo2-over.gif");
	home_tbone_over = newImage("/clifford/homeimages/home_tbone-over.gif");
}

function playSound(obj) {
	if (preloadFlag && (gameFlag != true)) {
		if(obj.test()) {
			obj.playsound();
		}
	}
}

function stopSound(obj) {
        if (preloadFlag) {
                if(obj.test()) {
                        obj.stop();
                }
        }
}
