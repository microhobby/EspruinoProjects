
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

function steppedHere()
{
	var http = require("http");
	
	/* send the flag */
	http.get("https://yourdomain.com/youservice/", 
		function(res) {
			res.on('data', function(data)
			{
				console.log("Message has been sent");
			})
		}
	);
}
