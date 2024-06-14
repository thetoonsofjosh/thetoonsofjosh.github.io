var config = [];

steal('/includes/javascript/sites/v2.2/pbskids.js').
    then('https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js').
    then('/includes/javascript/jquery.cookie.js').
    //[ START VIDEO ]
    then('/pbsk/video/lib/jquery.pbskidsvideo.min-latest.js').
    then('/go/js/scripts-video.js').
    //[ END VIDEO ]
    then('/includes/javascript/bridge.urls.js').
    then('/includes/javascript/bridge.js').
    then('/go/js/jqxcore.js').
    then('/go/js/jqxbuttons.js').
    then('/go/js/jqxscrollbar.js').
    then('/go/js/jquery.bxslider.min.js').
    then('/go/js/scripts.js');
