var logger = require("../../util/util.js");
var view = require("ui/core/view");
var viewModel = require("./categoryViewModel");

exports.pageLoaded = function(args) {
    logger.log("initing load categoryView from categoryViewJS");
}

exports.navigatedTo = function (args) {
    
    var page = args.object;
    page.bindingContext = viewModel;
    
    logger.log("categoryView navigated to with");
    
    var dataBundle = page.navigationContext;
    viewModel.initApp(dataBundle);
};