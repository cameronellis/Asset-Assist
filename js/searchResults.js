
$(document).ready(function(){
    let currentlyLoggedInAs = localStorage.getItem("currentlyLoggedInAs");
    let users_assets = JSON.parse(localStorage.getItem(currentlyLoggedInAs + "_assets"));
    let searchType = localStorage.getItem("searchType");

    // show who is logged in
    let userData = JSON.parse(localStorage.getItem(currentlyLoggedInAs + "_userdata"));
    $("#usersFullName").text("Logged in as: " + userData.fName + " " + userData.lName);

    function appendToHTMLTable(itemName, itemPicture, i){
        $("#table_body_content").append(
            "<tr>" +
                "<td>" +
                    "<a onclick='setIndexToDisplay(" + i + ")'>" +
                        "<img src='" + itemPicture + "' width='100' height='100' alt='Item image' class='img-thumbnail'/>" +
                    "</a>" +
                "</td>" +
                  "<td><h4>" + itemName + "</h4></td>" +
                "<td>" +
                    "<a class='btn btn-primary' onclick='setIndexToDisplay(" + i + ")'>Item Details</a>" +
                "</td>" +
            "</tr>"
        );
    }

    if(searchType === "basic"){
        let searchQuery = localStorage.getItem("searchQuery");
        let searchQueryToLowerCase = searchQuery.toLowerCase();
        let searchResultCount = 0;

        // iterate through all of the assts that the users own - filter them through the search query
        for(let i = 0; i < users_assets.length; i++){
            let itemNameToLowerCase = users_assets[i].itemName.toLowerCase();

            // if the search string is a substring of the item
            if(itemNameToLowerCase.indexOf(searchQueryToLowerCase) !== -1){
                appendToHTMLTable(users_assets[i].itemName, users_assets[i].itemPicture, i);
                searchResultCount++;
            }
        }

        // if there are no assets to display
        if(searchResultCount === 0){
            $("#errorMessage").text("Your search for \"" + searchQuery + "\" did not match any assets");
        }
    }

    else if(searchType === "advanced"){
        let advancedSearchQuery = JSON.parse(localStorage.getItem("advancedSearchQuery"));

        let searchAssetNameIsSubstringOfAssetName = false;
        let assetPriceWithinSearchPriceRange = false;
        let searchYearMatchesAssetYear = false;
        let searchManufacturerMatchesAssetManufacturer = false;

        let lowerCaseSearchAssetName = advancedSearchQuery.assetName.toLowerCase();
        let lowerCaseSearchManufacturerName = advancedSearchQuery.assetManufacturer.toLowerCase();

        let priceRangeGap = 500;
        let priceRange_lower = parseInt(advancedSearchQuery.priceRange);
        let priceRange_upper = priceRange_lower + priceRangeGap;

        let searchResultCount = 0;

        // iterate through all of the assts that the users own - filter them through advanced search query
        for(let i = 0; i < users_assets.length; i++){
            let itemNameToLowerCase = users_assets[i].itemName.toLowerCase();
            let assetManufacturerToLowerCase = users_assets[i].itemManufacturer.toLowerCase();
            let itemPrice = parseInt(users_assets[i].itemPrice);

            // if asset name provided
            if(advancedSearchQuery.assetName !== ""){
                // if the search string is a substring of the item
                if(itemNameToLowerCase.indexOf(lowerCaseSearchAssetName) !== -1){
                    searchAssetNameIsSubstringOfAssetName = true;
                }
                else{
                    searchAssetNameIsSubstringOfAssetName = false;
                }
            }
            // if asset name is not provided
            else{
                searchAssetNameIsSubstringOfAssetName = true;
            }

            // if price range provided
            if(advancedSearchQuery.priceRange !== ""){
                if((itemPrice >= priceRange_lower) && ( itemPrice <= priceRange_upper)){
                    assetPriceWithinSearchPriceRange = true;
                }
                // item not within search range
                else{
                    assetPriceWithinSearchPriceRange = false;
                }
            }
            // if price range not provided
            else{
                assetPriceWithinSearchPriceRange = true;
            }

            // if search year provided
            if(advancedSearchQuery.yearOfPurchase !== ""){
                if(advancedSearchQuery.yearOfPurchase === users_assets[i].itemYear){
                    searchYearMatchesAssetYear = true;
                }
                else{
                    searchYearMatchesAssetYear = false;
                }
            }
            // if search year not provided
            else{
                searchYearMatchesAssetYear = true;
            }

            // if asset manufacturer provided
            if(advancedSearchQuery.assetManufacturer !== ""){
                // if meanufacturers match
                if( assetManufacturerToLowerCase === lowerCaseSearchManufacturerName ){
                    searchManufacturerMatchesAssetManufacturer = true;
                }
                else{
                    searchManufacturerMatchesAssetManufacturer = false;
                }
            }
            // if not provided, set to true to not have it affect the decision making process
            else{
                searchManufacturerMatchesAssetManufacturer = true;
            }

            // Determine whether or not to display this asset
            if(searchAssetNameIsSubstringOfAssetName
                && searchYearMatchesAssetYear
                && searchManufacturerMatchesAssetManufacturer
                && assetPriceWithinSearchPriceRange
            )
            {
                appendToHTMLTable(users_assets[i].itemName, users_assets[i].itemPicture, i);
                searchResultCount++;
            }
        }

        // if there are no assets to display
        if(searchResultCount === 0){
            $("#errorMessage").text("Your search criteria did not match any assets");
        }
    }
});

// When the user clicks on an image, this function determines what data to
// display on the next page
function setIndexToDisplay(i){
    localStorage.setItem("indexToDisplay", i);
    window.location = "../html/itemDetails.html";
}
