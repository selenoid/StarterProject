
var view = require("ui/core/view");
var viewModel = require("./subPageViewModel");

exports.pageLoaded = function(args) {
    
    console.log("initing load subPageView from ViewJS");
    var page = args.object;
    page.bindingContext = viewModel;
    
    viewModel.initApp();
}