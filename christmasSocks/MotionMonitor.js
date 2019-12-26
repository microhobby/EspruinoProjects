
var MotionMonitor = function (gpio)
{
	// const
	const STEP_INTERVAL_TIME = 100;
	const AMOUNT_INTERVAL_TIME = 500;
	const SLEEP_INTERVAL_TIME = 600000;
	// max step count depends on the sensibility of the sensor
	const MAX_STEP_COUNT = 18;
	const MAX_AMOUNT = 2;

	// private
	var stepCount = 0;
	var amount = 0;
	var intvStep = 0;
	var intvAmount = 0;
	var intvSleep = 0;
	var watchID = 0;

	// public
	// events
	this.OnSleep = null;
	this.OnMove = null;
	this.OnStop = null;

	// private methods
	function startIntervals (me) {
		intvStep = setInterval(() => {
			// no more signals so no motion at all
			if (stepCount == 0 && me.OnStop &&
			    typeof me.OnStop == "function")
				me.OnStop();

			stepCount = 0;
		}, STEP_INTERVAL_TIME);

		intvAmount = setInterval(() => {
			amount = 0;
		}, AMOUNT_INTERVAL_TIME);
	}

	function startSleepInterval (me) {
		intvSleep = setInterval(() => {
			if (me.OnSleep && typeof me.OnSleep == "function")
				me.OnSleep();
		}, SLEEP_INTERVAL_TIME);
	}

	function resetSleepInterval (me) {
		clearInterval(intvSleep);
		intvSleep = setInterval(() => {
			if (me.OnSleep && typeof me.OnSleep == "function")
				me.OnSleep();
		}, SLEEP_INTERVAL_TIME);
	}

	// public methods
	this.StartMonitor = function (callBack) {
		var obj = this;

		watchID = setWatch(() => {
			stepCount++;
			//console.log("Sensor IRQ " + stepCount);

			if (obj.OnMove && typeof obj.OnMove == "function")
				obj.OnMove();

			if (stepCount >= MAX_STEP_COUNT) {
				stepCount = 0;
				amount++;
			}

			if (amount >= MAX_AMOUNT) {
				amount = 0;
				if (callBack && typeof callBack == "function")
					callBack();
			}

			resetSleepInterval(obj);
		}, gpio, {
			edge: 'falling',
			repeat: true,
		});

		startIntervals(this);
		if (this.OnSleep)
			startSleepInterval(this);
	};

	this.StopMonitor = function () {
		clearInterval(intvStep);
		clearInterval(intvAmount);
		clearWatch(watchID);
	};
};
