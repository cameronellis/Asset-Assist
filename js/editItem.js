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
  $("#submitButton").click(function(){
    let itemNameField    = $("#itemNameField").val();
    let itemPrice        = $("#itemPriceField").val();
    let itemYear         = $("#yearOfPurchase").val();
    let itemPicture      = $("#itemImage").attr("src");
    let itemManufacturer = $("#itemManufacturerField").val();

    // check if all mandatory forms are filled in...
    if( itemNameField !== "" && itemPrice !== "" && itemYear !== "" 
        && itemManufacturer !== ""){
      console.log("All mandatory fields are filled in");
      // let newAssetField = { 
      //                       itemName: $("#itemNameField").val(), itemPrice: $("#itemPriceField").val(),
      //                       itemYear: $("#yearOfPurchase").val(), itemPicture: dataToDisplay.itemPicture,
      //                       itemReceipt: dataToDisplay.itemReceipt, itemManufacturer: $("#itemManufacturerField").val(),
      //                       itemMiscNotes: $("#itemMiscNotesField").val()
      //                     }; 
      // // update the asset with the new information
      // usersAssets[indexToDisplay] = newAssetField;
      // localStorage.setItem(currentlyLoggedInAs + "_assets", JSON.stringify(usersAssets));
      // go to item information page
      // window.location = "../html/itemDetails.html";
    }   
    // All fields not filled in, highlight which ones are and which ones are not 
    else{
      // if item name field is not provided
      if(itemNameField === ""){
        // Give input box a red border
        $("#assetNameSection").addClass("has-error");
        // Error Message
        $("#assetNameError").text("Please provide an asset name");
      }
      else{
        // Give input box a green border
        $("#assetNameSection").addClass("has-success");
      }

      // if item price field is not provided
      if(itemPrice === ""){
        $("#assetPriceSection").addClass("has-error");
        // Error Message
        $("#assetPriceError").text("Please provide the asset's price");
      }
      else{
        $("#assetPriceSection").addClass("has-success");
      }

      // if item year field is not provided
      if(itemYear === ""){
        $("#assetYearSection").addClass("has-error");
        // Error Message
        $("#assetYearError").text("Please provide the asset's year of purchase");
      }
      else{
        $("#assetYearSection").addClass("has-success");
      }

      // if item manufacturer is not provided 
      if(itemManufacturer === ""){
        $("#assetManufacturerSection").addClass("has-error");
        // Error Message
        $("#assetManufacturerError").text("Please provide the asset's manufacturer");
      }
      else{
        $("#assetManufacturerSection").addClass("has-success");
      }
    }

  });
});
