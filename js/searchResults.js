$(document).ready(function(){
    let currentlyLoggedInAs = localStorage.getItem("currentlyLoggedInAs");
    let users_assets = JSON.parse(localStorage.getItem(currentlyLoggedInAs + "_assets"));
    let searchType = localStorage.getItem("searchType");

    if(searchType === "basic"){
        let searchQuery = localStorage.getItem("searchQuery");
        let searchQueryToLowerCase = searchQuery.toLowerCase();

        // iterate through all of the assts that the users own - filter them through the search query
        for(let i = 0; i < users_assets.length; i++){
            let itemNameToLowerCase = users_assets[i].itemName.toLowerCase();

            // if the search string is a substring of the item
            if(itemNameToLowerCase.indexOf(searchQueryToLowerCase) !== -1){
                $("#table_body_content").append(
                    "<tr>" + 
                        "<td><h3>" + users_assets[i].itemName + "</h3></td>" + 
                        "<td>" + 
                            "<a onclick='setIndexToDisplay(" + i + ")'>" + 
                                "<img src='" + users_assets[i].itemPicture + "' width='100' height='100' alt='Item image' class='img-thumbnail'/>" + 
                            "</a>" + 
                        "</td>" + 
                    "</tr>"
                );
            }
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

        console.log(advancedSearchQuery);

        // iterate through all of the assts that the users own - filter them through advanced search query
        for(let i = 0; i < users_assets.length; i++){
            let itemNameToLowerCase = users_assets[i].itemName.toLowerCase();
            let assetManufacturerToLowerCase = users_assets[i].itemManufacturer.toLowerCase();

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

            // code to see if asset is within the price range

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
            )
            {
                // Append this information to the table
                console.log("itemName: " + users_assets[i].itemName);
                console.log("itemPrice: " + users_assets[i].itemPrice);
                console.log("itemYear: " + users_assets[i].itemYear);
                console.log("itemPicture: " + users_assets[i].itemPicture);
                console.log("itemReceipt: " + users_assets[i].itemReceipt);
                console.log("itemManufacturer: " + users_assets[i].itemManufacturer);
                console.log("itemMiscNotes: " + users_assets[i].itemMiscNotes);
                console.log("");
            }
        }        

    }
});

// When the user clicks on an image, this function determines what data to 
// display on the next page
function setIndexToDisplay(i){
    localStorage.setItem("indexToDisplay", i);
    window.location = "../html/itemDetails.html";
}
