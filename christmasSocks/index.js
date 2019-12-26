
/// <reference path="./types/MotionMonitor.d.ts" />
/// <reference path="./types/PhilipsTV.d.ts" />

// global const
const SOCKS_LED = NodeMCU.D8;
const SENSOR_GPIO = NodeMCU.D7;

// global variables
var tv = new PhilipsTV("192.168.0.105");
var mon = new MotionMonitor(SENSOR_GPIO);

// stop from when we save
E.on("init", function()
{
	// connect to wifi
	connectWifi(() => {
		console.log("CONNECTED");

		// on move for each move
		mon.OnMove = () => {
			//console.log("MOVE");
			SOCKS_LED.set();
		};

		mon.OnStop = () => {
			//console.log("STOP");
			SOCKS_LED.reset();
		};

		// sleep so turn off the TV
		/*mon.OnSleep = () => {
			//console.log("SLEEP");
			tv.PowerOff();
		};*/

		// monitor callback only raise when force
		mon.StartMonitor(() => {
			//console.log("COMMAND");
			// toggle the LED when I force the sensor
			NodeMCU.D0.toggle();
			tv.VolumeUp();
		});
	});
});
