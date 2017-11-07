// code to implement accordion behavior for dropdown menu
// Link to code: https://www.w3schools.com/howto/howto_js_accordion.asp

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].onclick = function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  }
}

// localStorage - retrieve information from it and populate fields
$(document).ready(function(){
	// retrieve list of assets for the user
	let assets = JSON.parse(localStorage.getItem("howard@gmail.com"));
	// the last element in the list is the last element to have been inserted
	let assetToDisplay = assets[assets.length - 1];
	
	// Display content in its respective place in the page
	$("#itemName").text(assetToDisplay.itemName);
	$("#itemPrice").text("$ " + assetToDisplay.itemPrice);
	$("#itemYear").text(assetToDisplay.itemYear);
	$("#itemManufacturer").text(assetToDisplay.itemManufacturer);

});
