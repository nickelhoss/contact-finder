function emailCheck() {
    let resultsSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let contactsSpreadsheet = SpreadsheetApp.openById('process.env.CONTACT_STORAGE_SHEET');
    let resultsSheet = resultsSpreadsheet.getSheetByName('Contact Results');
    let contactsSheet = contactsSpreadsheet.getSheetByName('Contact Storage Sheet');
    let resultsLastRow = resultsSheet.getLastRow();
    let contactsSheetLastRow = contactsSheet.getLastRow();
    let checkList = contactsSheet.getRange(2,5,contactsSheetLastRow); 
    
      for (let i = 2; i<= resultsLastRow; i ++){
      let emailCheckList = resultsSheet.getRange(i, 5);  
      let currentEmailToCheck = emailCheckList.getValue();
      let emailFinder = checkList.createTextFinder(currentEmailToCheck).findNext();
        if(emailFinder !== null){
          let checkedEmailResultsRange = resultsSheet.getRange("M" + i + ":M" + i); 
          checkedEmailResultsRange.setValue("Existing Contact")
        }
      }
    
  }