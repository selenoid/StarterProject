var frameModule = require("ui/frame");
var view = require("ui/core/view");
var viewModel = require("./testAppViewModel");

exports.pageLoaded = function(args) {
    
    console.log("initing  loadUpTestAppView from ViewJS");
    var page = args.object;
    page.bindingContext = viewModel;
    viewModel.initApp();
}

exports.register = function() {
    console.log("registering..." + this);
    
    var topmost = frameModule.topmost();
    topmost.navigate("components/subPageView");
};
