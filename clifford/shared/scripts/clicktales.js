
function playSound(obj) {
    
	if (document.images) {
		if(obj.test()) {
			obj.playsound();
		}
	}
}

var intScore = 0;
var intCorrect = 2;
var nextPage = false;
var arrImg("rose","key","rose","string","kiss","balloon");
var arrImgClickedBool = new Array(false, false, false, false, false); // 

function doCTGame(imgPicked, imgBool) {
		if (arrImgClickedBool[imgPicked] == false) { //hasn't been clicked on
			arrImgClickedBool[imgPicked] == true; //set clicked to true
			if (imgBool == true) { //if correct answer
				intScore++;
				}
				changeImages(arrImg[imgPicked], path + arrImg[imgPicked] + "_over.gif"); //switches image
				
				if (intScore == intCorrect) { //when all correct answers are clicked on
					changeImages("circle","path");
					changeImages("arrow","../shared/arrow/test.gif");
					var nextPage = true;
					}
					playSound(obj);
			}
		}
					



// allows user to go to next game only after getting correct answer
function goNext(url) {
	if (nextPage == true) {
		window.location = url;
	}
}
