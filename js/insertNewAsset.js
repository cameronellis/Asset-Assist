// Populates options for the "Year of Purchase" field
// code taken from: http://jsfiddle.net/s8HaQ/
let start = new Date().getFullYear();
let end = 1900;
let options = "<option></option>";
for(let year = start ; year >=end; year--){
  options += "<option>"+ year +"</option>";
}
document.getElementById("year").innerHTML = options;

// code to run when an asset image/receipt is uploaded
// taken from: https://stackoverflow.com/questions/6150289/how-to-convert-image-into-base64-string-using-javascript
function encodeImageFileAsURL(inputID, newImgID, divID){
	let filesSelected = document.getElementById(inputID).files;
	if (filesSelected.length > 0) {

      	let fileToLoad = filesSelected[0];
      	let fileReader = new FileReader();

      	fileReader.onload = function(fileLoadedEvent) {
      		let srcData = fileLoadedEvent.target.result; // <--- data: base64

      		let newImage = document.createElement('img');
      		newImage.id  = newImgID;
        	newImage.src = srcData;

        	document.getElementById(divID).innerHTML = newImage.outerHTML;
      	}

      	fileReader.readAsDataURL(fileToLoad);
	}
}

$(document).ready(function(){
	// show who is logged in
	let currentlyLoggedInAs = localStorage.getItem("currentlyLoggedInAs");
	let userData = JSON.parse(localStorage.getItem(currentlyLoggedInAs + "_userdata"));
	$("#usersFullName").text("Logged in as: " + userData.fName + " " + userData.lName);
	
	// When the submit button is clicked
	$("#submitButton").click(function(){
		let itemNameField  = $("#itemNameField").val();
		let itemPriceField = $("#itemPriceField").val();
		let itemYearField  = $("#year").val();
		let itemPictureField = $("#assetImg").attr("src");
		let itemReceiptField = $("#assetReceipt").attr("src");
		let itemManufacturerField = $("#itemManufacturerField").val();
		let itemMiscNotesField = $("#itemMiscNotesField").val();

		// check if all mandatory forms are filled in...
		if(itemNameField !== "" && itemPriceField !== "" && itemYearField !== "" 
			&& itemPictureField !== undefined){
			
			// retrieve users's list of assets from localStorage
			let currentlyLoggedInAs = localStorage.getItem("currentlyLoggedInAs");
			let usersAssets = JSON.parse(localStorage.getItem(currentlyLoggedInAs + "_assets"));

			// insert the new asset into list of assets
			usersAssets.push(	{	
									"itemName": itemNameField,
									"itemPrice": itemPriceField,
									"itemYear": itemYearField,
									"itemPicture": itemPictureField,
									"itemReceipt": itemReceiptField,
									"itemManufacturer": itemManufacturerField,
									"itemMiscNotes": itemMiscNotesField
								});
			try{	
				// insert updated list into localStorage
				localStorage.setItem(currentlyLoggedInAs + "_assets", JSON.stringify(usersAssets));
				
				// go to confirmation page
				window.location = "insertNewAssetConfirmation.html";
			}
			catch(DOMException){
				console.log("Insert Item: Local storage has been maxed out");
				$("#localStorageOutofSpaceError").addClass("alert alert-danger");
				$("#localStorageOutofSpaceError").html("<strong><span class='icon glyphicon glyphicon-remove-circle'></span>Error:</strong> Sorry, we don't have enough space to store this asset for you");
			}
		}

		// All fields not filled in, highlight which ones are and which ones are not
		else{
			// If an item name is not given
			if(itemNameField === ""){
				// Give input box a red border
				$("#itemNameSection").addClass("has-error");
				// Error Message
				$("#itemNameError").addClass("alert alert-danger");
				$("#itemNameError").html("<strong><span class='icon glyphicon glyphicon-remove-circle'></span>Error:</strong> Please provide the asset's name");
			}
			else{
				// Give input box a green border
				$("#itemNameSection").addClass("has-success");
			}

			// if an item price is not given
			if(itemPriceField === ""){
				// Give input box a red border
				$('#itemPriceSection').addClass("has-error");
				// Error message
				$("#priceValueError").addClass("alert alert-danger");
				$("#priceValueError").html("<strong><span class='icon glyphicon glyphicon-remove-circle'></span>Error:</strong> Please provide the asset's price");
			}
			else{
				// Give input box a green border
				$('#itemPriceSection').addClass("has-success");
			}

			// if value in item price field is not a valid number
			if(isNaN(itemPriceField)){
				// Give input box a red border
				$('#itemPriceSection').addClass("has-error");	
				// Error message
				$("#assetPriceError").addClass("alert alert-danger");
				$("#assetPriceError").html("<strong><span class='icon glyphicon glyphicon-remove-circle'></span>Error:</strong> Please provide a valid price for the asset");
			}

			// if an item year is not given
			if(itemYearField === ""){
				// Give input box a red border
				$('#itemYearSection').addClass("has-error");
				// Error message
				$("#yearValueError").addClass("alert alert-danger");
				$("#yearValueError").html("<strong><span class='icon glyphicon glyphicon-remove-circle'></span>Error:</strong> Please provide the year you purchased the asset");
			}
			else{
				$('#itemYearSection').addClass("has-success");
			}

			// if a picture of the item is not given
			if(itemPictureField === undefined){
				// give input box a red border
				$('#itemPictureSection').addClass("has-error");
				// Error message
				$("#pictureOfItemError").addClass("alert alert-danger");
				$('#pictureOfItemError').html("<strong><span class='icon glyphicon glyphicon-remove-circle'></span>Error:</strong> Please provide a picture of the asset");
			}
			else{
				// give input box a green border
				$('#itemPictureSection').addClass("has-success");
			}	
		}
	});
});
