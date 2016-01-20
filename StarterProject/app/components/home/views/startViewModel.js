
var http = require("http");
//var utils = require ("../../util/util.js");
var serviceModel = require("../../util/serviceUtil.js");
var api_key = '5e3d8ea6a7f68e02102d9f7213c5a7d2';
var observable = require("data/observable");
var observableModule = require("data/observable");
var observableArray = require("data/observable-array");

var id = "startViewModel";
var myImages = new observableArray.ObservableArray([]);

//Creates an instance of an observable object.
var vm = new observable.Observable();

vm.initialValue = "Initial Value";
vm.txtKeyword = "Rock"

vm.listViewItemTap = function (args) {
    try {
        selectItem({ view:args.view, index:args.index});
    } catch (error) {
        console.error(error.toString());
    }
}

vm.getImages = function () {
    if (vm.txtKeyword.legth < 2) {
        console.log("returning...");
        return;
    }
    
    while (myImages.length > 0) {
        myImages.pop();
    }
	
    var searchString = vm.txtKeyword;
    http.getJSON("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + api_key + "&text=" + searchString + "&format=json&nojsoncallback=1&per_page=5").then(function (r) {
        // Argument (r) is JSON!
        var imgUrl = '';
	    
        var photoList = r.photos.photo;
	    
        for (var i = 0;i < photoList.length;i++) {
            imgUrl = "https://farm" + photoList[i].farm + ".staticflickr.com/" + photoList[i].server + "/" + photoList[i].id + "_" + photoList[i].secret + ".jpg";
            myImages.push({ img: imgUrl });
        }
    }, function (e) {
        // Argument (e) is Error!
        console.log('error');
        console.log(e);
    });
}

vm.setListData = function (menuList) {
    console.log("menuList length : " + menuList.length);
    console.log("MY_IMAGES 1 : " + myImages.length);
    
    while (myImages.length > 0) {
        myImages.pop();
    }
	    
    for (var i = 0;i < menuList.length;i++) {
        console.log("menuItem : " + menuList[i].MenuText);
        myImages.push({ title: menuList[i].MenuText, contentTypeId:menuList[i].ContentTypeId });
    }
    
    console.log("MY_IMAGES 2 : " + myImages.length);
}

vm.initApp = function() {
    this.set('listImages', myImages);
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
    var title = myImages.getItem(selectionDataItem.index).title
    console.log("selectItem:" + title);

}

function getService() {
    serviceModel.getMenuService(vm.onServiceComplete);
}

function getRandom (max) {
    return (Math.floor(Math.random() * max) + "" + Math.floor(Math.random() * max) + "" + Math.floor(Math.random() * max) + "" + Math.floor(Math.random() * max));
}

//Exposes the observable object as a module, which can be required from another js file.
module.exports = vm;