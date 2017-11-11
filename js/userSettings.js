// Navigate away warning on incomplete form when the user clicks the back button
// in their browser or when the user tries to close the window
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
	// show who is logged in
	let currentlyLoggedInAs = localStorage.getItem("currentlyLoggedInAs");
	let userData = JSON.parse(localStorage.getItem(currentlyLoggedInAs + "_userdata"));
	$("#usersFullName").text("Logged in as: " + userData.fName + " " + userData.lName);
});