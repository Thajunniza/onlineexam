sap.ui.define([
    "sap/ui/core/UIComponent",
    "com/sap/takeexam/model/models",
    "com/sap/takeexam/model/examModel"
], (UIComponent, models, examModel) => {
    "use strict";

    return UIComponent.extend("com.sap.takeexam.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            //Set Exam model
                this.setModel(new examModel(), "examModel");

            // enable routing
            this.getRouter().initialize();
        }
    });
});