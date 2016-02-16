
/* global require, exports */
var app = require("application");
var dialogsModule = require("ui/dialogs");
var socialShare = require("nativescript-social-share");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var MenuListViewModel = require("../../shared/view-models/menuListViewModel");
var viewModule = require("ui/core/view");
var page;
var appDelegate = null;

var menuList = new MenuListViewModel([]);
var listView = null;

var pageData = new Observable({
    menuList: menuList
});

exports.navigatedTo = function (args) {
    var daPage = args.object;
    var navContext = daPage.navigationContext;
    var menuId = navContext.requestId;
    
    appDelegate = navContext.delegate;
    console.log("appDelegate : " + appDelegate.id);
    
    menuList.empty();
    pageData.set("isLoading", true);
    
    console.log("loading menulist via navigate complete..." + menuId);
    listView.animate({
                    opacity: 0,
                    duration: 1
                });
    menuList.load(menuId).then({
    })
            .then(function () {
                pageData.set("isLoading", false);
                listView.animate({
                    opacity: 1,
                    duration: 1000
                });
            });
};

exports.loaded = function (args) {
    console.log("menu list loaded...");
    page = args.object;

    listView = page.getViewById("menuList");

    page.bindingContext = pageData;
};

exports.select = function (args) {
    console.log("select in MENULIST...");
    var item = args.view.bindingContext;
    var selectedMenuItemData = menuList.selectedMenuItemData(menuList.indexOf(item));
    
    console.log("SELECTED MENU ITEM DATA:" +selectedMenuItemData.toString());
    appDelegate.onListItemSelected(selectedMenuItemData);
};

exports.delete = function (args) {
    var item = args.view.bindingContext;
    var index = menuList.indexOf(item);
};

exports.share = function () {
    var list = [];
    for (var i = 0, size = menuList.length; i < size; i++) {
        list.push(menuList.getItem(i).name);
    }
    var listString = list.join(", ").trim();
    socialShare.shareText(listString);
};