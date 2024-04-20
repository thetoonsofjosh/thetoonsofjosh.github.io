(function(require, define) {

    define('activity-tracker', ['utils', 'messages', 'queueingLibrary2',
        'simple-storage', 'jquery', 'super-vision', 'login'], function(utils, Messages, QueueingLibrary, SimpleStorage, jquery, SupervisionClient) {
           
        //If activity tracker js is already loaded return the object.
        if(PBS.KIDS.activity_tracker)
            return PBS.KIDS.activity_tracker;

        PBS.KIDS.activity_tracker = {};
        var batchSize = 1;
        var keyPrefix = 'PBS_KIDS_activity_tracker_'
        var eventServiceUrl = 'http://progresstracker.pbskids.org:8000/progresstracker/api/v2/activities/events.json';
        if (window.location.host == 'excelsoft.pbskids.org') eventServiceUrl = 'http://excelsoft.pbskids.org/api/v2/activities/events.json';
        var queue = QueueingLibrary.init(batchSize, keyPrefix, eventServiceUrl);
        var anonymousUserID = utils.uuid();
         
        Messages.init(); //Initialize message capturing
         
        var messages_to_capture = {
            'pbskids.messages.games' : '',
            'pbskids.messages.video' : ''
            // 'pbskids.messages.site' : ''
        };
           
        var started = false;
        var on_activity_message = function(message, data){
            var send_event = function(message,data) {
                var event = {};
                event.activity_id = message;
                event.activity_guid = data.guid;
                event.content_guid = data.content_guid;
            
                var users = PBS.KIDS.identity.getCurrentUsers();
                event.user_ids = [];

                for(var i = 0; i < users.length; i++){
                    event.is_logged_in = users[i].isloggedin;
                    if (event.is_logged_in) {
                        event.user_ids[i] = users[i].userid;
                    } else {
                        event.user_ids[i] = anonymousUserID;
                    }
                }

                event.kid_label_guid = (SupervisionClient.sync_state ? SupervisionClient.sync_state.default_kid_label : '');
                event.timestamp = (new Date()).getTime();
                event.platform_id = utils.platformIdentify.browser;
                event.device_id = utils.platformIdentify.OS;

                var channel_metadata = SimpleStorage.get('channel-metadata');

                if (!!channel_metadata) {
                    event.channel_id = channel_metadata['channel_id'];
                } else {
                    event.channel_id = '';
                }
                   
                event.event_data = data;
                queue.pushEvent(event);
            };

            if (!SupervisionClient.sync_state) {
                return;
            }

            if(data instanceof Array) {
                for(var i=0;i<data.length;i++) {
                    send_event(message,data[i]);
                }
            } else {
                send_event(message,data);
            }
        }
           
        PBS.KIDS.activity_tracker.start = function() {
            if(started) return;
            queue.enable();
            for(var message in messages_to_capture) {
                messages_to_capture[message] = Messages.subscribe(message, on_activity_message, true);
            }
            started = true;
           
        }
           
        PBS.KIDS.activity_tracker.stop = function() {
            if(!started) return;
            queue.disable();
            for(var message in messages_to_capture) {
                Messages.unsubscribe(messages_to_capture[message]);
            }
            started = false;
        }
           
        return PBS.KIDS.activity_tracker;
});
    
}(PBS.KIDS.require, PBS.KIDS.define));
