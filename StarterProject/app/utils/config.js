
/* global module */

var observable = require("data/observable");
var appConfigModule = new observable.Observable();

var _configData = {
    VIEW_ARTICLE: 1,
    VIEW_CHANNEL: 2,
    VIEW_MENU: 4,
    VIEW_CATEGORY: 5
};



appConfigModule.configData = _configData;


//Exposes the observable object as a module, which can be required from another js file.
module.exports = appConfigModule;