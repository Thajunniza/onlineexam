sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "com/sap/takeexam/module/util",
    "com/sap/takeexam/module/service",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
  ],
  (Controller, util, service, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("com.sap.takeexam.controller.Home", {
      onInit: function () {
        // Initialize the controller
      },

      onStartExam: async function () {
        const oView = this.getView();
        const oComponent = this.getOwnerComponent();
        const examModel = util.getModel(oComponent, "examModel");
        this.getView().setModel(examModel,"examModel");

        const currentExam = examModel.getCurrentExam();

        if (!currentExam) {
          MessageBox.error(util.getI18nText("examCodeRequired", oComponent));
          return;
        }

        //Get Exam data
        await this.getExamData(currentExam, examModel);

        // Navigate to exam page
        util.navTo(this, "Exam", {
          examId: currentExam,
        });
      },

      getExamData: async function (sExam, examModel) {
        const sEntity = `/Exams`;
        const aFilter = [new Filter("code", FilterOperator.EQ, sExam)];
        const sExpand = `question($expand=answers)`;
        const aData = await service.getEntityData(this, null, sEntity,sExpand, aFilter);
        const oData = aData[0];
        examModel.setExamData(oData);
        const totalQues = oData?.question?.length;
        examModel.setTotalQues(totalQues);
      },
    });
  }
);
