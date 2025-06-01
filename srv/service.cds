using {com.sap.onlineexam as onlineexam} from '../db/schema.cds';

@requires: 'authenticated-user'
service OnlineExam {

  entity Exams     as projection on onlineexam.Exams;
  entity Questions as projection on onlineexam.Questions;
  entity Answers   as projection on onlineexam.Answers;

}
