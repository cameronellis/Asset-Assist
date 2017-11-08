$(document).ready(function(){

	// when the sign in button is clicked
	$("#signInButton").click(function(){
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
		function isEmail(email){
		  let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		  return regex.test(email);	
		}

		function initializeUserData(email){
			let person = {};
			
			// determine who is logging in
			if(email === "cameron@gmail.com"){
				person = {fName:"Cameron", lName:"Ellis", email:"cameron@gmail.com", password:"cameron"};
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
			}

			localStorage.setItem(email + "_userdata", JSON.stringify(person));
			localStorage.setItem(email + "_assets"  , JSON.stringify([]));
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
	});
});
