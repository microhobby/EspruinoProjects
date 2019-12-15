
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

function steppedHere(id)
{
	var http = require("http");
	var url = "https:\/\/microhobby.com.br/safira2/tapete.php?id=" + id;

	http.get(url, 
		function(res) {
			res.on('data', function(data)
			{
				console.log("Message has been sent");
			})
		}
	);
}
