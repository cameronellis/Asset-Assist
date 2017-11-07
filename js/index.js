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

		// The user is allowed to log in
		if( loginEmailField !== "" 
			&& loginPasswordField !== "" 
			&& isEmail(loginEmailField) 
			&& isValidEmailAccount(loginEmailField, loginPasswordField))
		{
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
