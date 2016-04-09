cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-jb-plugin-panframe/www/cdv-jb-panframe-plugin.js",
        "id": "cordova-jb-plugin-panframe.PanframePlugin",
        "pluginId": "cordova-jb-plugin-panframe",
        "clobbers": [
            "panframePlugin"
        ]
    },
    {
        "file": "plugins/cordova-plugin-console/www/console-via-logger.js",
        "id": "cordova-plugin-console.console",
        "pluginId": "cordova-plugin-console",
        "clobbers": [
            "console"
        ]
    },
    {
        "file": "plugins/cordova-plugin-console/www/logger.js",
        "id": "cordova-plugin-console.logger",
        "pluginId": "cordova-plugin-console",
        "clobbers": [
            "cordova.logger"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-jb-plugin-panframe": "0.1.0",
    "cordova-plugin-console": "1.0.2"
}
// BOTTOM OF METADATA
});