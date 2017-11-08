// Populates options for the "Year of Purchase" field
// code taken from: http://jsfiddle.net/s8HaQ/
let start = new Date().getFullYear();
let end = 1900;
let options = "<option></option>";
for(let year = start ; year >=end; year--){
  options += "<option>"+ year +"</option>";
}
document.getElementById("year").innerHTML = options;

// Navigate away warning on incomplete form when the user clicks the back button
// in their browser or when the user tries to close the window
// window.onbeforeunload = function(){
// 	return true;
// }

$(document).ready(function(){
	// When the submit button is clicked
	$("#submitButton").click(function(){
		let itemNameField  = $("#itemNameField").val();
		let itemPriceField = $("#itemPriceField").val();
		let itemYearField  = $("#year").val();
		let itemPictureField = $("#itemPictureField").val();
		let itemReceiptField = $("#itemReceiptField").val();
		let itemManufacturerField = $("#itemManufacturerField").val();
		let itemMiscNotesField = $("#itemMiscNotesField").val();

		// check if all mandatory forms are filled in...
		if(itemNameField !== "" && itemPriceField !== "" && itemYearField !== "" 
			&& itemPictureField !== "" && itemReceiptField !== "" && itemManufacturerField !== ""){
			
			// retrieve Howard's list of assets from localStorage
			let listOfAssets = JSON.parse(localStorage.getItem("howard@gmail.com"));
			// insert the new asset into list of assets
			listOfAssets.push(	{	"itemName": itemNameField,
									"itemPrice": itemPriceField,
									"itemYear": itemYearField,
									"itemPicture": itemPictureField,
									"itemReceipt": itemReceiptField,
									"itemManufacturer": itemManufacturerField,
									"itemMiscNotes": itemMiscNotesField
								});
			// insert updated list into localStorage
			localStorage.setItem("howard@gmail.com", JSON.stringify(listOfAssets));
			
			// go to confirmation page
			window.location = "insertNewAssetConfirmation.html";

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
			if(itemPictureField === ""){
				// give input box a red border
				$('#itemPictureSection').addClass("has-error");
				// Error message
				$('#pictureOfItemError').text("Please provide a picture of the item");
			}
			else{
				// give input box a green border
				$('#itemPictureSection').addClass("has-success");
			}

			// Please provide a receipt of the item
			if(itemReceiptField === ""){
				// give input box a red border
				$("#itemReceiptSection").addClass("has-error");
				// Error message
				$("#pictureOfReceiptError").text("Please provide a picture of the receipt of the item");
			}
			else{
				// give input box a green border
				$("#itemReceiptSection").addClass("has-success");
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