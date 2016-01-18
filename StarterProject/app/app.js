var application = require('application');
//application.mainModule = "components/helloWorldView";
//application.mainModule = "components/signUpView";
//application.mainModule = "components/journeyCalculatorView";
//application.mainModule = "components/upDownView";
//application.mainModule = "components/upDownViewWithStyle";
application.mainModule = "components/testAppView";
application.cssFile = "./app.css";


// START_CUSTOM_CODE_nativeScriptApp
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes


function changePage(num) {
    console.log ("change page " + num);
}

console.log ("thisis " +this);

// END_CUSTOM_CODE_nativeScriptApp
application.start();

