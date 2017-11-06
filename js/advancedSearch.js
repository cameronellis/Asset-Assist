// Populates options for the "year of Purchase" fields
let start = new Date().getFullYear();
let end = 1900;
let options = "<option></option>";
for(let year = start ; year >=end; year--){
  options += "<option>"+ year +"</option>";
}

document.getElementById("yearOfPurchase").innerHTML = options;

$(document).ready(function() {
  // When the search button is clicked
  $("#searchButton").click(function() {
    let itemName = $("#itemName").val();
    let priceRange = $("#priceRange").val();
    let yearOfPurchase = $("#yearOfPurchase").val();
    let manufacturer = $("#manufacturer").val();
  });
});
