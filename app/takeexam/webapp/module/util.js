sap.ui.define([], function () {
  "use strict";

  /**
   * Returns i18n text for the key
   *
   * @param {string} key for which i18n text is required
   * @param {object} extensionApi Fiori Element V4 extension API
   * @returns {string} text for the key
   */
  function getI18nText(key, extensionApi) {
    return extensionApi?.getModel("i18n")?.getResourceBundle()?.getText(key);
  }

  /**
   * Navigate to Route
   *
   * @param {object} me current Context
   * @param {string} sTarget The target name defined in the manifest
   */
  function navTo(me, sTarget, oProp = {}) {
    me?.getOwnerComponent()?.getRouter()?.navTo(sTarget, oProp);
  }

  /**
   *Get the Target key for a Common Action
   *
   * @param {object} oEvent Action event
   * @returns {string} text for the key
   */
  function getActionTargetData(oEvent) {
    return oEvent?.getSource()?.data("target");
  }

  /**
   * Get the Model
   * @param {object} me current Context
   * @param {string} modelName Model Name
   * @returns {object} Model object
   */
  function getModel(me, modelName) {
    return me?.getModel(modelName);
  }

  /**
   * Executes bounded custom actions with EditFlow invokeAction - applies busy
   * @param {string} sUrl API URL
   * @param {string} callType GET/POST
   * @param {boolean} is async
   * @returns {Promise} response of the api
   */
  async function executeAPI(sUrl, callType, data) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        url: sUrl,
        type: callType,
        contentType: "application/json",
        data: JSON.stringify(data),
        async: true, // Make the AJAX call synchronous
        success: function (data) {
          resolve(data);
        },
        error: function (xhr, status, error) {
          reject(error);
        },
      });
    });
  }

  /**
   * Returns the object containing application configuration from
   * the application descriptor.
   *
   * @param {object} component App Component
   * @returns {object} configuration
   */
  function getAppConfig(component) {
    return component?.getMetadata()?.getManifestEntry("sap.ui5")?.config;
  }

  /**
   * Returns reference to a specific component instance by its ID.
   *
   * @param {object} me App Component
   * @returns {string} Root ID
   */
  function getRootComponentId(me) {
    return me?.getOwnerComponent()?.getRootControl()?.getId();
  }

  /**
   * Returns reference to a specific component instance by its ID.
   *
   * @param {object} me App Component
   * @param {sId} Control Id
   * @returns {object} Element Object
   */
  function getCoreId(me, sId) {
    const sRootId = getRootComponentId(me);
    const sInfoId = `${sRootId}--${sId}`;
    return sap.ui.getCore()?.byId(sInfoId);
  }

  /**
   * Executes unbounded custom actions
   * @param {object} me
   * @param {object} model of the onboarding
   * @param {string} action - action service path
   * @param {object} parameters - Payload params
   * @returns {Promise} for the action context
   */
  async function executeUnBoundAction(model, action, parameters = {}) {
    const oBinding = model.bindContext(action, null, [], [], {
      $$getKeepAliveContext: true,
    });
    Object.entries(parameters).forEach(([param, value]) => {
      oBinding.setParameter(param, value);
    });
    return new Promise(function (resolve, reject) {
      oBinding
        .execute()
        .then(function (oContext) {
          const responseData = oBinding.getBoundContext().getObject();
          resolve(responseData);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  return {
    getI18nText,
    getActionTargetData,
    navTo,
    getModel,
    executeAPI,
    getCoreId,
    executeUnBoundAction,
    getAppConfig,
    getRootComponentId,
    shuffleArray
  };
});
