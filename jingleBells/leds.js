
function MusicLeds (group1, group2) 
{
	var change = false;
	var lightLim = 0.0;
	var changeLightLim = false;

	/* set pin mux */
	for (var i = 0; i < group1.length; i++)
		group1[i].mode("output");
	for (var i = 0; i < group2.length; i++)
		group2[i].mode("output");

	/* public */
	this.groupOn = function(group)
	{
		for (var i = 0; i < group.length; i++)
			analogWrite(group[i], lightLim);
	};
	
	this.groupOff = function(group)
	{
		for (var i = 0; i < group.length; i++)
			analogWrite(group[i], 0);
	};

	this.allOff = function()
	{
		this.groupOff(group1);
		this.groupOff(group2);
	};

	this.checkChange = function()
	{
		if(change) {
			this.groupOff(group1);
			this.groupOn(group2);
			change = false;
		} else {
			this.groupOff(group2);
			this.groupOn(group1);
			change = true;
		}

		if(changeLightLim)
			lightLim -= 0.01;
		else
			lightLim += 0.01;

		if (lightLim > 1)
			changeLightLim = true;
		else if (lightLim < 0)
			changeLightLim = false;
	};
}

