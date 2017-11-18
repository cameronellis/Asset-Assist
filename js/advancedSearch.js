// Populates options for the "year of Purchase" fields
// code taken from: http://jsfiddle.net/s8HaQ/
let start = new Date().getFullYear();
let end = 1900;
let options = "<option></option>";
for(let year = start ; year >=end; year--){
  options += "<option>"+ year +"</option>";
}

document.getElementById("yearOfPurchase").innerHTML = options;

$(document).ready(function() {
  // show who is logged in
  let currentlyLoggedInAs = localStorage.getItem("currentlyLoggedInAs");
  let userData = JSON.parse(localStorage.getItem(currentlyLoggedInAs + "_userdata"));
  $("#usersFullName").text("Logged in as: " + userData.fName + " " + userData.lName);

  // When the search button is clicked
  $("#searchButton").click(function() {
    let assetName = $("#assetName").val();
    let priceRange = $("#priceRange").val();
    let yearOfPurchase = $("#yearOfPurchase").val();
    let assetManufacturer = $("#assetManufacturer").val();
    let searchQuery = {
                        assetName: assetName, priceRange: priceRange, 
                        yearOfPurchase: yearOfPurchase, assetManufacturer: assetManufacturer
                      };

    // update search query
    localStorage.setItem("advancedSearchQuery", JSON.stringify(searchQuery));
    // set search type to advanced
    localStorage.setItem("searchType", "advanced");
  });
});
