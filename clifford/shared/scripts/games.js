// arrays for game function

// ****** the following 3 arrays need to included on the actual page -- these are just examples
// var path = "../shared/images/games/tbone/clifford/";  // universal path to these images
// var arrImgNames = new Array("emily","tbone","clifford"); // names of images on page in img tags
// var arrImgFiles = new Array("emily_house", "tbone_house", "clifford_house");  // base names of image files
// ******
var arrImgBool = new Array(true, true, true); // sets up true rollover condition (false means images won't rollover any more)
var status = false; // status of game is false until correct answer is chosen and then changed to true

// game function which checks:
// (1) which image is checked (0, 1, 2)
// (2) is it being rolled-over (A), rolled-off (B), or clicked on (C);
// (3) is it the correct answer (true or false)
function rollClick(imgPicked, imgState, imgBool) {
	if (imgState == "A") { // change to rollover state if not clicked yet
		if (arrImgBool[imgPicked] == true) {
			changeImages(arrImgNames[imgPicked], path + arrImgFiles[imgPicked] + "-over.gif");
		}
	}
	if (imgState == "B") { // change back to regular state if not clicked yet
		if (arrImgBool[imgPicked] == true) {
			changeImages(arrImgNames[imgPicked], path + arrImgFiles[imgPicked] + ".gif");
		}
	}
	if (imgState == "C") { // changes to clicked-on state permanently and determines correct or wrong status
		arrImgBool[imgPicked] = false;
		if (imgBool == true) {
			changeImages(arrImgNames[imgPicked], path + arrImgFiles[imgPicked] + "-correct.gif");
			changeImages("title", path + "title_over.gif");
			status = true;
		} else {
			changeImages(arrImgNames[imgPicked], path + arrImgFiles[imgPicked] + "-wrong.gif");
		}
	}
}

// allows user to go to next game only after getting correct answer
function goNext(url) {
	if (status == true) {
		window.location = url;
	}
}

/*
**********
Example of how function is written into page:

<a href="javascript:rollClick(0,'C',false)" onmouseover="rollClick(0,'A',null)" onmouseout="rollClick(0,'B',null)"><img name="emily" src="../shared/images/games/tbone/clifford/emily_house.gif" border=0></a>

**********
*/

// constant game codes
var intScore = 0;
var nextPage = false;

// sets orig state of all images to false (not clicked)
var arrImgClickedBool = new Array(); 
for (i = 0; i < arrImg.length; i++) {
	arrImgClickedBool[i] = false;
}

function doCTGame(imgPicked, imgBool) {
	if (arrImgClickedBool[imgPicked] == false) { // hasn't been clicked on
		arrImgClickedBool[imgPicked] = true; // set clicked to true
		if (arrStatus[imgPicked] == true) { // if correct answer
			intScore++;
		}
		changeImages(arrImg[imgPicked], pathCT + arrImg[imgPicked] + "_over.gif"); // swaps image
		if (intScore == intCorrect) { // when all correct answers are clicked on
			changeImages("icon", pathMain + "clicktales/award.gif");
			changeImages("rarrow", pathMain + "clicktales/r_arrow-over.gif");
			nextPage = true;
			if (arrStatus[imgPicked] == true) {
				playSound(document.applets.goodjobplayer);
			}
		}
	}
}
					
// allows user to go to next game only after getting correct answer
function goNext(url) {
	if (nextPage == true) {
		window.location = url;
	}
}

// play sound function
function playSound(obj) {
	if(obj.test()) {
		obj.playsound();
	}
}