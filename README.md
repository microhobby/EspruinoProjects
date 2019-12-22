# EspruinoProjects
Some examples and projects using Espruino

# Flashing

Send scritp will put all javascripts from the folder, passed as argument,
together and will send to your dev board. 

For "flash" it to your ESP8266 run:

## Linux

```sh
./send.sh /dev/ttyUSB0 blink/
```

## Windows

```ps1
.\send.ps1 com4 .\blink\
```

# Projects

## Blink

Simple blink on D2 onboard LED, it is actually a sanity test of the environment
and the send script.

## Jingle Bells - IoT Carpet

Let's make an IoT carpet that when stepped on it will play Jingle Bells, light
on leds in the Santa Clauss and his Reindeers eyes and noses, plus notify that
there is someone at the door, like a high-tech IoT door bell!

- Warnings
  - wifi.js
    - Do not forget to enter your wifi credentials, I left it blank to you
    - In steppedHere function if you have some service to notify you put the
    address in http call
