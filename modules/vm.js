const logger = require('./logger');

const guacutils = require('./guacutils');

const WebSocket = require('ws');

const { spawn } = require('child_process');

var ws = 0;
function send(data) {
	ws.send(guacutils.encodeGuac(data));
}

module.exports = {
  // Connect to VM
	connect: (vmip, name, deniedcommands, asshats, whitelist) => {
	  
		logger.logMessage("Connecting to VM IP " + vmip + "...",0);
		// Initialize new Websocket
		ws = new WebSocket('ws://'+vmip, 'guacamole');
		ws.on('open', function open() { // Connect and remame user
			send(['connect']);
			send(['rename', 'AN0L0G']);
		});
		ws.on('message', function incoming(data) {
		  // Decode the message
			var guacmessage = guacutils.decodeResponse(data)
				
			if (guacmessage[0] == "nop") return ws.send('3.nop;');
			// if the message isnt in chat
			else if (guacmessage[0] != "chat") console.log(guacmessage);
			
			else {
				var split = guacmessage[2].toLowerCase().split(' ');
				logger.logMessage(guacmessage[1]+" ▸ "+guacmessage[2],3)
			}
		})
	}
}
