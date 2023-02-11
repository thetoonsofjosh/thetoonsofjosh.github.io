

var config = [];

steal('http://www-tc.pbskids.org/includes/javascript/sites/v2.2/pbskids.js').
    then('http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js').
    then('http://www-tc.pbskids.org/includes/javascript/jquery.cookie.js').
    then('http://www-tc.pbskids.org/includes/javascript/mobile-redirection.js').
    then('http://www-tc.pbskids.org/includes/footer/pk-footer.js').
    then('http://www-tc.pbskids.org/games/js/global.js').
    then('http://www-tc.pbskids.org/includes/pk-sponsor/campaigns.js').
    then('http://www-tc.pbskids.org/includes/pk-sponsor/campaign-sampler.js').
    then('http://www-tc.pbskids.org/includes/pk-sponsor/pk-sponsor-scripts.js').
    then('http://www-tc.pbskids.org/includes/javascript/bridge.urls.js').
    then('http://www-tc.pbskids.org/includes/javascript/bridge.js');


