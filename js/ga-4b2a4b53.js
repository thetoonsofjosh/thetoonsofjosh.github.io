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

if(!this.GA_delay_logging){this.GA_delay_logging=0}if(!this.GA_additional_codes){this.GA_additional_codes={}}if(!this.GA_url_prefix){this.GA_url_prefix=false}if(!this.GA_setvar){this.GA_setvar={}}var GA_obj=function(){var K=new Object();var E={uacode:false,pageTracker:false,eventTracker:[]};var M=location.hostname;if(M.length-M.lastIndexOf(".pbs.org")==8){M=".pbs.org"}var F=location.pathname;if(GA_url_prefix){F=GA_url_prefix+location.pathname}if(location.search){F=F+location.search}var L=function(S){var R=_gat._getTracker("UA-1-1");R._setDomainName(M);R._setAllowHash(false);R._setAllowLinker(true);if(!S){S={localized:0}}var Q=["localized","station"];var N="";for(var P=0;P<Q.length;P++){if(S[Q[P]]!=undefined){N=N+"/"+Q[P]+"="+S[Q[P]]}}for(var O in GA_setvar){if(GA_setvar[O]!=undefined){N=N+"/"+O+"="+GA_setvar[O]}}R._setVar(N)};var A=function(O){var N=_gat._getTracker(O);N._setDomainName(M);N._setAllowHash(false);N._setAllowLinker(true);N._trackPageview(F);return N};var J=function(R,S){if(!S){if(typeof GA_env=="string"){S={ua_list:GA_env,oldFormat:1};var T=document.cookie;var U=T.indexOf("pbsol.station=");if(U!=-1){S.vars={localized:1,station:T.substr(U+14,4)}}}else{S=GA_env}}L(S.vars);var Q=["r","s","pr","pm"];var O=S.ua_list.split(",");for(var P=0;P<O.length;P++){var T=O[P];if(T.substring(0,3)=="UA-"){K[Q.shift()]=A(T)}else{if(T.substring(0,3)=="ET-"){E.uacode=T.replace(/^ET-/,"UA-");E.pageTracker=A(E.uacode)}}}for(var V in GA_additional_codes){if(!K[V]){var N=A(GA_additional_codes[V]);K[V]=N}}if(S.oldFormat){K.r._trackEvent("Debug","Old GA_env",document.location.pathname)}B()};var B=function(){if(document.getElementsByTagName){var S=document.getElementsByTagName("a");for(var P=0;P<S.length;P++){var N=S[P];if(N.href==""){continue}if(N.href.match(/^javascript:/i)){continue}var O=N.hostname;if(O=="pbs.org"){O="www.pbs.org"}if(O=="www.pbskids.org"){O="pbskids.org"}var Q=location.hostname;if(Q=="dipsy.pbs.org"&&O=="www.pbs.org"){continue}if(Q=="soup.pbskids.org"&&O=="pbskids.org"){continue}if(O==Q){var R=N.pathname;if(R.match(/\.(doc|xls|exe|zip|pdf|mov|mp3)$/)){H(N,"click",I)}}else{if(O){H(N,"click",G)}}}}};var H=function(O,P,N){if(O.addEventListener){O.addEventListener(P,N,false)}else{if(O.attachEvent){O.attachEvent("on"+P,N)}}};var I=function(O){var N=O?O.target.pathname:"/"+window.event.srcElement.pathname;if(N){D("Links","Download",N)}return true};var G=function(P){var N;var O=P.srcElement;if(O&&O.hostname){N=O.hostname+"/"+O.pathname+O.search}else{if(this.hostname){N=this.hostname+this.pathname+this.search}}if(N){D("Links","External",N)}return true};var D=function(O,Q,N,P){if(!E.uacode){return false}E.pageTracker._trackEvent(O,Q,N,P)};var C=function(N){for(var O in K){if(K[O] instanceof Object&&K[O]._trackPageview){K[O]._trackPageview(N)}}};if(!GA_delay_logging&&GA_env){H(window,"load",J)}return{ga_url:F,_getTracker:function(N){if(K[N]){return K[N]}else{if(N.match(/^UA-\d+-\d+$/)){return _gat._getTracker(N)}else{return false}}},_runInit:function(){J()},trackEvent:function(Q,P,N,O){D(Q,P,N,O)},trackPageview:function(N){C(N)}}}();

}
/*
     FILE ARCHIVED ON 18:35:51 Jan 11, 2010 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 21:12:11 Mar 30, 2024.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.529
  exclusion.robots: 0.063
  exclusion.robots.policy: 0.054
  cdx.remote: 0.057
  esindex: 0.008
  LoadShardBlock: 74.335 (3)
  PetaboxLoader3.datanode: 97.337 (4)
  load_resource: 118.71
  PetaboxLoader3.resolve: 63.524
*/