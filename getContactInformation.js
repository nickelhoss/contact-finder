function getContactInformation() {

    const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
    const urlSheet = spreadSheet.getSheetByName('URL Sheet');
    let lastRow = urlSheet.getLastRow();
    const resultsSheet = spreadSheet.getSheetByName('Contact Results');
  
    let startingResultsLastRow = resultsSheet.getLastRow();
    let resultsRange = resultsSheet.getRange(2,1, startingResultsLastRow, 12);
    let clearResultsRange = resultsSheet.getRange(2,1, startingResultsLastRow, 13);
    let oldResults = resultsRange.getValues();
    
    const conferenceContactResultsSpreadsheet = SpreadsheetApp.openById('process.env.CONTACT_STORAGE_SHEET');
    let contactStorageSheet = conferenceContactResultsSpreadsheet.getSheetByName('Contact Storage Sheet');
    let contactStorageSheetLastRow = contactStorageSheet.getLastRow();
    let contactStorageSheetPasteRange = contactStorageSheet.getRange(contactStorageSheetLastRow + 1, 1, startingResultsLastRow,12);
    contactStorageSheetPasteRange.setValues(oldResults);
    clearResultsRange.clearContent();
  
    const companiesImportSheet = spreadSheet.getSheetByName('Companies Import');
    let clearCompaniesRange = companiesImportSheet.getRange('A2:D');
    clearCompaniesRange.clearContent();
  
    const getQueryCell = companiesImportSheet.getRange(2,1);
    getQueryCell.setValue('=iferror(query(contactResults,"select A,B where L = TRUE"),"Update URL list.")');
  
    for (let i = 2; i<= lastRow;i++){
      let rawUrl = urlSheet.getRange(i,1).trimWhitespace();
      let currentUrl = rawUrl.getValue();
      let rawCompanyName = urlSheet.getRange(i,2).trimWhitespace();
      let currentCompanyName = rawCompanyName.getValue();
      let hunterURL = 'https://api.hunter.io/v2/domain-search?domain=' + currentUrl + '&api_key=' + process.env.API_KEY;
      let fetchResponse = UrlFetchApp.fetch(hunterURL);
      let obj = JSON.parse(fetchResponse.getContentText());
      let objData = obj['data']['emails'];
        
        
      for (let i=0;i<objData.length;i++){
        let email = objData[i].value;
        let firstName = objData[i].first_name;
        let lastName = objData[i].last_name;
        let phoneNumber = objData[i].phone_number;
        let position = objData[i].position;
        let department = objData[i].department;
        let confidence = objData[i].confidence;
        let verificationDate = objData[i].verification['date'];
        let status = objData[i].verification['status'];
  
        let contactData = [currentUrl, currentCompanyName, firstName, lastName, email, "'"+phoneNumber, position, department, confidence+"%", verificationDate, status];
        resultsSheet.appendRow(contactData);
        Logger.log(contactData);
        
        } 
      
    }
    let resultsLastRow = resultsSheet.getLastRow();
    let checkboxRange = resultsSheet.getRange(2, 12, resultsLastRow);
    checkboxRange.insertCheckboxes();
  
  
  
  }
  
  
  
  