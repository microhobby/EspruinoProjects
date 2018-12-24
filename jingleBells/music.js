
function Music(buzzer_pin)
{
	var BUZZER = buzzer_pin;
	var pitches = {
		'a':220.00,
		'b':246.94,
		'c':261.63,
		'd':293.66,
		'e':329.63,
		//'f':349.23,
		'f':369.99,
		'g':392.00,
		'A':440.00,
		'B':493.88,
		'C':523.25,
		'D':587.33,
		'E':659.26,
		//'F':698.46,
		'F':739.99,
		'G':783.99
	};

	pos = 0;
	isPlaying = false;
	intervalId = 0;
	music_leds = null;
	tune = null;
	time = 110;

	/* check if pin for buzzer is seted */
	if (BUZZER == undefined)
		throw new Error("No Buzzer pin seted");

	/* private */
	function freq(f)
	{ 
		if (f===0) 
			digitalWrite(BUZZER,0);
		else 
			analogWrite(BUZZER, 0.7, { freq: f } );
	}

	function step() 
	{
		var ch = tune[pos];

		if (pos >= tune.length) {
			isPlaying = false;

			if (music_leds != null)
				music_leds.allOff();
			
			freq(0);
			clearInterval(intervalId);
			intervalId = 0;

			return;
		}
		
		if (ch !== undefined)
			pos++;
		
		if (ch in pitches) {
			freq(pitches[ch]);

			if (music_leds != null)
				music_leds.checkChange();
		}
		else  {
			freq(0); // off
			
			if (music_leds != null)
				music_leds.allOff();
		}
	}

	/* public */
	this.play = function()
	{
		this.stop();
		pos = 0;
		isPlaying = true;
		intervalId = setInterval(step, time);
	};

	this.stop = function()
	{
		pos = tune.length;
		isPlaying = false;
	};

	this.setTime = function(tm) 
	{
		time = tm;	
	};

	this.setTune = function(tn)
	{
		tune = tn;
	};

	this.setMusicLeds = function(ml) 
	{
		music_leds = ml;
	};

	this.setPos = function(p) 
	{
		pos = p;
	};

	this.setIntervalId = function(id) 
	{
		intervalId = id;
	};

	this.isPlaying = function() 
	{
		return isPlaying;
	};
}

Music.JingleBellsPt1 = "b b b   b b b   b D g a b       C C C C C b b b b a a b a   D   b b b   b b b   b D g a b       C C C C C b b b D D C a g      ";
Music.JingleBellsPt2 = "d b a g d       d b a g e       e C b a f   D E D C a b       d b a g d       d b a g e       e C b a D     D E D C a g   D   ";
Music.JingleBells = Music.JingleBellsPt1 + Music.JingleBellsPt2 + Music.JingleBellsPt1;
