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
		let assetNameField  = $("#assetNameField").val();
		let assetPriceField = $("#assetPriceField").val();
		let assetYearField  = $("#year").val();
		let assetPictureField = $("#assetImg").attr("src");
		let assetReceiptField = $("#assetReceipt").attr("src");
		let assetManufacturerField = $("#assetManufacturerField").val();
		let assetMiscNotesField = $("#assetMiscNotesField").val();

		// check if all mandatory forms are filled in...
		if(assetNameField !== "" && assetPriceField !== "" && assetYearField !== "" 
			&& assetPictureField !== undefined){
			
			// retrieve users's list of assets from localStorage
			let currentlyLoggedInAs = localStorage.getItem("currentlyLoggedInAs");
			let usersAssets = JSON.parse(localStorage.getItem(currentlyLoggedInAs + "_assets"));

			// insert the new asset into list of assets
			usersAssets.push(	{	
									"assetName": assetNameField,
									"assetPrice": assetPriceField,
									"assetYear": assetYearField,
									"assetPicture": assetPictureField,
									"assetReceipt": assetReceiptField,
									"assetManufacturer": assetManufacturerField,
									"assetMiscNotes": assetMiscNotesField
								});
			try{	
				// insert updated list into localStorage
				localStorage.setAasset(currentlyLoggedInAs + "_assets", JSON.stringify(usersAssets));
				
				// go to confirmation page
				window.location = "insertNewAssetConfirmation.html";
			}
			catch(DOMException){
				console.log("Insert Asset: Local storage has been maxed out");
				$("#localStorageOutofSpaceError").addClass("alert alert-danger");
				$("#localStorageOutofSpaceError").html("<strong><span class='icon glyphicon glyphicon-remove-circle'></span>Error:</strong> Sorry, we don't have enough space to store this asset for you");
			}
		}

		// All fields not filled in, highlight which ones are and which ones are not
		else{
			// If an asset name is not given
			if(assetNameField === ""){
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

			// if an asset price is not given
			if(assetPriceField === ""){
				// Give input box a red border
				$('#assetPriceSection').addClass("has-error");
				// Error message
				$("#priceValueError").addClass("alert alert-danger");
				$("#priceValueError").html("<strong><span class='icon glyphicon glyphicon-remove-circle'></span>Error:</strong> Please provide the asset's price");
			}
			else{
				// Give input box a green border
				$('#assetPriceSection').addClass("has-success");
			}

			// if value in asset price field is not a valid number
			if(isNaN(assetPriceField)){
				// Give input box a red border
				$('#assetPriceSection').addClass("has-error");	
				// Error message
				$("#assetPriceError").addClass("alert alert-danger");
				$("#assetPriceError").html("<strong><span class='icon glyphicon glyphicon-remove-circle'></span>Error:</strong> Please provide a valid price for the asset");
			}

			// if an asset year is not given
			if(assetYearField === ""){
				// Give input box a red border
				$('#assetYearSection').addClass("has-error");
				// Error message
				$("#yearValueError").addClass("alert alert-danger");
				$("#yearValueError").html("<strong><span class='icon glyphicon glyphicon-remove-circle'></span>Error:</strong> Please provide the year you purchased the asset");
			}
			else{
				$('#assetYearSection').addClass("has-success");
			}

			// if a picture of the asset is not given
			if(assetPictureField === undefined){
				// give input box a red border
				$('#assetPictureSection').addClass("has-error");
				// Error message
				$("#pictureOfAssetError").addClass("alert alert-danger");
				$('#pictureOfAssetError').html("<strong><span class='icon glyphicon glyphicon-remove-circle'></span>Error:</strong> Please provide a picture of the asset");
			}
			else{
				// give input box a green border
				$('#assetPictureSection').addClass("has-success");
			}	
		}
	});
});
