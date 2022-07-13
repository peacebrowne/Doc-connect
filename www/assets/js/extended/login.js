let local_storage_username = '';
let local_storage_password = '';

document.getElementById('login-btn').addEventListener('click', e => {
    e.preventDefault();
    let username = document.getElementById('username');
    let password = document.getElementById('password');


    if (checkNetworkStatus()) {
        showLoader("#loader-cover");
        showLoader(".loader");

        // Make direct request
        makeAPIPostRequestForLogin(`${URL}/api/login`, { username: username.value, password: password.value })
            .then(data => {
                hideLoader("#loader-cover");
                hideLoader(".loader");

				if(String(data) === "false"){
					Swal.fire({
						icon: 'error',
						title: 'Wrong username or password entered',
						confirmButtonText: "Close"
					})
				}
				else{
					if (data.length > 0) {
						
						localStorage.setItem('userID', data[0][0].ID);
						localStorage.setItem('role', data[0][0].roles);
						localStorage.setItem('profile-pic',data[0][0].profile_pic)
						localStorage.setItem('user-name',`${data[0][0].first_Name} ${data[0][0].last_Name}`)
						
						// Is it the user first time to  login?
						makeAPIPostRequestForLogin(`${URL}/api/firstTimeLogIn`, { userId: localStorage.getItem('userID')})
						.then(data => {
							// if it's the user first time logging in
							if(String(data[0][0].first_log_in) == "null" || data[0][0].first_log_in === ""){
								// save welcome message from Docconnect
								makeAPIPostRequestForLogin(`${URL}/api/welcomeMessage`, { from_user: 811, to:localStorage.getItem("userID"), message: "Welcome to Docconnect where your health matters, we are happy to have you on our platform, we do hope your needs are met and we strive to make the world a better place.",user_Id: 671})
								.then(data => {
									hideLoader("#loader-cover");
									hideLoader(".loader");
									location.replace("uploadImg.html");
								})		
							}else{
								if (localStorage.getItem('role') === "Doctor") {
									location.replace("doctor.html");
								 }else if(localStorage.getItem('role') === "ordinary"){
									
									 location.replace("index.html");
								 }
								
							}
						})           	
					} else {
						Swal.fire({
							icon: 'error',
							title: 'Wrong username or password entered',
							confirmButtonText: "Close"
						})
					}
				}
               
            })

        .catch(err => {
            console.log(err);
            Swal.fire({
                icon: 'error',
                title: 'An error occurred. Please try again',
                confirmButtonText: "Close"
            })
        })

    } else {

        hideLoader("#loader-cover");
        hideLoader(".loader");

        Swal.fire({
            icon: 'error',
            title: 'Please connect to the internet to login',
            confirmButtonText: "Close"
        })
    }
})

function checkSessionIfUserLogIn() {
    if (localStorage.getItem('role') === "Doctor") {
       console.log("it's a doctor");
    }else if(localStorage.getItem('role') === "Ordinary"){
		console.log("it's a patient");
		location.replace("");
	}
}


function getData() {

    const loginUsername = document.getElementById('username').value;
    const loginPassword = document.getElementById('password').value;

    login(loginUsername, loginPassword);
}



