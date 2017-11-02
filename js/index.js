$(document).ready(function(){
	// when the sign in button is clicked
	$("#signInButton").click(function(){
		let loginEmailField = $("#loginEmailField").val();
		let loginPasswordField = $("#loginPasswordField").val();

		console.log("loginEmailField: " + loginEmailField);
		console.log("loginPasswordField: " + loginPasswordField);

		// if email and password are both provided
		if(loginEmailField != "" && loginPasswordField != ""){
			window.location = "html/homepage.html";
		}
		// all mandatory fields are not filled in
		else{
			// Email field not provided
			if(loginEmailField == ""){
				$("#emailFieldSection").addClass("has-error");
				// Error message
				$("#loginFieldError").text("Please provide your account's email");
			}
			// Email field provided
			else{
				$("#emailFieldSection").addClass("has-success");
			}

			// Password field not provided
			if(loginPasswordField == ""){
				$("#passwordFieldSection").addClass("has-error");
				// Error message
				$("#passwordFieldError").text("Please provide your account's password");
			}
			// Password field provided
			else{
				$("#passwordFieldSection").addClass("has-success");
			}
		}
	});
});