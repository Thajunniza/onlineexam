sap.ui.define(["sap/ui/model/json/JSONModel"], function (JSONModel, Util) {
  "use strict";

  const initialData = {
    currentExam: "",
    currentQuestionIndex: 0,
    get currentQues() {
      return this.currentQuestionIndex + 1;
    },
    get isPrev(){
        return this.currentQues > 1 ?  true :false;
    },
    get isNext(){
        return this.currentQues < this.totalQues ?  true :false;
    },
    totalQues: 0,
    examData: null,
    results: [],
    score:0,
    showAns:false
  };

  return JSONModel.extend("com.sap.shae.flp.plugins.homepage.chatModel", {
    /**
     * Constructor for the Chat Model - initialize the data
     */
    constructor: function () {
      JSONModel.prototype.constructor.apply(this, arguments);

      this.reset();
    },

    /**
     * Resets the model's Chat
     */
    reset: function () {
      this.setProperty("/", Object.create(initialData));
    },

    /**
     * Returns the current Ques Index.
     *
     * @returns {string} currentQuestionIndex
     */
    getCurrentQuesIndex: function () {
      const currentQuestionIndex = this.getProperty("/currentQuestionIndex");
      return currentQuestionIndex;
    },

    /**
     * Increment the Question.
     *
     *
     */
    setNextQues: function () {
      const currentQuestionIndex = this.getProperty("/currentQuestionIndex");
      this.setProperty("/currentQuestionIndex", currentQuestionIndex + 1);
    },

    /**
     * Increment the Question.
     *
     *
     */
    setPrevQues: function () {
      const currentQuestionIndex = this.getProperty("/currentQuestionIndex");
      this.setProperty("/currentQuestionIndex", currentQuestionIndex - 1);
    },

    /**
     * Returns the current Exam.
     *
     * @returns {string} currentExam
     */
    getCurrentExam: function () {
      const currentExam = this.getProperty("/currentExam");
      return currentExam;
    },

    /**
     * Returns the current Exam.
     *
     * @returns {string} currentExam
     */
    setExamData: function (oData) {
      this.setProperty("/examData", oData);
    },

    /**
     * Set the total question.
     *
     * @returns {Integer} totalQues
     */
    setTotalQues: function (totalQues) {
      this.setProperty("/totalQues", totalQues);
    },

     /**
     * Set the total question.
     *
     * @returns {Integer} totalQues
     */
    setScore: function (score) {
      this.setProperty("/score", score);
    },


    /**
     * Returns the All Questions.
     *
     * @returns {string} 
     */
    getAllQuestions: function () {
      const oData = this.getProperty("/examData");
      const aAllQuestions = oData?.question;
      return aAllQuestions;
    },

    /**
     * Set the Results
     *
     * 
     */
    setResults: function (aResults) {
      this.setProperty("/results", aResults);
    }

    ,

    /**
     * Toggle Show Answer
     *
     * 
     */
    toggleShowAns: function () {
      const showAns = this.getProperty("/showAns");
      this.setProperty("/showAns", !showAns);
    }
  });
});
