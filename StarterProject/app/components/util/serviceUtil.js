
var http = require("http");
var api_key = '5e3d8ea6a7f68e02102d9f7213c5a7d2';
var observable = require("data/observable");

//Creates an instance of an observable object.
var serviceModule = new observable.Observable();
var listener = null;

serviceModule.getMenuItems = function () {
    console.log("this is " + this + "and myMenuItems : " +this.myMenuItems);
    return this.myMenuItems;
}

serviceModule.getMenuService = function (onCompleteHandler) {
   
    var delegateMenuItems = [];
    
    http.getJSON("http://contentapi.activebuilder.com:80/menu/items/8064/1").then(function (r) {
        // Argument (r) is JSON!
        console.log('JSON : ' + r.length);
        
        //var photoList = r.photos.photo;
        var menuList = r;
	    
        for (var i = 0;i < menuList.length;i++) {
            
            //console.log("...menuText:" + menuList[i].MenuText);
            delegateMenuItems.push(menuList[i]);
        }
        
        var serviceResult = {
            data:delegateMenuItems, 
            error:0
        }
        onCompleteHandler.apply(this, [serviceResult]);

    }, function (e) {
        // Argument (e) is Error!
        console.log('error');
        console.log(e);
        onCompleteHandler.apply(["null",e]);
    });
}

serviceModule.on ("onServiceComplete", function() {"service complete in getMenuService..."});

//Exposes the observable object as a module, which can be required from another js file.
module.exports = serviceModule;