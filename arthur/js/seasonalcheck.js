var day,month,year;
var updatesArr={
	2016:['10/03/2016','11/01/2016','12/01/2016','01/03/2017'],
	2017:['10/02/2017','11/01/2017','12/01/2017','01/02/2018'],
	2018:['10/01/2018','11/01/2018','12/03/2018','01/02/2019'],
	2019:['10/01/2019','11/01/2019','12/02/2019','01/02/2020'],
	2020:['10/01/2020','11/02/2020','12/01/2020','01/05/2021'],
	2021:['10/01/2021','11/01/2021','12/01/2021','01/04/2022'],
	2022:['10/03/2022','11/01/2022','12/01/2022','01/03/2023'],
	2023:['10/02/2023','11/01/2023','12/01/2023','01/02/2024'],
	2024:['10/01/2024','11/01/2024','12/02/2024','01/02/2025'],
	2025:['10/01/2025','11/03/2025','12/01/2025','01/05/2026'],
	2026:['10/01/2026','11/02/2026','12/01/2026','01/04/2027']};

$(document).ready(function(){
	//check if time for seaonal updates
	//get current date
	var d = new Date();
	day = d.getDate();
	month = d.getMonth();
	year = d.getFullYear();

	var todayD = new Date(year,month,day);
	var halloweenStartDay = new Date(updatesArr[year][0]);
	var halloweenEndDay = new Date(updatesArr[year][1]);
	var holidayStartDay = new Date(updatesArr[year][2]);
	var holidayEndDay = new Date(updatesArr[year][3]);

	if(todayD>=halloweenStartDay && todayD<=halloweenEndDay)
	{
		seasonalUpdate="halloween";
		$('body').addClass('halloween');
		$('#topImg').attr("src","/arthur/i/nav/arthur_group_halloween.png");
		$('.home-index .group-img').attr('src','/arthur/i/illustration_block_halloween.png')
	}else{
		$('#topImg').attr("src","/arthur/i/nav/arthur_group.png");
		$('.home-index .group-img').attr('src','/arthur/i/illustration_block.png')
	}

	$('#topImg').css('visibility',"visible");

	if(todayD>=holidayStartDay && todayD<=holidayEndDay)
	{
		seasonalUpdate="holiday";
		$('body').addClass('holiday');
	}
});