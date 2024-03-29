/*
  Generic interface for a REST api. 

  Use:

  *  PBSKIDS.RESTapi(resources_url, resource_url_pattern)

     Creates an instance of the api. resource_url_pattern is a regex specifying the url of a single resource.

  * api methods:

     1) read(id, dataType); read_many(dataType)

        dataType is the response mimetype (xml, json)

     2) create(data, dataType)

        data is an object containing the POST data to be submitted.

     3) update(id, data, dataType)

     4) delete(id, dataType)

     5) delete_nonrest(id, dataType, postData)

	In case DELETE method is not available
	
  *  when the request is complete, it will populate either the 'response' or 'error_response' propery of the api object.

  * Dependencies: 
         jquery-1.4.1min.js
         jquery.cookie.js         

  *  Sample code:
  
    <script type="text/javascript" src="/media/js/jquery/jquery-1.4.1.min.js"></script>
    <script type="text/javascript" src="/media/js/jquery/jquery.cookie.js"></script>
    <script type="text/javascript" src="/media/js/RESTapi.js"></script>
    <script type="text/javascript" src="/media/js/playlists.js"></script>

    <script type="text/javascript">
    var api = PBSKIDS.playlist_api;
    var response;
    data = {name : 'Cosimo's awesome videos'};
    api.create_playlist(data, 'json');

    if(!api.error_response){
        response = api.response;    
        //Do whatever with response (JSON object)
    }
    else{
        response = api.error_response;
       //Handle error
    }
    </script>
*/

if (!this.PBSKIDS){
    PBSKIDS = {};
};


PBSKIDS.RESTapi = function(resources_url, resource_url_pattern){

    var _resources_url = resources_url;
    var _resource_url_pattern = resource_url_pattern;

    var _api = this;

    var _set_cookies = function(request){
	var _username = $.cookie('pbskids.username');
	var _userid = $.cookie('pbskids.userid');
	request.setRequestHeader('Cookie', 'pbskids.username=' + _username + '; pbskids.userid=' + _userid);
    }

    var _set_resources_url = function(dataType){
	return _resources_url.replace(/\.[^\.]+$/, '.' + dataType);
    }

    var _set_resource_url = function(id, dataType){
	var resource_url = _resource_url_pattern.replace(/\(.*\)/, id);
        var query_string = resource_url.match(/\?.*$/);
	query_string = query_string ? query_string : '';
	return resource_url.replace(/\.[^\.]+$/, '.' + dataType + query_string);
    }

    this.response = undefined;
    this.error_response = undefined;

    this.response_handler = function(success_code, dataType){
	var _success_code  =  success_code;
	var _handler = function(request, status){
	    if (request.status == _success_code){
	        if (dataType == 'xml'){ 
	            _api.response = request.responseXML;
	        }
	        else{
	            _api.response = request.responseText;
	        } 	
		_api.error_response = undefined;
	    }
	    else{
		_api.error_response = request.responseText;
		_api.response = undefined;
	    }	    
	}
	return _handler;
    };

    this.read = function(dataType, id){
	var dataType = dataType ? dataType : 'json';
	if(id){
		_url = _set_resource_url(id, dataType);
	}
	else{
		_url = _set_resources_url(dataType);
	}
	$.ajax({
	    type: 'GET',
	    dataType: dataType,
	    url: _url,
	    async: false,
	    complete: _api.response_handler('200', dataType),
	    beforeSend: _set_cookies
	})
    };

    this.read_many = function(dataType){
	var dataType = dataType ? dataType : 'json';
	$.ajax({
	    type: 'GET',
	    dataType: dataType,
	    url: _set_resources_url(dataType),
	    async: false,
	    complete: _api.response_handler('200', dataType),
	    beforeSend: _set_cookies
	})
    };

    this.create = function(data, dataType, id){
	var dataType = dataType ? dataType : 'json';
	if(id){
		_url = _set_resource_url(id, dataType);
	}
	else{
		_url = _set_resources_url(dataType);
	}

	$.ajax({
	    type: 'POST',
	    dataType: dataType,
	    data: data,
	    url: _url,
	    async: false,
	    complete: _api.response_handler('200', dataType),
	    beforeSend: _set_cookies
	});
    };

    this.update = function(id, data, dataType){
	var dataType = dataType ? dataType : 'json';
	$.ajax({
	    type: 'PUT',
	    dataType: dataType,
	    data: data,
	    url: _set_resource_url(id, dataType),
	    async: false,
	    complete: _api.response_handler('200', dataType),
	    beforeSend: _set_cookies
	})
    };

    this.del =  function(id, dataType){

	var dataType = dataType ? dataType : 'xml';
	$.ajax({
	    type: 'DELETE',
	    dataType: dataType,
	    url: _set_resource_url(id, dataType),
	    context : PBSKIDS.playlists_api,
	    async: false,
	    complete: _api.response_handler('204', dataType),
	    beforeSend: _set_cookies
	})
    }

    this.delete_nonrest =  function(id, dataType, postData){

	if (postData){
		postData['delete'] = true;
	}
	else{
		postData = {'delete':true};
	}	

	var dataType = dataType ? dataType : 'xml';
	$.ajax({
	    type: 'POST',
	    dataType: dataType,
	    url: _set_resource_url(id, dataType),
	    data: postData,
	    async: false,
	    complete: _api.response_handler('204'),
	    beforeSend: _set_cookies
	})
    }
}



