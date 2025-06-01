namespace com.sap.onlineexam;

using {
  cuid
} from '@sap/cds/common';


entity Exams {
  key code     : String(15);
      name     : String;
      duration : Integer;
      question : Composition of many Questions
                   on question.exam = $self;
}

entity Questions {
  key ID       : Integer;
      ques     : String;
      correctAns : Integer;
      answers  : Association to many Answers
                   on answers.ques = $self;
      exam     : Association to Exams;

}

entity Answers : cuid {
  ans       : String;
  isCorrect : Boolean;
  ques      : Association to Questions;
}
