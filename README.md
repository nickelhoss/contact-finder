# Contact Finder
This application is designed to create list of contact details for target companies that can be uploaded to our sales CRM. This app was built using Google Scripts App and the Hunter.io API to loop through a list of urls and grab all public contacts and contact informatoin for employees at those companies.

### getContactInformation
This is the function that loops through the list of urls, calling the Hunter.io API for each url, and printing the relevant contact information for all contacts found to a dedicated sheet in the workbook. This function is connected as a button action within a Google Sheets workbook so that internal users can run the function once they have a desired list of URLs to search.

### emailCheck
This function loops through each of the contacts returned from <strong>getContactInformation</strong> using their email address to check against a list of the contacts already in our CRM to see if we already have a record for this contact. 


