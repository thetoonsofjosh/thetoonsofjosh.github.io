// See RESTapi.js documentation 
//
// Include RESTapi.js
//



// data = {'name':'This is my playlist', 'rating':4}
PBSKIDS.playlist_api = new PBSKIDS.RESTapi('/go/apps/prefs/playlists.xml', '/go/apps/prefs/playlist/(\d+).xml');


// data = {'pid':'sw723kdsasd', 'playlist_id': 5, 'position':5}
// pid => The asset's Platform PID
// playlist_id => Internal playlist identifier
// position => The clips' position within the playlist
PBSKIDS.clip_api = new PBSKIDS.RESTapi('/go/apps/prefs/clips.xml', '/go/apps/prefs/clip/(\d+).xml');
