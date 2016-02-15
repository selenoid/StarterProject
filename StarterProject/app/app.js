var app = require("application");
var cacheManager = require("~/utils/CacheManager.js");
app.mainModule = "views/main/main";

app.selectItem = function (index) {
    console.log("selecting item in app..." + index);
}

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
