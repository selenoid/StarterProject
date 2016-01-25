
var http = require("http");
var frameModule = require("ui/frame");
var logger = require("./components/util/util.js");
var dataModel = require("./components/data/data.js");
var serviceModel = require("./components/util/serviceUtil.js");
var observable = require("data/observable");
var observableModule = require("data/observable");
var observableArray = require("data/observable-array");

var id = "appModel";
var menuItems = new observableArray.ObservableArray([]);
var appInstance = null;

//Creates an instance of an observable object.
var appModel = new observable.Observable();

appModel.id = "appModel";
appModel.requestType = -1;

appModel.initModule = function (app) {
    logger.log("initing module..." + app);
    serviceModel.addListener(appModel);
    /*initing sequence starts..
    
    initing sequence ends...*/
    appModel.showMenuView();
}

appModel.on("onServiceComplete", function(event) {
    console.log(event.eventName + " has been raised! by: " + event.object);
    
    try {
        appModel.changeView(event.object);
    }catch (error) {
        logger.log("error1:" + error.toString());
    }
});

appModel.showMenuView = function (args) {
    if (!args)
        args = "noArgsFound.";
    
    logger.log("show menu : " + args);
    appModel.requestType = 4;
    serviceModel.getMenuService();
}

appModel.changeView = function (serviceResult) {
    logger.log("changing view..." + serviceResult.data[0].MenuText);
    logger.log("requestType : " + appModel.requestType);
    
    var navigationEntry = {};
    
    switch (appModel.requestType) {
        
        case dataModel.ContentType.MENU:
            navigationEntry = {
                moduleName : "./components/home/views/menuView",
                context : {
                    menuList : serviceResult.data
                }
            };
            
            break;
        default:
            //
            break;
    }
    
    var topmost = frameModule.topmost();
    topmost.navigate(navigationEntry);
}

//Exposes the observable object as a module, which can be required from another js file.
module.exports = appModel;