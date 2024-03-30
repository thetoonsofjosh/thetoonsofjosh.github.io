

var config = [];

steal('/includes/javascript/sites/v2.2/pbskids.js').
    then('https://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js').
    then('/includes/javascript/jquery.cookie.js').
    then('/includes/javascript/mobile-redirection.js').
    then('/includes/footer/pk-footer.js').
    then('/games/js/global.js').
    then('/includes/pk-sponsor/campaigns.js').
    then('/includes/pk-sponsor/campaign-sampler.js').
    then('/includes/pk-sponsor/pk-sponsor-scripts.js').
    then('/includes/javascript/bridge.urls.js').
    then('/includes/javascript/bridge.js');


