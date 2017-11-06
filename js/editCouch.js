// Populates options for the "year of Purchase" fields
let start = new Date().getFullYear();
let end = 1900;
let options = "<option></option>";
for(let year = start ; year >=end; year--){
  if(year != 2003) {
    options += "<option>"+ year +"</option>";
  }
  // makes year selected default 2003
  else {
    options += "<option selected>" + year + "</option>"
  }
}

document.getElementById("yearOfPurchase").innerHTML = options;
