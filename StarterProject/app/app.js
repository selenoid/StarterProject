var app = require("application");
var frameModule = require("ui/frame");
var cacheManager = require("~/utils/CacheManager.js");
var configModule = require("~/utils/config.js");

app.mainModule = "views/main/main";

app.onListItemSelected = function (selectedItem) {
    console.log("ONLIST ITEM SELECTED : " + selectedItem);
    changeView(selectedItem);
};

app.onMenuInit = function (value) {
    console.log("value : " + value);
};

app.on(app.launchEvent, function (args) {
    if (args.android) {
        // For Android applications, args.android is an android.content.Intent class.
        console.log("Launched Android application with the following intent: " + args.android + ".");

        console.log("registering event listener...");
        app.android.registerBroadcastReceiver("myCustomEventName", function (e) {
            console.log("Broadcast Event : " + e.toString());
        });

    } else if (args.ios !== undefined) {
        // For iOS applications, args.ios is NSDictionary (launchOptions).
        console.log("Launched iOS application with options: " + args.ios);

        try {
            //
        } catch (error) {
            console.log("error in application init : " + error.toString());
        }

    }
});

function changeView(data) {

    console.log("CHANGING VIEW : " + data.toString());
    console.log("config module :: VIEW_DATA : " + configModule.configData["VIEW_CATEGORY"]);

    var navigationEntry = null;
    var requestId = 0;

    switch (data.contentTypeId)
    {
        case configModule.configData["VIEW_CATEGORY"]:
            console.log("this is VIEW_CATEGORY : " + data.requestId);
            requestId = data.requestId;
            navigationEntry = {
                moduleName: "views/categorylist/categorylist",
                animated: true
            };
            console.log("data.categoryId:" + data.categoryId);
            break;
        default:
            console.log("this is VIEW_MENU : " + data.requestId);
            requestId = data.requestId;
            navigationEntry = {
                moduleName: "views/menulist/menulist",
                animated: true
            };
            
            console.log("data.menuId:" + data.menuId);
            break;
    }
    
    
    
    navigationEntry.context = {delegate: app, requestId: requestId};
    
    console.log("tabarek : " + navigationEntry.context.requestId);
    frameModule.topmost().navigate(navigationEntry);
}

/*
 if (app.android) {
 app.android.registerBroadcastReceiver(android.content.Intent.ACTION_BATTERY_CHANGED, function onReceiveCallback(context, intent) {
 var level = intent.getIntExtra(android.os.BatteryManager.EXTRA_LEVEL, -1);
 var scale = intent.getIntExtra(android.os.BatteryManager.EXTRA_SCALE, -1);
 var percent = (level / scale) * 100.0;
 //console.log("Battery: " + percent + "%");
 });
 }
 // When no longer needed, unregister the broadcast receiver
 if (app.android) {
 app.android.unregisterBroadcastReceiver(android.content.Intent.ACTION_BATTERY_CHANGED);
 }
 */

app.start();
