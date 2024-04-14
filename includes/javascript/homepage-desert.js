$(document).ready(function(){
	
	var _cdn = /^soup/.test(window.location.hostname) ? "thetoonsofjosh.github.io/" : /^pbskids/.test(window.location.hostname) ? "thetoonsofjosh.github.io/" : "./";
  	var _src = _cdn + 'home/swfs/home.swf'; 
	$('#flashcontent').flash(
        {
         	src: _src,
                width: '100%',
		height: '100%',
	        allowscriptaccess: 'always',
		scale: 'noScale',
                wmode: 'transparent',
		flashvars: {
                themeXML: 'desert',
		cdn: _cdn
                }
	},
        { version: '9.0.28' });
});
