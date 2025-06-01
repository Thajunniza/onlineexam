sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "com/sap/takeexam/module/util",
    "com/sap/takeexam/module/service",
  ],
  (Controller, util, service) => {
    "use strict";

    return Controller.extend("com.sap.takeexam.controller.Exam", {
      onInit() {
        const oView = this.getView();
        const oComponent = this.getOwnerComponent();
        const examModel = util.getModel(oComponent, "examModel");
        oView.setModel(examModel, "examModel");
        const currentQuestionIndex = examModel.getCurrentQuesIndex();
        const oQuesVBox = oView.byId("__QuesVBox");
        if (oQuesVBox) {
          // Create and set a binding context properly
          const sPath = `examModel>question/${currentQuestionIndex}`; // Assuming root path is /question
          oQuesVBox.bindElement({
            path: sPath,
          });
        }
      },

      onNextQuestion: function () {
        const oView = this.getView();
        const oComponent = this.getOwnerComponent();
        const examModel = oComponent.getModel("examModel");
        examModel.setNextQues();
        const currentQuestionIndex = examModel.getCurrentQuesIndex();
        const oQuesVBox = oView?.byId("__QuesVBox");
        if (oQuesVBox) {
          // Create and set a binding context properly
          const sPath = `examModel>question/${currentQuestionIndex}`; // Assuming root path is /question
          oQuesVBox.bindElement({
            path: sPath,
          });
        }
      },

      onPreviousQuestion: function () {
        const oView = this.getView();
        const oComponent = this.getOwnerComponent();
        const examModel = oComponent.getModel("examModel");
        examModel.setPrevQues();
        const currentQuestionIndex = examModel.getCurrentQuesIndex();
        const oQuesVBox = oView?.byId("__QuesVBox");
        const oModel = oComponent.getModel();
        if (oQuesVBox && oModel) {
          // Create and set a binding context properly
          const sPath = `examModel>question/${currentQuestionIndex}`; // Assuming root path is /question
          oQuesVBox.bindElement({
            path: sPath,
          });
        }
      },

      onSubmitExam: function () {
        const oView = this.getView();
        const oComponent = this.getOwnerComponent();
        const examModel = oComponent.getModel("examModel");
        const aAllQuestions = examModel.getAllQuestions();

        let aResults = [];

        aAllQuestions.forEach(q => {
          const aSelected = q.answers.filter(a => a.selected);
          const aCorrect = q.answers.filter(a => a.isCorrect);

          const isCorrect =
            aSelected.length === aCorrect.length &&
            aSelected.every(sel => sel.isCorrect);

          aResults.push({
            questionId: q.ID,
            question: q.ques,
            isCorrect: isCorrect,
            selectedAnswers: aSelected.map(a => a.ans),
            correctAnswers: aCorrect.map(a => a.ans)
          });
        });

        console.log("Submission Results:", aResults);
        examModel.setResults(aResults);
         const score = aResults.filter(r => r.isCorrect).length;
         examModel.setScore(score);

        // Optional: show summary
        const correctCount = aResults.filter(r => r.isCorrect).length;
        // Navigate to exam page
        util.navTo(this, "Result");
       console.log(`You got ${correctCount} out of ${aAllQuestions.length} questions right.`);
      }

    
    });
  }
);
