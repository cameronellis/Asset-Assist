$(document).ready(function(){
	let currentlyLoggedInAs = localStorage.getItem("currentlyLoggedInAs");
	let indexToDisplay = localStorage.getItem("indexToDisplay");
	let usersAssets = JSON.parse(localStorage.getItem(currentlyLoggedInAs + "_assets"));
	let dataToDisplay = usersAssets[indexToDisplay];
  let userData = JSON.parse(localStorage.getItem(currentlyLoggedInAs + "_userdata"));

  // Populates options for the "Year of Purchase" field
  // code taken from: http://jsfiddle.net/s8HaQ/
  let start = new Date().getFullYear();
  let end = 1900;
  let options = "<option></option>";

  for(let year = start ; year >=end; year--){
    if(year === parseInt(dataToDisplay.itemYear)){
      options += "<option selected>"+ year +"</option>";
    }
    else{
      options += "<option>"+ year +"</option>";
    }
  }
  $("#yearOfPurchase").html(options);

  // Display which app user is logged in
  $("#usersFullName").text("Logged in as: " + userData.fName + " " + userData.lName);

  // Pre-populate fields
	$("#itemNameField").attr("value", dataToDisplay.itemName);
  $("#itemImage").attr("src", dataToDisplay.itemPicture);
  $("#itemReceipt").attr("src", dataToDisplay.itemReceipt);
	$("#itemPriceField").attr("value", dataToDisplay.itemPrice);
  $("#itemManufacturerField").attr("value", dataToDisplay.itemManufacturer);
  $("#itemMiscNotesField").text(dataToDisplay.itemMiscNotes);

  // When the submit button is clicked
  $("#changeAssetDetailsButton").click(function(){
    let itemNameField    = $("#itemNameField").val();
    let itemPrice        = $("#itemPriceField").val();
    let itemYear         = $("#yearOfPurchase").val();
    let itemPicture      = $("#itemImage").attr("src");
    let itemManufacturer = $("#itemManufacturerField").val();

    // All mandatory forms are filled in...
    if( itemNameField !== "" && itemPrice !== "" && itemYear !== "" ){
      let newAssetField = { 
                            itemName: $("#itemNameField").val(), 
                            itemPrice: $("#itemPriceField").val(),
                            itemYear: $("#yearOfPurchase").val(), 
                            itemPicture: $("#itemImage").attr("src"),
                            itemReceipt: $("#itemReceipt").attr("src"), 
                            itemManufacturer: $("#itemManufacturerField").val(),
                            itemMiscNotes: $("#itemMiscNotesField").val()
                          }; 
      // update the asset with the new information
      usersAssets[indexToDisplay] = newAssetField;

      try{
        localStorage.setItem(currentlyLoggedInAs + "_assets", JSON.stringify(usersAssets));
        // go to item information page
        window.location = "../html/itemDetails.html";
      }
      // if local storage has been maxed out - display an error message beneath the submit button
      catch(DOMException){
        console.log("Local storage has been maxed out");
        $("#localStorageOutofSpaceError").addClass("alert alert-danger");
        $("#localStorageOutofSpaceError").html("<strong><span class='icon glyphicon glyphicon-remove-circle'></span>Error:</strong> Sorry, we don't have enough space to store this asset for you");
      }
      
    }   
    // All fields not filled in, highlight which ones are and which ones are not 
    else{
      // if item name field is not provided
      if(itemNameField === ""){
        // Give input box a red border
        $("#assetNameSection").addClass("has-error");
        // Error Message
        $("#assetNameError").addClass("alert alert-danger");
        $("#assetNameError").html("<strong><span class='icon glyphicon glyphicon-remove-circle'></span>Error:</strong> Please provide the asset's name");
      }
      else{
        // Give input box a green border
        $("#assetNameSection").addClass("has-success");
      }

      // if item price field is not provided
      if(itemPrice === ""){
        $("#assetPriceSection").addClass("has-error");
        // Error Message
        $("#assetPriceError").addClass("alert alert-danger");
        $("#assetPriceError").html("<strong><span class='icon glyphicon glyphicon-remove-circle'></span>Error:</strong> Please provide the asset's price");
      }
      else{
        $("#assetPriceSection").addClass("has-success");
      }

      // if item year field is not provided
      if(itemYear === ""){
        $("#assetYearSection").addClass("has-error");
        // Error Message
        $("#assetYearError").addClass("alert alert-danger");
        $("#assetYearError").html("<strong><span class='icon glyphicon glyphicon-remove-circle'></span>Error:</strong> Please provide the asset's year of purchase");
      }
      else{
        $("#assetYearSection").addClass("has-success");
      }
    }
  });
});

// Code adapted from: https://stackoverflow.com/questions/6150289/how-to-convert-image-into-base64-string-using-javascript
function swapOutImage(inputID, imgID){
  let filesSelected = document.getElementById(inputID).files;
  if (filesSelected.length > 0) {

    let fileToLoad = filesSelected[0];
    let fileReader = new FileReader();

    fileReader.onload = function(fileLoadedEvent) {
      // convert inputted image to base64
      let srcData = fileLoadedEvent.target.result;
      let assetImage = document.getElementById(imgID);

      assetImage.src = srcData;
    }

    fileReader.readAsDataURL(fileToLoad);
  }
}
