var view = require("ui/core/view");

function onLoad(args) {
    var page = args.object;

    var nameTextField = view.getViewById(page, "name");
    var emailTextField = view.getViewById(page, "email");
    var twitterHandleTextField = view.getViewById(page, "twitterHandle");
    var signUpButton = view.getViewById(page, "signUpButton");
    var resultLabel = view.getViewById(page, "result");

    signUpButton.on("tap", function () {

        var result = "";

        if(nameTextField.text === "" || emailTextField.text === "" || twitterHandleTextField.text === "")
            result = "Error: All fields required";
        else
            result = "Success!!!\nName: " + nameTextField.text + "\nEmail:" + emailTextField.text + "\nTwitter Handle: " + twitterHandleTextField.text;

        resultLabel.text = result;
    });
}
exports.loadSignUpView = onLoad;