// code to execute when the user either presses the enter key or clicks [Sign In]
function authenticateUser(){

	let loginEmailField = $("#loginEmailField").val();
	let loginPasswordField = $("#loginPasswordField").val();
	let wrongPassword = false;
	let emailDoesNotExist = false;

	let userAccounts = [	["cameron@gmail.com","cameron"],
							["fernando@gmail.com","fernando"],
							["mary@yahoo.com","mary"],
							["dean@hotmail.com","dean"],
							["howard@gmail.com", "howard"]
						];

	function isValidEmailAccount(email, password){
		for(let i = 0; i < userAccounts.length; i++){
			// valid email account - allow to proceed to next page
			if(email === userAccounts[i][0] && password === userAccounts[i][1]){
				return true;
			}
			// valid email exists - wrong password given
			else if(email === userAccounts[i][0] && password !== userAccounts[i][1]){
				wrongPassword = true;
				return false;
			}
		}
		// email account does not exist
		emailDoesNotExist = true;
		return false;
	}
		
	// Given a String, will determind if String is an email address
	// Reference: http://www.javascriptkit.com/javatutors/re.shtml
	function isEmail(email){
	  let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	  return regex.test(email);	
	}

	function initializeUserData(email){
		let person = {};
		let assets = [];
		let recentSearches = [];

		// determine who is logging in
		if(email === "cameron@gmail.com"){
			person = {fName:"Cameron", lName:"Ellis", email:"cameron@gmail.com", password:"cameron"};
			// populate account with fake data
			assets = [
						{
							assetName:"ACER computer monitor", assetPrice:"600", assetYear:"2015",
							assetPicture:"https://goo.gl/EpK23A", assetReceipt:"https://goo.gl/xtTnZi",
							assetManufacturer:"ACER", assetMiscNotes:"My new computer monitor!"								
						},
						{
							assetName:"old computer monitor", assetPrice:"40", assetYear:"1997",
							assetPicture:"https://goo.gl/emRYCT", assetReceipt:"https://goo.gl/4Gbu1H",
							assetManufacturer:"HP", assetMiscNotes:"Picked this up from my grandpa"
						},
						{
							assetName:"keyboard", assetPrice:"60", assetYear:"2013",
							assetPicture:"https://goo.gl/6SW45B", assetReceipt:"https://goo.gl/3hZ1QU",
							assetManufacturer:"ACER", assetMiscNotes:"bought this on newegg"
						},
						{
							assetName:"laptop", assetPrice:"750", assetYear:"2015",
							assetPicture:"https://goo.gl/t8dFmP", assetReceipt:"https://goo.gl/8Dv6eG",
							assetManufacturer:"HP", assetMiscNotes:""
						}
					];
		}
		if(email === "fernando@gmail.com"){
			person = {fName:"Fernando", lName:"Cortez", email:"fernando@gmail.com", password:"fernando"};
		}
		if(email === "mary@yahoo.com"){
			person = {fName:"Mary", lName:"Doggett", email:"mary@yahoo.com", password:"mary"};
		}
		if(email === "dean@howmail.com"){
			person = {fName:"Dean", lName:"Ravida", email:"dean@hotmail.com", password:"dean"};
		}
		if(email === "howard@gmail.com"){
			person = {fName:"Howard", lName:"Schlottmann", email:"howard@gmail.com", password:"howard"};
			// populate account with fake data
			assets = [
						{	
							assetName:"Purple couch", assetPrice:"1200", assetYear:"2000", 
							assetPicture:"https://goo.gl/KuZ75L", assetReceipt:"https://goo.gl/xtTnZi", 
							assetManufacturer:"Ikea", assetMiscNotes:"Some misc notes"
						},
						{
							assetName:"Blue couch", assetPrice:"2000", assetYear:"2017",
							assetPicture:"https://goo.gl/kfF5tT", assetReceipt:"https://goo.gl/4Gbu1H",
							assetManufacturer:"Living Spaces", assetMiscNotes:"This couch is in my living room"
						},
						{
							assetName:"Black Couch", assetPrice:"1500", assetYear:"1994",
							assetPicture:"https://goo.gl/qqpXRp", assetReceipt:"https://goo.gl/3hZ1QU",
							assetManufacturer:"Wal-Mart", assetMiscNotes:"This was a wedding gift"
						},
						{
							assetName:"Brown grandfather clock", assetPrice:"1600", assetYear:"1901",
							assetPicture:"https://goo.gl/YdeacM", assetReceipt:"https://goo.gl/8Dv6eG",
							assetManufacturer:"Target", assetMiscNotes:"I got this from my sister"
						},
						{
							assetName:"Toy grandfather clock christmas ornament", assetPrice:"2.99", assetYear:"2002",
							assetPicture:"https://goo.gl/6c9rdo", assetReceipt:"https://goo.gl/xtTnZi",
							assetManufacturer:"Ikea", assetMiscNotes:""
						},
						{
							assetName:"Yellow grandfather clock", assetPrice:"299.99", assetYear:"2016",
							assetPicture:"https://goo.gl/3LznTK", assetReceipt:"https://goo.gl/4Gbu1H",
							assetManufacturer:"Sears", assetMiscNotes:"I got this from my brother"
						},
						{
							assetName:"Small black coffee table", assetPrice:"29.99", assetYear:"2014",
							assetPicture:"https://goo.gl/nVT5Cx", assetReceipt:"https://goo.gl/3hZ1QU",
							assetManufacturer:"Dale's Table Emporeum", assetMiscNotes:"I won this in a raffle"
						},
						{
							assetName:"brown circular dining table", assetPrice:"1299.99", assetYear:"1927",
							assetPicture:"https://goo.gl/QdKgLC", assetReceipt:"https://goo.gl/8Dv6eG",
							assetManufacturer:"Dale's Table Emporeum", assetMiscNotes:"This is in my dining room"
						},
						{
							assetName:"light brown study table", assetPrice:"300.00", assetYear:"2006",
							assetPicture:"https://goo.gl/sxB8YW", assetReceipt:"https://goo.gl/xtTnZi",
							assetManufacturer:"Sears", assetMiscNotes:""
						}
					];
		}

		localStorage.setItem(email + "_userdata"      , JSON.stringify(person));
		localStorage.setItem(email + "_assets"        , JSON.stringify(assets));
		localStorage.setItem(email + "_recentSearches", JSON.stringify(recentSearches));
	}

	// The user is allowed to log in
	if( loginEmailField !== "" 
		&& loginPasswordField !== "" 
		&& isEmail(loginEmailField) 
		&& isValidEmailAccount(loginEmailField, loginPasswordField))
	{
		// indicate who is logging in
		localStorage.setItem("currentlyLoggedInAs", loginEmailField);
		// initialize data for this user
		initializeUserData(loginEmailField);
		window.location = "html/homepage.html";
	}
	// The user is not allowed to log in
	else{
		// Email field not provided
		if(loginEmailField === ""){
			$("#emailFieldSection").addClass("has-error");
			// Error message
			$("#loginFieldError").text("Please provide your account's email");
		}
		// Invalid email address given
		else if(!isEmail(loginEmailField)){
			$("#emailFieldSection").addClass("has-error");
			// Error message
			$("#loginFieldError").text("Please provide a valid email address");				
		}
		// Email field provided
		else{
			$("#emailFieldSection").addClass("has-success");
		}

		// Password field not provided
		if(loginPasswordField === ""){
			$("#passwordFieldSection").addClass("has-error");
			// Error message
			$("#passwordFieldError").text("Please provide your account's password");
		}
		// Password field provided
		else{
			$("#passwordFieldSection").addClass("has-success");
		}

		if(wrongPassword){
			$("#passwordFieldSection").addClass("has-error");
			// Error message
			$("#passwordFieldError").text("Incorrect password given for this account");
		}

		if(emailDoesNotExist){
			$("#emailFieldSection").addClass("has-error");
			// Error message
			$("#loginFieldError").text("An account does not exist for this email");				
		}
	}
}

$(document).ready(function(){
	// when the sign in button is clicked
	$("#signInButton").click(authenticateUser);
});

// Reference: https://stackoverflow.com/questions/979662/how-to-detect-pressing-enter-on-keyboard-using-jquery
$(document).keypress(function(e) {
    if(e.which == 13) {
        authenticateUser();
    }
});
