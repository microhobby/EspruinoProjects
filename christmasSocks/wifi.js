
var wifi = require("Wifi");

function connectWifi(onConnect) 
{
	wifi.connect("", {password:""}, function(err)
	{
		console.log("connected? err=", err, "info=", wifi.getIP());

		if (onConnect)
			onConnect();
	});
}
