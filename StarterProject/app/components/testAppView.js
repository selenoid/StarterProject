var view = require("ui/core/view");
var viewModel = require("./testAppViewModel");

exports.loadUpTestAppView = function(args) {
    
    console.log("initing  loadUpTestAppView from ViewJS");
    var page = args.object;
    page.bindingContext = viewModel;
    viewModel.initApp();
}
