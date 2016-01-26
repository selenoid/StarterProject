
var http = require("http");
var dataModel = require("../../data/data.js");
var serviceModel = require("../../util/serviceUtil.js");
var observable = require("data/observable");
var observableModule = require("data/observable");
var observableArray = require("data/observable-array");

var id = "mainViewModel";
var menuItems = new observableArray.ObservableArray([]);

//Creates an instance of an observable object.
var vm = new observable.Observable();

vm.startApp = function() {
    console.log('start app :: mainView');
    //getService('menu');
}


vm.onServiceComplete = function (serviceResult) {
    
    if (serviceResult.error === 0) {
        vm.setListData(serviceResult.data);
    }else {
        console.log("success..." + serviceResult.error.toString());
    }
}

function getService() {
    serviceModel.getMenuService(vm.onServiceComplete);
}


vm.actionGo = function() {
    this.set("initialValue", "The New Value " + getRandom(10));
};

//Exposes the observable object as a module, which can be required from another js file.
module.exports = vm;