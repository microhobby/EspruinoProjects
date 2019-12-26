function postJSON(postURL, data, path, onData, onError)
{
	content = JSON.stringify(data);
	var options = url.parse(postURL + path);
	options.method = 'POST';
	options.headers = {
		"Path": path,
		"Content-Length": content.length
	};
	var req = require("http").request(options, function (res) {
		var d = "";
		res.on('data', function (data) {
			d += data;
		});
		res.on('close', function (data) {
			if (onData && typeof onData == "function")
				onData(d);
		});
	});
	req.on('error', function (e) {
		if (onError && typeof onError == "function")
			onError(e);
	});
	req.end(content);
}