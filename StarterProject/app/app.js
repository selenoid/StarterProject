var application = require('application');
var serviceUtil = require('./components/util/serviceUtil.js');
var appModule = require('./appModel.js');


application.mainModule = "components/home/views/mainView";
application.cssFile = "./app.css";


// START_CUSTOM_CODE_nativeScriptApp
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

application.on(application.launchEvent, function (args) {
    if (args.android) {
        // For Android applications, args.android is an android.content.Intent class.
        console.log("Launched Android application with the following intent: " + args.android + ".");

        appModule.initModule (application.android);
        
    } else if (args.ios !== undefined) {
        // For iOS applications, args.ios is NSDictionary (launchOptions).
        console.log("Launched iOS application with options: " + args.ios);
        
        try {
            appModule.initModule(application.ios);
        }catch(error){
            logger.log("error in application init : "+ error.toString());
        }
        
    }
});

console.log('application started...');


// END_CUSTOM_CODE_nativeScriptApp
application.start();
