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

		console.log("itemPictureField: " + itemPictureField);
		console.log("itemReceiptField: " + itemReceiptField);

		// check if all mandatory forms are filled in...
		if(itemNameField !== "" && itemPriceField !== "" && itemYearField !== "" 
			&& itemPictureField !== undefined && itemManufacturerField !== ""){
			
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
			}

		}
		// All fields not filled in, highlight which ones are and which ones are not
		else{
			// If an item name is not given
			if(itemNameField === ""){
				// Give input box a red border
				$("#itemNameSection").addClass("has-error");
				// Error Message
				$("#itemNameError").text("Please provide an item name");
			}
			else{
				$("#itemNameSection").addClass("has-success");
			}

			// if an item price is not given
			if(itemPriceField === ""){
				// Give input box a red border
				$('#itemPriceSection').addClass("has-error");
				// Error message
				$("#priceValueError").text("Please provide the item's price");
			}
			else{
				$('#itemPriceSection').addClass("has-success");
			}

			// if value in item price field is not a valid number
			if(isNaN(itemPriceField)){
				// Give input box a red border
				$('#itemPriceSection').addClass("has-error");	
				// Error message
				$("#priceValueError").text("Please provide a valid price");							
			}

			// if an item year is not given
			if(itemYearField === ""){
				// give input box a red border
				$('#itemYearSection').addClass("has-error");
				// Error message
				$("#yearValueError").text("Please provide the year of purchase");
			}
			else{
				$('#itemYearSection').addClass("has-success");
			}

			// if a picture of the item is not given
			if(itemPictureField === undefined){
				// give input box a red border
				$('#itemPictureSection').addClass("has-error");
				// Error message
				$('#pictureOfItemError').text("Please provide a picture of the item");
			}
			else{
				// give input box a green border
				$('#itemPictureSection').addClass("has-success");
			}

			if(itemManufacturerField === ""){
				// give input box a red border
				$("#itemManufacturerSection").addClass("has-error");
				// Error message
				$("#manufacturerNameError").text("Please provide the item's manufacturer");
			}
			else{
				// give input box a green border
				$("#itemManufacturerSection").addClass("has-success");
			}	
		}
	});
});
