if( PBS.KIDS.campaigns.length > 0 ) {

	var campaign_cookie = $.cookie('pbskids.campaign');
	var preview = /preview\/(home|video)\/([^\/]*)\//.exec(window.location.pathname);

	if (campaign_cookie && (!preview)){
		for (var i=0; i < PBS.KIDS.campaigns.length; i++){
			if(campaign_cookie == PBS.KIDS.campaigns[i].slug){
				PBS.KIDS.campaign = PBS.KIDS.campaigns[i];
			}
		}
		if (campaign_cookie == '_blank_'){
				PBS.KIDS.campaign = {};
		}		
	}
	else{
		var index = Math.floor(Math.random() * PBS.KIDS.campaigns.length);
		PBS.KIDS.campaign = PBS.KIDS.campaigns[index];
		if($.isEmptyObject(PBS.KIDS.campaign)){
			campaign_cookie = '_blank_'
		}
		else{
			campaign_cookie = PBS.KIDS.campaign.slug;
		}

		if(!preview){
			$.cookie('pbskids.campaign', campaign_cookie, { domain: '/', path: '/' });
		}
	}	
}
else {
	PBS.KIDS.campaign = {};
}
