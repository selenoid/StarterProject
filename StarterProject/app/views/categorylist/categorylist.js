
/* global require, exports */
var app = require("application");
var dialogsModule = require("ui/dialogs");
var socialShare = require("nativescript-social-share");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var CategoryListViewModel = require("../../shared/view-models/categoryListViewModel");
var viewModule = require("ui/core/view");
var page;
var appDelegate = null;

var categoryList = new CategoryListViewModel([]);
var listView = null;

var pageData = new Observable({
    categoryList: categoryList
});

exports.navigatedTo = function (args) {
    var daPage = args.object;
    var navContext = daPage.navigationContext;
    var categoryId = navContext.requestId;
    
    appDelegate = navContext.delegate;

    categoryList.empty();
    pageData.set("isLoading", true);
    
    console.log("loading categoryList via navigate complete..." + categoryId);
    
    categoryList.load(categoryId).then({
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
    console.log("category list loaded...");
    page = args.object;

    listView = page.getViewById("categoryList");

    page.bindingContext = pageData;
};

exports.select = function (args) {

    var item = args.view.bindingContext;
    var selectedCategoryItemData = categoryList.selectedMenuItemData(categoryList.indexOf(item));

    appDelegate.onListItemSelected(selectedCategoryItemData);
};

exports.delete = function (args) {
    var item = args.view.bindingContext;
    var index = categoryList.indexOf(item);
};

exports.share = function () {
    var list = [];
    var finalList = "";
    for (var i = 0, size = categoryList.length; i < size; i++) {
        list.push(categoryList.getItem(i).name);
    }
    var listString = list.join(", ").trim();
    socialShare.shareText(listString);
};