// show who is logged in
let currentlyLoggedInAs = localStorage.getItem("currentlyLoggedInAs");
// retrieve recent searches from local storage
let recentSearches = JSON.parse(localStorage.getItem(currentlyLoggedInAs + "_recentSearches"));
  
$(document).ready(function(){
  let userData = JSON.parse(localStorage.getItem(currentlyLoggedInAs + "_userdata"));


  // populate recent searches
  for(let i = 0; i < recentSearches.length; i++){
    $("#recentSearchesSection").append(
      "<a onclick='recentSearchValueIndex(" + i + ")'>" +
        "<h3>" + recentSearches[i] + "</h3>" + 
      "</a>");
  }

  // display who is currently logged in
  $("#usersFullName").text("Logged in as: " + userData.fName + " " + userData.lName);

  // When the search button is clicked
  $("#searchButton").click(executeBasicSearch);
});

function updateRecentSearches(searchName){
  let numberOfRecentSearchesToDisplay = 4;
  let searchNameNotInRecentSearches = true;

  for(let i = 0; i < recentSearches.length; i++){
    if(searchName === recentSearches[i]){
      searchNameNotInRecentSearches = false;
    }
  }

  if(searchNameNotInRecentSearches){
    // append to front of array
    recentSearches.unshift(searchName);
  }

  if(recentSearches.length > numberOfRecentSearchesToDisplay){
    // remove last elem
    recentSearches.pop();
  }

  // put recent searches back in local storage
  localStorage.setItem(currentlyLoggedInAs + "_recentSearches", JSON.stringify(recentSearches));

}

function executeBasicSearch(){
  let searchName = $("#searchName").val();

  // Check if search box is filled
  if(searchName !== ""){
    // Update recent searches
    updateRecentSearches(searchName);
    // set search query term here
    localStorage.setItem("searchQuery", searchName);
    // set search type to basic
    localStorage.setItem("searchType", "basic");
    // go to search results page
    window.location = "searchResults.html";
  }
  // else search box is not filled
  else {
    // Give input box a red border
    $("#searchNameSection").addClass("has-error");
    // Error Message
    $("#searchNameError").text("Please provide an item name to search");
  }
}

function recentSearchValueIndex(searchIndex){
  // set searchQuery to recent search list item
  localStorage.setItem("searchQuery", recentSearches[searchIndex]);
  // set search type to basic
  localStorage.setItem("searchType", "basic");
  // go to search results page
  window.location = "searchResults.html";  
}

// Reference: https://stackoverflow.com/questions/979662/how-to-detect-pressing-enter-on-keyboard-using-jquery
$(document).keypress(function(e) {
    if(e.which == 13) {
      executeBasicSearch();
    }
});
