var logger = require("../../util/util.js");
var view = require("ui/core/view");
var viewModel = require("./menuViewModel");

exports.pageLoaded = function(args) {
    logger.log("initing load menuView from menuViewJS");
}

exports.navigatedTo = function (args) {
    
    var page = args.object;
    page.bindingContext = viewModel;
    
    logger.log("menuView navigated to with");
    
    var dataBundle = page.navigationContext;
    viewModel.initApp(dataBundle);
};