#!/bin/bash

# cleanup
rm index.js

# put all js together
find $2 \
	-name '*.js' \
	-not -name 'index.js' \
	-exec cat {} \; \
	>> index.js

cd $2
cat index.js >> ../index.js

cd - 
# DEBUG
# cat index.js && exit

# on linux we have the espruino node package so check if we have node
nodePath=$(which npm)
if [ -x "$nodePath" ] ; then
	echo '🤔  We need to install espruino package'

	nodePath=$(which espruino)
	if [ -x "$nodePath" ] ; then
		echo 'No'
	else
		npm install -g espruino
		if [ $? -gt 0 ] ; then
			echo '😢  Issues trying to install espruino'
			echo 'Exiting ...'
			exit
        	fi
	fi
else
	echo '😘  node or npm not found. Please install node first'
	echo 'Exiting ...'
	exit
fi

echo '🤔  Try to connect '$1
espruino -q -p $1 -b 115200 --no-ble -e "reset()"

if [ $? -gt 0 ] ; then
	echo '🤷‍♂️  Error trying to connect to '$1
	echo 'Exiting ...'
	exit
fi
echo '👌  Done'

echo '🔥  Writing'
# for esp8266
espruino -q -p $1 -b 115200 --no-ble index.js -e "save()"

if [ $? -gt 0 ] ; then
	echo '🤷‍♂️  Error trying to upload to Espruino on '$1
	echo 'Exiting ...'
	exit
fi

echo '😎  Closed'
