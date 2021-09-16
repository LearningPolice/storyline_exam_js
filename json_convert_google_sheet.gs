function CreateNewFile(myFileName,obj) {

  var allFilesByName, file, myFolder, myVar, theFileID, thisFile;
  //Define var names without assigning a value

  file = {
    title: myFileName
  };

  myFolder = DriveApp.getFolderById('1kd2z0xeTq2fq229QCn-dsKcVymu3J0f1');

  allFilesByName = myFolder.getFilesByName(myFileName);
  if (allFilesByName.hasNext()) {

    while (allFilesByName.hasNext()) {
      file = allFilesByName.next();
      myFolder.removeFile(file);
    }
  } else {

    myFolder.createFile(myFileName,obj)

  }


}



function getSheetData() {
  var ss = SpreadsheetApp.getActive();
  var sh = ss.getSheetByName("data");
  var rng = sh.getRange("A:I");
  values = rng.getValues();
  return values;
}

function BuildingJSON(values) {
  var obj = {};
  data = {};
  subjects = {};
  questions = {};
  data = {};
  subject = {};
  var question = {};

  // Setting banks:
  for (i = 1; i < values.length; i++) {
    if (Object.values(values[i])[2].length > 0) {

      bank_id = "bank_" + values[i][0];
      data[bank_id] = {};

    }
  }

  // Setting subjects:
  for (i = 1; i < values.length; i++) {
    if (Object.values(values[i])[2].length > 0) {

      bank_id = "bank_" + values[i][0];
      subject_id = "subject_" + values[i][1];
      subject[subject_id] = {};

      data[bank_id][subject_id] = {};


    }
  }

  // Setting questions:
  for (i = 1; i < values.length; i++) {
    if (Object.values(values[i])[2].length > 0) {

      bank_id = "bank_" + values[i][0];
      subject_id = "subject_" + values[i][1];
      question_id = "question_option_" + values[i][3];
      subject[subject_id] = {};

      data[bank_id][subject_id][question_id] = {};


    }
  }

  // Setting details of questions subjects:
  for (i = 1; i < values.length; i++) {
    if (Object.values(values[i])[2].length > 0) {

      bank_id = "bank_" + values[i][0];
      subject_id = "subject_" + values[i][1];
      question_id = "question_option_" + values[i][3];
      subject_body = values[i][2];
      subject[subject_id] = {};
      question.question_body = values[i][4];
      question.true_answer = values[i][5];
      question.fail_answer1 = values[i][6];
      question.fail_answer2 = values[i][7];
      question.fail_answer3 = values[i][8];
      data[bank_id][subject_id]["subject_body"] = subject_body;
      data[bank_id][subject_id][question_id] = question;
      question = {};

    }
  }


  obj.data = data;
  return obj;

}

function init() {

  var values = getSheetData();
  obj = BuildingJSON(values);
  json_obj = JSON.stringify(obj);

  // Storing file into the Google Drive:
  var myFileName = 'data.json';

  CreateNewFile(myFileName,json_obj);







}




