function pbs_toggle_language(language){
    if (language == 'english'){
        document.getElementById('reading-activity-calendar-module').style.display = 'block';
        document.getElementById('reading-activity-calendar-module-esp').style.display = 'none';
    }
    else if (language == 'spanish'){
        document.getElementById('reading-activity-calendar-module-esp').style.display = 'block';
        document.getElementById('reading-activity-calendar-module').style.display = 'none';
    }
}

function pbs_reading_calendar_module(){
    var imageurl = 'http://pbskids.org/read/images/calendar/';
    var images = ['abc-blocks.gif', 'red-wagon.gif', 'goodjob.gif', 'book-blocks.gif', 'book-tree-dog.gif', 'abc-blocks.gif']
    var ipick = Math.floor(Math.random()*6)
    var title = 'Reading Activity Calendar';
    var month = 'December';
    var day = '2';
    var link = 'http://soup.pbskids.org/read/activities/calendar/';
    var link_esp = 'http://soup.pbskids.org/read/activities/calendar/index.html?sp';
    var link_text = 'Check out our year-round reading activity calendar at the PBS KIDS Island';
    var link_text_esp = 'Visite a PBS KIDS Island para encontrar más actividades de la lectura en nuestro calendario';
    var activity_title = 'Handwashing Awareness Week'
    var description = 'Walk your child through a good hand wash, talking about each step as you go, from turning on the faucet, using soap, working up a lather, and rinsing off.' 
    var activity_title_esp = 'La Semana dedicada a saber cómo lavarse las manos'
    var description_esp = 'Explíquele a su hijo cómo debe lavarse sus manos y demuéstrele cómo hacerlo paso a paso; enséñele también a abrir la llave de agua, a enjabonar sus manos y a enjuagarlas.' 

    // create top element
    var top = document.createElement('span');
    top.id = 'reading-activity-calendar-module';
    var top_h4 = document.createElement('h4');
    top_h4.innerHTML=title;
    var top_h5 = document.createElement('h5');
    top_h5.innerHTML = <test>month + '<br /><span class="date">' + day + '</span>';

    // create side element
    var side = document.createElement('div');
    side.setAttribute('class','side');
    var image = document.createElement('img');
    image.src = imageurl + images[ipick]; 
    image.width = '97'; 
    image.height = '96'; 
    side.appendChild(top_h5);
    side.appendChild(image);

    // create main element
    var main = document.createElement('div');
    main.innerHTML = '<p><strong>' + activity_title + '.</strong> ' + description + '</p><p class="calendar-link"><a href="' + link +'">' + link_text + '</a></p><input type="button" value="En Espa&ntilde;ol" onclick="pbs_toggle_language(\'spanish\')">';
    // assemble
    top.appendChild(top_h4);
    top.appendChild(side);
    top.appendChild(main);

    // create top spanish element
    var top_esp = document.createElement('span');
    top_esp.style.display='none';
    top_esp.id = 'reading-activity-calendar-module-esp';
    var top_h4_esp = document.createElement('h4');
    top_h4_esp.innerHTML=title;
    var top_h5_esp = document.createElement('h5');
    top_h5_esp.innerHTML = month + '<br /><span class="date">' + day + '</span>';

    // create side spanish element
    var side_esp = document.createElement('div');
    var image_esp = document.createElement('img');
    image_esp.src = imageurl + images[ipick]; 
    image_esp.width = '97'; 
    image_esp.height = '96'; 
    side_esp.setAttribute('class','side');
    side_esp.appendChild(image_esp);

    // create main element
    var main_esp = document.createElement('div');
    main_esp.innerHTML = '<p><strong>' + activity_title + '.</strong> ' + description_esp + '</p><p class="calendar-link"><a href="' + link_esp + '">' + link_text_esp + '</a></p><input type="button" value="In English" onclick="pbs_toggle_language(\'english\')">';

    // assemble
    top_esp.appendChild(top_h4_esp);
    top_esp.appendChild(side_esp);
    top_esp.appendChild(top_h5_esp);
    top_esp.appendChild(main_esp);

    var the_div = document.getElementById("pbs-reading-calendar-module");
    the_div.appendChild(top);
    the_div.appendChild(top_esp);

    //var scripts = document.body.getElementsByTagName('script');
    //for (var i=0; i < scripts.length; i++){
    //    scripts[i].parentNode.appendChild(top);
    //    scripts[i].parentNode.appendChild(top_esp);
    //    scripts[i].parentNode.removeChild(scripts[i]);
    //}
}
document.body.onDomReady=pbs_reading_calendar_module();
