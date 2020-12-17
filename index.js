const vm = require('./modules/vm');
const config = require('./config/bot.json');
const logger = require('./modules/logger');


function init(){
	logger.logMessage("an0 logger is turning on....",0);
	for(var i in config.vms){
		vm.connect(config.vms[i], config.name, config.deniedcommands, config.asshats, config.whitelist);
	}
}

init();
