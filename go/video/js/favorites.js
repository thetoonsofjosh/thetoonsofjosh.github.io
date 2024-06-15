// JavaScript Document

//== ADD/DELETE/READ FAVORITES ===============================
var PBSKIDSGO = PBSKIDSGO||{};
PBSKIDSGO.pl_api = PBSKIDS.playlist_api;
PBSKIDSGO.cl_api = PBSKIDS.clip_api;

PBSKIDSGO.addClip = function(pid, playlist_id)
{
	var clip_data = {'pid' : pid, 'playlist_id': playlist_id};
	PBSKIDSGO.cl_api.create(clip_data, 'json');
	if (PBSKIDSGO.cl_api.response) return PBSKIDSGO.cl_api.response;
	else return false;
}

PBSKIDSGO.addPlaylist = function(name)
{
	var playlist_data = {'name': name};
	PBSKIDSGO.pl_api.create(playlist_data, 'json');
	if (PBSKIDSGO.pl_api.response) return PBSKIDSGO.pl_api.response;
	else return false;
}
					
PBSKIDSGO.deleteClip = function(clip_id)
{
	PBSKIDSGO.cl_api.delete_nonrest(clip_id, 'json', {'playlist_id':-1, 'pid':-1});
	if (!PBSKIDSGO.cl_api.error_response) return true;
	else return false;
	
}                
				
