/* dextuploadx5-configuration Copyright ⓒ DEXTSolution Inc. */

(function (win) {

    if (!location.origin) location.origin = location.protocol + "//" + location.host;

    win.dextuploadx5Configuration = {
        // authkey: Authentication Key string
        authkey: "lLfg6AGQ3nvEnQmICAGoB/4SQpouGXBj8SJCSGqOtGjKSLUEqTEOCtVGhG+kYs52ICgVMIeeEB3NAqj9VonJOFy8motypCOBeSgw8nqSIBzJkMK+wkSxEkFmBoy2IQmyKA3v6frMJw3msDn+/gEQ4KN8HSPizu0c9cpW9XgQCqwvqPsQuq+KJETkyfcl4FR4",

        version: "3.5.2.0",

        // productPath: DEXTUploadX5 location path (It MUST be a web address started with http or https.)
        productPath: location.origin + "/resources/plugins/dext/dx5/",

        // Below properties must be web addresses started with http or https.
        ieDownloadURL: location.origin + "/resources/plugins/dext/dx5/client/dextuploadx5-ax-download.html",
        hdDownloadURL: location.origin + "/resources/plugins/dext/dx5/client/dextuploadx5-hd-download.html",
        hd32UpdateURL: location.origin + "/resources/plugins/dext/dx5/client/dextuploadx5-hd-installer.exe",
        hd64UpdateURL: location.origin + "/resources/plugins/dext/dx5/client/dextuploadx5-hd-installer-x64.exe"
    };
})(window);