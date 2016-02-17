
/* global require, exports */
var app = require("application");
var dialogsModule = require("ui/dialogs");
var socialShare = require("nativescript-social-share");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var CampaignListViewModel = require("../../shared/view-models/campaignListViewModel");
var viewModule = require("ui/core/view");
var page;
var appDelegate = null;

var campaignList = new CampaignListViewModel([]);
var listView = null;

var pageData = new Observable({
    campaignList: campaignList
});

exports.navigatedTo = function (args) {
    var daPage = args.object;
    var navContext = daPage.navigationContext;
    var campaignId = navContext.requestId;
    
    appDelegate = navContext.delegate;

    campaignList.empty();
    pageData.set("isLoading", true);
    
    console.log("loading campaignList via navigate complete..." + campaignId);
    
    campaignList.load(campaignId).then({
    })
            .then(function () {
                pageData.set("isLoading", false);
                listView.animate({
                    opacity: 1,
                    duration: 1
                });
            });
};

exports.loaded = function (args) {
    console.log("campaignList list loaded...");
    page = args.object;

    listView = page.getViewById("campaignList");

    page.bindingContext = pageData;
};

exports.select = function (args) {

    var item = args.view.bindingContext;
    var selectedCampaignItemData = campaignList.selectedMenuItemData(campaignList.indexOf(item));

    appDelegate.onListItemSelected(selectedCampaignItemData);
};
