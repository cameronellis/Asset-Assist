
$(document).ready(function(){
    let currentlyLoggedInAs = localStorage.getItem("currentlyLoggedInAs");
    let users_assets = JSON.parse(localStorage.getItem(currentlyLoggedInAs + "_assets"));
    let searchType = localStorage.getItem("searchType");

    // show who is logged in
    let userData = JSON.parse(localStorage.getItem(currentlyLoggedInAs + "_userdata"));
    $("#usersFullName").text("Logged in as: " + userData.fName + " " + userData.lName);

    function appendToHTMLTable(assetName, assetPicture, i){
        $("#table_body_content").append(
            "<tr>" +
                "<td>" +
                    "<a onclick='setIndexToDisplay(" + i + ")'>" +
                        "<img src='" + assetPicture + "' width='100' height='100' alt='Asset image' class='img-thumbnail'/>" +
                    "</a>" +
                "</td>" +
                  "<td><h4>" + assetName + "</h4></td>" +
                "<td>" +
                    "<a class='btn btn-primary' onclick='setIndexToDisplay(" + i + ")'>Asset Details</a>" +
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
            let assetNameToLowerCase = users_assets[i].assetName.toLowerCase();

            // if the search string is a substring of the asset
            if(assetNameToLowerCase.indexOf(searchQueryToLowerCase) !== -1){
                appendToHTMLTable(users_assets[i].assetName, users_assets[i].assetPicture, i);
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
            let assetNameToLowerCase = users_assets[i].assetName.toLowerCase();
            let assetManufacturerToLowerCase = users_assets[i].assetManufacturer.toLowerCase();
            let assetPrice = parseInt(users_assets[i].assetPrice);

            // if asset name provided
            if(advancedSearchQuery.assetName !== ""){
                // if the search string is a substring of the asset
                if(assetNameToLowerCase.indexOf(lowerCaseSearchAssetName) !== -1){
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
                if((assetPrice >= priceRange_lower) && ( assetPrice <= priceRange_upper)){
                    assetPriceWithinSearchPriceRange = true;
                }
                // asset not within search range
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
                if(advancedSearchQuery.yearOfPurchase === users_assets[i].assetYear){
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
                appendToHTMLTable(users_assets[i].assetName, users_assets[i].assetPicture, i);
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
    localStorage.setAsset("indexToDisplay", i);
    window.location = "../html/assetDetails.html";
}
