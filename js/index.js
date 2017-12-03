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
							itemName:"ACER computer monitor", itemPrice:"600", itemYear:"2015",
							itemPicture:"https://goo.gl/EpK23A", itemReceipt:"https://goo.gl/xtTnZi",
							itemManufacturer:"ACER", itemMiscNotes:"My new computer monitor!"								
						},
						{
							itemName:"old computer monitor", itemPrice:"40", itemYear:"1997",
							itemPicture:"https://goo.gl/emRYCT", itemReceipt:"https://goo.gl/4Gbu1H",
							itemManufacturer:"HP", itemMiscNotes:"Picked this up from my grandpa"
						},
						{
							itemName:"keyboard", itemPrice:"60", itemYear:"2013",
							itemPicture:"https://goo.gl/6SW45B", itemReceipt:"https://goo.gl/3hZ1QU",
							itemManufacturer:"ACER", itemMiscNotes:"bought this on newegg"
						},
						{
							itemName:"laptop", itemPrice:"750", itemYear:"2015",
							itemPicture:"https://goo.gl/t8dFmP", itemReceipt:"https://goo.gl/8Dv6eG",
							itemManufacturer:"HP", itemMiscNotes:""
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
							itemName:"Purple couch", itemPrice:"1200", itemYear:"2000", 
							itemPicture:"https://goo.gl/KuZ75L", itemReceipt:"https://goo.gl/xtTnZi", 
							itemManufacturer:"Ikea", itemMiscNotes:"Some misc notes"
						},
						{
							itemName:"Blue couch", itemPrice:"2000", itemYear:"2017",
							itemPicture:"https://goo.gl/kfF5tT", itemReceipt:"https://goo.gl/4Gbu1H",
							itemManufacturer:"Living Spaces", itemMiscNotes:"This couch is in my living room"
						},
						{
							itemName:"Black Couch", itemPrice:"1500", itemYear:"1994",
							itemPicture:"https://goo.gl/3aunJg", itemReceipt:"https://goo.gl/3hZ1QU",
							itemManufacturer:"Wal-Mart", itemMiscNotes:"This was a wedding gift"
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
