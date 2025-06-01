sap.ui.define([], function () {
  "use strict";

  /**
   * Get the Data from the entity
   *
   * @param {object} oComponent Component
   * @param {string} sModel Model Name
   * @param {string} sEntity Entity Name
   */

  async function getEntityData(
    oComponent,
    sModel,
    sEntity,
    sExpand = null,
    aFilter = []
  ) {
    let oModel;
    if (sModel == null) {
      oModel = oComponent.getView().getModel();
    } else {
      oModel = oComponent.getView().getModel(sModel);
    }
    const oBinding = oModel.bindList(sEntity, null, [], aFilter, {
      $expand: sExpand,
      $$getKeepAliveContext: true,
    });
    const oContext = await oBinding.requestContexts();
    const oData = oContext.map((oContext) => oContext.getObject());
    return oData;
  }

  return {
    getEntityData,
  };
});
