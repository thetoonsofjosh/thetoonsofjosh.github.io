function printPage()
	{
	if(window.print){window.print();}
	else
		{
		if(agt.indexOf("mac") != -1)
		{alert("To print this page press Command-P.")}
		else{alert("To print this page press Control-P.")}
		}
	}
