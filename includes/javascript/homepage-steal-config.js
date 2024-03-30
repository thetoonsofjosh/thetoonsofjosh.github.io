

var config = [];

steal('https://www-tc.pbskids.org/includes/javascript/sites/v2.2/pbskids.js').
    then('https://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js').
    then('https://www-tc.pbskids.org/includes/javascript/jquery.cookie.js').
    then('https://www-tc.pbskids.org/includes/javascript/mobile-redirection.js').
    then('https://www-tc.pbskids.org/includes/footer/pk-footer.js').
    then('https://www-tc.pbskids.org/games/js/global.js').
    then('https://www-tc.pbskids.org/includes/pk-sponsor/campaigns.js').
    then('https://www-tc.pbskids.org/includes/pk-sponsor/campaign-sampler.js').
    then('https://www-tc.pbskids.org/includes/pk-sponsor/pk-sponsor-scripts.js').
    then('https://www-tc.pbskids.org/includes/javascript/bridge.urls.js').
    then('https://www-tc.pbskids.org/includes/javascript/bridge.js');


