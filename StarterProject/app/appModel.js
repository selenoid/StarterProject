
var http = require("http");
var frameModule = require("ui/frame");
var logger = require("./components/util/util.js");
var dataModel = require("./components/data/data.js");
var serviceModel = require("./components/util/serviceUtil.js");
var observable = require("data/observable");
var observableModule = require("data/observable");
var observableArray = require("data/observable-array");

var id = "appModel";
var listItems = new observableArray.ObservableArray([]);
var appInstance = null;
var counter = 0;
//Creates an instance of an observable object.
var appModel = new observable.Observable();
var viewDelegate = new observable.Observable();

appModel.id = "appModel";
appModel.requestType = -1;

appModel.initModule = function (app) {
    
    logger.log("initing module..." + app);
    serviceModel.addListener(appModel);
    
    /*initing sequence starts..*/
    
    this.on("myCustomEventName", function(eventData) {
        console.log("CUSTOM_EVENT_CAUGHT_IN appModel :: " + eventData.eventName + " has been raised! by: " + eventData.object);
    })
    
    /*initing sequence ends...*/
    
    appModel.showMenuView(dataModel.startMenuId);
}

appModel.on("onServiceComplete", function(event) {
    try {
        appModel.changeView(event.object);
    }catch (error) {
        logger.log("error1:" + error.toString());
    }
});

appModel.showMenuView = function (args) {
    if (!args)
        args = "noArgsFound.";
    
    logger.debug("SHOWING MENU VIEW : " + args);
    var url = "http://contentapi.activebuilder.com:80/menu/items/" + args + "/1";
    
    appModel.requestType = dataModel.ContentType.MENU;
    serviceModel.getService(url);
}

appModel.showSubcategoriesView = function (args) {
    
    if (!args)
        args = "noArgsFound.";
    
    var url = "http://contentapi.activebuilder.com:80/category/subcategories/" + args;
    
    try {
        logger.debug("");
        
        appModel.requestType = dataModel.ContentType.CATEGORY;
        serviceModel.getService(url);
    }catch (e) {
        logger.error(e);
    }
}

appModel.changeView = function (serviceResult) {
    logger.debug("changing view..." + 
                 serviceResult.data[0].MenuText + ", " + 
                 serviceResult.data[0].ContentTypeId + ", " + 
                 serviceResult.data[0].ItemId);
    
    var navigationEntry = {};
    
    switch (appModel.requestType) {
        case dataModel.ContentType.MENU:
            logger.debug("changing to menu view..." + 
                         serviceResult.data[0].MenuText + ", " + 
                         serviceResult.data[0].ContentTypeId + ", " + 
                         serviceResult.data[0].ItemId);
            
            navigationEntry = {
                moduleName : "./components/home/views/menuView",
                context : {
                    viewData : serviceResult.data,
                    viewDelegate : viewDelegate
                }
            };
            
            break;
        case dataModel.ContentType.CATEGORY:
            try {
                logger.debug("changing to category view..." + 
                             serviceResult.data[0].Title + ", " + 
                             serviceResult.data[0].CategoryId + ", " +
                             serviceResult.data[0].ImageUrl);
                navigationEntry = {
                    moduleName : "./components/home/views/categoryView",
                    context : {
                        viewData : serviceResult.data,
                        viewDelegate : viewDelegate
                    }
                };
            } catch (e) {
                logger.debug("Error in ChangeView..." + e.toString());
            }
            
            break;
        default:
            //
            break;
    }
    
    var topmost = frameModule.topmost();
    topmost.navigate(navigationEntry);
    
    if (counter < 1)
    //setTimeout(appModel.showMenuView, 3000);
        counter++;
}

viewDelegate.onListItemSelect = function (selectedListItemData) {
    logger.debug("appModelRequestType : " + appModel.requestType);
    
    var str = "";
    if (appModel.requestType === dataModel.ContentType.CATEGORY) {
        str = "title: " + selectedListItemData.title + 
              ", categoryId: " + selectedListItemData.categoryId + 
              ", imageUrl: " + selectedListItemData.imageUrl
    } else {
        str = (
        "  title: " + selectedListItemData.title + 
        ", contentTypeId: " + selectedListItemData.contentTypeId + 
        ", itemId: " + selectedListItemData.itemId);
    }
    
    logger.debug("::viewDelegate::item selected  >> " + str);
    
    if (selectedListItemData.contentTypeId === dataModel.ContentType.CATEGORY) {
        appModel.showSubcategoriesView(selectedListItemData.itemId);
    } else {
        appModel.showMenuView(selectedListItemData.itemId);
    }
}

//Exposes the observable object as a module, which can be required from another js file.
module.exports = appModel;