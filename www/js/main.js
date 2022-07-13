(function($) {

    "use strict";


})(jQuery);



function validate() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if (username == "cjackson998" && password == "d3vL1ber1@2020") {
        // alert("Login successfully");
        window.location = "index.html"; // Redirecting to other page.
        return false;
    } else {
        alert("Wrong Password, Please check login information and try again.");
    }
}