sap.ui.define(["sap/ui/core/mvc/Controller",
    "com/sap/takeexam/module/util",
    "com/sap/takeexam/module/service"], (Controller, util, service) => {
  "use strict";

  return Controller.extend("com.sap.takeexam.controller.Result", {
    onInit() {
      const oView = this.getView();
      const oComponent = this.getOwnerComponent();
      const examModel = util.getModel(oComponent, "examModel");
      oView.setModel(examModel, "examModel");
    },
  });
});
