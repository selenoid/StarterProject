var view = require("ui/core/view");
var viewModel = require("./mainViewModel");

exports.pageLoaded = function(args) {
    
    var page = args.object;
    page.bindingContext = viewModel;
    
    //viewModel.initApp();
}