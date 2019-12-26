
var wifi = require("Wifi");

var PhilipsTV = function (ip)
{
	// const
	const PATH_INPUT_KEY = "/6/input/key";

	// private
	var http = require("http");
	var host = "http:\/\/" + ip + ":1925";
	var next = true;

	function runCommand (path, cmd) {
		if (next) {
			next = false;
			postJSON(host, cmd, path,
			(d) => {
				console.log(d);
				next = true;
			}, (e) => {
				console.log(e);
				next = true;
			});
		}
	}

	this.PowerOff = function () {
		runCommand(PATH_INPUT_KEY, {"key": "Standby"});
	};

	this.VolumeUp = function () {
		runCommand(PATH_INPUT_KEY, {"key": "VolumeUp"});
	};

	this.VolumeDown = function () {
		runCommand(PATH_INPUT_KEY, {"key": "VolumeDown"});
	};

	this.PlayPause = function () {
		runCommand(PATH_INPUT_KEY, {"key": "PlayPause"});
	}
};
