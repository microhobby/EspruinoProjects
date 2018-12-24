
/* initialize music */
var music = new Music(NodeMCU.D2);
var noses = [NodeMCU.D8, NodeMCU.D4, NodeMCU.D1];
var eyes = [NodeMCU.D5, NodeMCU.D6, NodeMCU.D7];
var musicLeds = new MusicLeds(noses, eyes);

music.setTune(Music.JingleBells);
music.setMusicLeds(musicLeds);

/* set pinmmux for sensors  */
NodeMCU.D3.mode("input");

/* stop from when we save */
E.on("init", function()
{
	/* turn on LEDs */
	musicLeds.setLightLim(1);
	musicLeds.allOn();

	/* connect wifi */
	connectWifi(() => {

		/* LEDs turn off wifi has been conected */
		musicLeds.setLightLim(0);
		musicLeds.allOff();

		setTimeout(() => {
			/* set irqs */
			setWatch(() => {
				/* we have all 3 sensors in the same input */
				if (!music.isPlaying()) {
					music.play();
					steppedHere();
				}
			}, NodeMCU.D3, { repeat: true });
		}, 500);
	});

	music.stop();
});
