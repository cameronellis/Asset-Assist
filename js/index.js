$(document).ready(function(){
	// when the sign in button is clicked
	$("#signInButton").click(function(){
		let loginEmailField = $("#loginEmailField").val();
		let loginPasswordField = $("#loginPasswordField").val();

		// if email and password are both provided and email field is a valid email
		if(loginEmailField !== "" && isEmail(loginEmailField) && loginPasswordField !== ""){
			window.location = "html/homepage.html";
		}
		// all mandatory fields are not filled in
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
		}
	});
});

// Given a String, will determind if String is an email address
function isEmail(email){
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);	
}
