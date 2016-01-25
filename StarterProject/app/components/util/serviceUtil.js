var logger = require("./util.js");
var http = require("http");
var api_key = '5e3d8ea6a7f68e02102d9f7213c5a7d2';
var observable = require("data/observable");

//Creates an instance of an observable object.
var serviceModule = new observable.Observable();
var eventListener = 'null';

serviceModule.getMenuItems = function () {
    console.log("this is " + this + "and myMenuItems : " + this.myMenuItems);
    return this.myMenuItems;
}

serviceModule.onCompleteHandler = function (serviceResult) {
    var event = {
        eventName: "onServiceComplete",
        object: serviceResult
    };
        
    eventListener.notify(event);
}

serviceModule.addListener = function (listener) { 
    
    eventListener = listener;
    logger.log("...added listener : " + eventListener);
}

serviceModule.getMenuService = function () {
   
    logger.log("getting menu service..");
    var delegateMenuItems = [];
    http.getJSON("http://contentapi.activebuilder.com:80/menu/items/8064/1").then(function (r) {
        // Argument (r) is JSON!
        console.log('JSON : ' + r.length);
        
        //var photoList = r.photos.photo;
        var menuList = r;
	    
        logger.log("faz1");
        
        for (var i = 0;i < menuList.length;i++) {
            //console.log("...menuText:" + menuList[i].MenuText);
            delegateMenuItems.push(menuList[i]);
            //logger.log("faz2 : ");
        }
        
        
        var serviceResult = {
            data:delegateMenuItems, 
            error:0
        }
        
        logger.log("faz3 : " + delegateMenuItems);
        serviceModule.onCompleteHandler(serviceResult);
        
    }, function (e) {
        
        logger.log("faz-error");
        // Argument (e) is Error!
        
        console.log('error');
        console.log(e);
        
        var serviceResult = {
            data:delegateMenuItems, 
            error:e
        }
        
        serviceModule.onCompleteHandler(serviceResult);
    });
}

//Exposes the observable object as a module, which can be required from another js file.
module.exports = serviceModule;