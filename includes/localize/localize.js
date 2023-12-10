var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

if(!this.PBS) this.PBS = new Object();
if(!PBS.kids) PBS.kids = new Object();

PBS.kids.localize = (function() {
        var panel;
        var state = false;
        var zipcode = false;

        var noop = function(o) { alert("problem! " + o.statusText); return false; };

        var hideEl = function(el) {
            YAHOO.util.Dom.removeClass(el, "pbs-localize-visible");
            YAHOO.util.Dom.addClass(el, "pbs-localize-hidden");
        };
        var showEl = function(el) {
            YAHOO.util.Dom.removeClass(el, "pbs-localize-hidden");
            YAHOO.util.Dom.addClass(el, "pbs-localize-visible");
        };

        var initBody = function(o) {
            panel.setBody(o.responseText);
            panel.render(document.body);
            panel.show();
            if(o.argument) o.argument();
        };

        var setBody = function(file, postInitFunc) {
            var callback = { success: initBody,
                             failure: noop,
                             argument: postInitFunc };
            YAHOO.util.Connect.asyncRequest('GET', file, callback);
        };

        var displayStations = function(o) {
            var data = eval('(' + o.responseText + ')');

            hideEl(document.getElementById('pbs-where'));
            showEl(document.getElementById('pbs-stationlist'));

            var div = document.getElementById("stationlist");
            if(div.childNodes) {
                for(var i=div.childNodes.length - 1; i>=0; i--)
                    div.removeChild(div.childNodes[i]);
            }
            var top = document.createElement("img");
            top.src="/tvschedules/images/stationlist-top.gif";
            div.appendChild(top);

            var table = document.createElement("table");
            table.id="stationtable";

            for(var i=0; i<data.stations.length; i++) {
                var s = data.stations[i];
                var link = '<a href="" onClick="return PBS.kids.localize.setKidsCookie(\'' + s.tvdata_name + '\')">';

                var row = table.insertRow(i);

                var td;
                td = document.createElement("td");
                td.style.width="88px";
                td.innerHTML = link + '<img src="https://web.archive.org/web/20100329201809/http://pbskids.org/tvschedules/images/button-thisone.gif" width="88" height="26" alt="This One"></a>';
                row.appendChild(td);

                td = document.createElement("td");
                td.style.width="57px";
                td.innerHTML = link + '<img src="https://web.archive.org/web/20100329201809/http://www.pbs.org/images/stations/standard/' + s.tvdata_name + '.gif" width="57" height="47" alt="' + s.common_name + '"></a>';
                row.appendChild(td);

                td = document.createElement("td");
                td.style.width="57px";
                td.innerHTML = '<b>' + s.common_name + '</b> ' + s.city + ', ' + s.state;
                row.appendChild(td);

                // table.appendChild(row);
            }
            div.appendChild(table);

            var bot = document.createElement("img");
            bot.src="/tvschedules/images/stationlist-bottom.gif";
            div.appendChild(bot);
        };

        var lookupStation = function(args) {
            YAHOO.util.Connect.asyncRequest('GET', "/cgi-registry/stationfinder/api.pl?" + args, { success: displayStations, failure: noop });
            return false;
        };

        return {

            setKidsCookie: function(station) {
                var url = "/cgi-registry/localize/find_station?";
                var args = "step=done&edit_st=y&dest=" + escape(window.location.pathname) + "&relocalize=y";
                args = args + "&station=" + escape(station);
                if(state) args = args + "&state=" + state;
                if(zipcode) args = args + "&zipcode=" + zipcode;
                window.location = url + args;
                return false;
            },

            goBack: function() { 
                showEl(document.getElementById('pbs-where'));
                hideEl(document.getElementById('pbs-stationlist'));
            },

            close: function() { panel.hide(); },
            lookupState:   function(statearg)   { state=statearg;     return lookupStation("state=" + statearg); },
            lookupZipcode: function(zipcodearg) { zipcode=zipcodearg; return lookupStation("zipcode=" + zipcodearg); },
            open:
            function() {
                if(!panel) {
                    YAHOO.util.Dom.addClass(document.body, "yui-skin-sam");
                    panel = new YAHOO.widget.Panel("pbs-localize-panel", { width:"700px", height: "440px", visible: true, draggable: false, close: false, fixedcenter: true, modal: true, constraintoviewport: true });
                    setBody("/includes/localize/localize-body.html");
                } else {
                    showEl(document.getElementById('pbs-where'));
                    hideEl(document.getElementById('pbs-stationlist'));
                    panel.show();
                }
            }
        };
})();


}
