// Navigate away warning on incomplete form when the user clicks the back button
// in their browser or when the user tries to close the window
// Reference: https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onbeforeunload
window.onbeforeunload = function(){
	return "leaving this page will reset the fields";
}

function deleteAccount(){
	if(window.confirm("Please click 'OK' to confirm you wish to delete your account")){
		window.alert("Your account has been deleted");
		window.location = "../index.html";
	}
}

$(document).ready(function(){
	// show who is logged in - in the navigation menu
	let currentlyLoggedInAs = localStorage.getItem("currentlyLoggedInAs");
	let userData = JSON.parse(localStorage.getItem(currentlyLoggedInAs + "_userdata"));
	$("#usersFullName").text("Logged in as: " + userData.fName + " " + userData.lName);

	// pre-populate first name, last name, and email fields with user's account details
	$("#firstName").val(userData.fName);
	$("#lastName").val(userData.lName);
	$("#email").val(userData.email);
});