var logger = require("../../util/util.js");
var view = require("ui/core/view");
var viewModel = require("./menuViewModel");

exports.pageLoaded = function(args) {
    console.log("initing load menuView from menuViewJS");
    
    var page = args.object;
    page.bindingContext = viewModel;
    
    logger.log("menu view inited...");
}

exports.navigatedTo = function (args) {
    var page = args.object;
    var dataItem = page.navigationContext;
    
    page.bindingContext = dataItem;
    logger.log("menuView navigated to with");
    viewModel.initApp(dataItem.menuList);
};