$(document).ready(function(){
    
    $("#submitButton").click(function(){
        console.log("Subtmit button clicked");
        let inputEmailField = $("#inputEmailField").val();

        if(inputEmailField !== ""){
            window.location = "passwordResetConfirmation.html";
        }
        else if(inputEmailField === ""){
            $("#emailFieldSection").addClass("has-error");
            // Error message
            $("#emailFieldError").text("Please provide an email address");
        }
        else if(!isEmail(inputEmailField)){
            $("#emailFieldSection").addClass("has-error");
            // Error message
            $("#emailFieldError").text("Please provide a valid email address");            
        }

    });	

    // Given a String, will determind if String is an email address
    // used to develop: http://www.javascriptkit.com/javatutors/re.shtml
    function isEmail(email){
      var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return regex.test(email); 
    }
});