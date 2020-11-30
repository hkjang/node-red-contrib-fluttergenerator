const fluttergenerator = require('./src/generate');
const Settings = require("./src/settings");

module.exports = {
    STATEFULPAGE: "stateful-page",
    STATELESSPAGE: "stateless-page",
    BLOC: "bloc",
    ROUTER: "router"
};
const defaultSettings = {
    statefulPageDestination: "./lib/pages",
    statelessPageDestination: "./lib/pages",
    blocDestination: "./lib/bloc",
    routerDestination: "./lib",
    templatePath: ""
};
module.exports = function(RED) {
    "use strict";
    function fluttergeneratorOut(n) {
        RED.nodes.createNode(this,n);
        var self = this;
        this.resourceType = n.resourceType || "";
        this.componentName = n.componentName || "";
        // this.destination = n.destination || "";
        if(this.resourceType === 'stateful-page'){
            this.destination = defaultSettings.statefulPageDestination;
        }else if(this.resourceType === 'stateless-page'){
            this.destination = defaultSettings.statelessPageDestination;
        }else if(this.resourceType === 'bloc'){
            this.destination = defaultSettings.blocDestination;
        }else if(this.resourceType === 'router'){
            this.destination = defaultSettings.routerDestination;
        }else{
            this.destination = defaultSettings.templatePath;
        }

        let settingsOverrides = {};
        settingsOverrides[this.destination] = this.destination;
        settingsOverrides["templatePath"] = defaultSettings.templatePath;

        // this.settings = n.settings || "";
        const settings = Settings.getSettings(settingsOverrides);
        this.on('input', function (msg) {
            var resourceType = self.resourceType || msg.resourceType;
            var options = {
                name: self.componentName || msg.componentName,
                destination: self.destination || msg.destination
            }
            // self.error(resourceType);
            // self.error(options);
            // self.error(settings);
            try {
                let results = fluttergenerator(resourceType, options, settings, msg, self);
                msg.payload = results;
                self.send(msg);
                self.log(msg.payload);
            }catch (err) {
                msg.payload = err;
                self.send(msg);
                self.log(err,msg);
                console.trace();
            }
        });
    }
    RED.nodes.registerType("fluttergenerator", fluttergeneratorOut);
};

