var frameModule = require("ui/frame");
var view = require("ui/core/view");
var viewModel = require("./testAppViewModel");

exports.pageLoaded = function(args) {
    
    console.log("initing  loadUpTestAppView from ViewJS");
    var page = args.object;
    page.bindingContext = viewModel;
    viewModel.initApp();
}

exports.send = function() {
    console.log("sending..." + this);
    
    var topmost = frameModule.topmost();
    topmost.navigate("components/subPageView");
};
