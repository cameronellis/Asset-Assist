// Navigate away warning on incomplete form when the user clicks the back button
// in their browser or when the user tries to close the window
// Reference: https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onbeforeunload
window.onbeforeunload = function(){
	return "leaving this page will reset the fields";
}

$(document).ready(function(){
	$("#registrationButton").click(function(){
		let firstNameField       = $("#firstNameField").val();
		let lastNameField        = $("#lastNameField").val();
		let emailField           = $("#emailField").val();
		let passwordField        = $("#passwordField").val();
		let confirmPasswordField = $("#confirmPasswordField").val();

		// if all required fields are provided 
		// and a valid email address is given 
		// and the passwordField and confirmPasswordField vals match
		if(   firstNameField !== "" && lastNameField !== "" && emailField !== "" 
			&& passwordField !== "" && confirmPasswordField !== ""
			&& isEmail(emailField)  && (passwordField === confirmPasswordField)){

			window.location = "accountCreationConfirmation.html";
		}
		else{
			// if first name not provided
			if(firstNameField === ""){
				$("#firstNameSection").addClass("has-error");
				// Error message
				$("#firstNameError").text("Please provide your first name");
			}
			// if first name provided
			else{
				$("#firstNameSection").addClass("has-success");
			}

			// if last name not provided
			if(lastNameField === ""){
				$("#lastNameSection").addClass("has-error");
				// Error message
				$("#lastNameError").text("Please provide your last name");
			}
			// if last name provided
			else{
				$("#lastNameSection").addClass("has-success");	
			}

			// if email not provided
			if(emailField === ""){
				$("#emailSection").addClass("has-error");
				// Error message
				$("#emailError").text("Please provide an email address");
			}
			// if email provided is not valid
			else if(!isEmail(emailField)){
				$("#emailSection").addClass("has-error");
				// Error message
				$("#emailError").text("Please provide a valid email address");
			}
			// if email provided
			else{
				$("#emailSection").addClass("has-success");	
			}

			// if passwords don't match
			if(passwordField !== "" && confirmPasswordField !== "" 
				&& (passwordField !== confirmPasswordField)){
				$("#passwordSection").addClass("has-error");
				$("#confirmPasswordSection").addClass("has-error");
				// Error message
				$("#confirmPasswordError").text("The password you provided in 'Password' field does " 
					+ "not match the one provided in the 'Confirm Password'");
			}

			// if password not provided
			if(passwordField === ""){
				$("#passwordSection").addClass("has-error");
				// Error message
				$("#passwordError").text("Please provide a password");
			}
			// if password provided
			else{
				$("#passwordSection").addClass("has-success");	
			}
			
			// if confirm password provided
			if(confirmPasswordField === ""){
				$("#confirmPasswordSection").addClass("has-error");	
				// Error message
				$("#confirmPasswordError").text("Please provide the password again");				
			}
			// if confirm password not provided
			else{
				$("#confirmPasswordSection").addClass("has-success");	
			}

		}
	});

	// Given a String, will determind if String is an email address
	// Reference: http://www.javascriptkit.com/javatutors/re.shtml
    function isEmail(email){
      var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return regex.test(email); 
    }
});