
var http = require("http");
var logger = require("./components/util/util.js");
var dataModel = require("../../data/data.js");
var serviceModel = require("../../util/serviceUtil.js");
var observable = require("data/observable");
var observableModule = require("data/observable");
var observableArray = require("data/observable-array");

var id = "indexViewModel";
var menuItems = new observableArray.ObservableArray([]);

//Creates an instance of an observable object.
var vm = new observable.Observable();

vm.listViewItemTap = function (args) {
    try {
        selectItem({ view:args.view, index:args.index});
    } catch (error) {
        console.error(error.toString());
    }
}

vm.setListData = function (menuList) {
    console.log("menuList length : " + menuList.length);
    console.log("MENU_ITEMS 1 : " + menuItems.length);
    
    while (menuItems.length > 0) {
        menuItems.pop();
    }
	    
    for (var i = 0;i < menuList.length;i++) {
        //console.log("menuItem : " + menuList[i].MenuText);
        menuItems.push({ title: menuList[i].MenuText, contentTypeId:menuList[i].ContentTypeId });
    }
    
    console.log("MENU_ITEMS 2 : " + menuItems.length);
}

vm.initApp = function() {
    
    this.set('listMenuItems', menuItems);
    vm.set('txtKeyword', "Car");
    
    getService();
}

vm.actionGo = function() {
    this.set("initialValue", "The New Value " + getRandom(10));
};

vm.onServiceComplete = function (serviceResult) {
    if (serviceResult.error === 0) {
        vm.setListData(serviceResult.data);
    }else {
        console.log("success..." + serviceResult.error.toString());
    }
}

function selectItem (selectionDataItem) {
    var title = menuItems.getItem(selectionDataItem.index).title;
    console.log("selectItem:" + title);
}

function getService() {
    serviceModel.getMenuService(vm.onServiceComplete);
}


//Exposes the observable object as a module, which can be required from another js file.
module.exports = vm;