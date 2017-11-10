$(document).ready(function(){
	let currentlyLoggedInAs = localStorage.getItem("currentlyLoggedInAs");
	let indexToDisplay = localStorage.getItem("indexToDisplay");
	let usersAssets = JSON.parse(localStorage.getItem(currentlyLoggedInAs + "_assets"));
	let dataToDisplay = usersAssets[indexToDisplay];

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
	// document.getElementById("yearOfPurchase").innerHTML = options;
  $("#yearOfPurchase").html(options);

  // Pre-populate fields
	$("#itemNameField").attr("value", dataToDisplay.itemName);
  $("#itemImage").attr("src", dataToDisplay.itemPicture);
  $("#itemReceipt").attr("src", dataToDisplay.itemReceipt);
	$("#itemPriceField").attr("value", dataToDisplay.itemPrice);
  $("#itemManufacturerField").attr("value", dataToDisplay.itemManufacturer);
  $("#itemMiscNotesField").text(dataToDisplay.itemMiscNotes);

  // console.log(usersAssets);

  $("#submitButton").click(function(){
    let newAssetField = { 
                          itemName: $("#itemNameField").val(), itemPrice: $("#itemPriceField").val(),
                          itemYear: $("#yearOfPurchase").val(), itemPicture: dataToDisplay.itemPicture,
                          itemReceipt: dataToDisplay.itemReceipt, itemManufacturer: $("#itemManufacturerField").val(),
                          itemMiscNotes: $("#itemMiscNotesField").val()
                        }; 
    // update the asset with the new information
    usersAssets[indexToDisplay] = newAssetField;
    localStorage.setItem(currentlyLoggedInAs + "_assets", JSON.stringify(usersAssets));
    window.location = "../html/itemDetails.html";
  });
});