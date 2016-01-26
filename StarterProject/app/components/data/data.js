
var observable = require("data/observable");
var dataModule = new observable.Observable();

//var imgList = ["pic2.png","pic2004.png","pic2005.png","pic2006.png","pic3.png","pic3023.png","pic4.png","pic4022.png","pic4023.png","pic4025.png","pic4026.png","pic4027.png","pic4028.png","pic4032.png","pic5.png","pic5032.png","pic5034.png","pic5035.png","pic6032.png","pic6033.png","pic6035.png","pic6036.png","pic6041.png","pic6042.png","pic6043.png","pic6055.png","pic8072.png","pic8074.png","pic8076.png"];

dataModule.imgList = ["8065.png","pic8059.png","pic8066.png","pic8067.png","pic8069.png","pic3023.png","pic4.png","pic4022.png","pic4023.png"];
dataModule.ContentType = {
    MENU:4,
    CATEGORY:5,
    ARTICLE:1,
    CAMPAIGN:4
}
dataModule.startMenuId = 8064;
dataModule.defaultListThumbnailUrl = "http://m.halkbank.com.tr/images/articles/mobil_ipad/2015/hb_donusumlu_mevduat_banner_129x156px-01.jpg";

//Exposes the observable object as a module, which can be required from another js file.
module.exports = dataModule;