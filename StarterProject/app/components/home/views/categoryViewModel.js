
var http = require("http");
var logger = require("../../util/util.js");
var dataModel = require("../../data/data.js");
var serviceModel = require("../../util/serviceUtil.js");
var observable = require("data/observable");
var observableModule = require("data/observable");
var observableArray = require("data/observable-array");

var id = "categoryViewModel";
var listItems = new observableArray.ObservableArray([]);

//Creates an instance of an observable object.
var vm = new observable.Observable();
var delegate;

vm.setDelegate = function (_delegate) {
    delegate = _delegate;
    logger.log("delegate is " + delegate);
}

vm.listViewItemTap = function (args) {
    try {
        selectItem({ view:args.view, index:args.index});
    } catch (error) {
        console.error(error.toString());
    }
}

vm.setListData = function (viewData) {
    var viewList = viewData;
    
    while (listItems.length > 0) {
        listItems.pop();
    }
	    
    for (var i = 0;i < viewList.length;i++) {
        var img = dataModel.defaultListThumbnailUrl;
        logger.debug("image : " + img);
        listItems.push({ title: viewList[i].Title, categoryId:viewList[i].CategoryId, imageUrl:img });
    }
    
    logger.log("CATEGORY_ITEMS 2 : " + listItems.length);
}

vm.initApp = function(dataBundle) {
    logger.debug("set dataBundle in categoryViewModel...");
    this.set('listItems', listItems);
    
    vm.setDelegate(dataBundle.viewDelegate);
    vm.setListData(dataBundle.viewData);
}

vm.actionGo = function() {
    this.set("initialValue", "The New Value " + getRandom(10));
};

function selectItem (selectionDataItem) {
    try {
        var selectedItem = listItems.getItem(selectionDataItem.index);
        
        var title = selectedItem.title;
        var categoryId = selectedItem.categoryId;
        var imageUrl = selectedItem.imageUrl;
        
        if (delegate !== undefined) {
            var tempData = {title:title, categoryId:categoryId, imageUrl:imageUrl};
            logger.debug("tempData:" + tempData);
            delegate.onListItemSelect(tempData);
        } else {
            logger.log("no view delegate defined..");
        }
    } catch (error) {
        logger.error("selectItem error : " + error.toString());
    }
}

//Exposes the observable object as a module, which can be required from another js file.
module.exports = vm;