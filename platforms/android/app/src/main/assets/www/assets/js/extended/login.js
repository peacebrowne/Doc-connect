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
				// console.log(data);

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
                        location.replace("index.html");


                        // if(localStorage.getItem(`${username}-ID`) === data.Id && localStorage.getItem(`${username}-role`) === data.role){
                        //     if(data.role === "Doctor"){
                        //         // Display both ordinary and doctor page to the current user
                        //         location.replace("index.html");
                        //     }else{
                        //         // Display only doctor page to the current user
                        //         location.replace("index.html")
                        //     }
                        // }else{
                        //     localStorage.setItem(`${username}-ID`,data.ID);
                        //     localStorage.setItem(`${username}-role`,data.role)
                        //     hideElement("#login-form")
                        //     showElement("#upload-picture-form") 
                        // }



					} else {
						Swal.fire({
							icon: 'error',
							title: 'Wrong username or password entered',
							confirmButtonText: "Close"
						})
					}
				}
               
				// if(String(data) === "true"){
				// 	console.log(data[0][0].ID)
                //     localStorage.setItem('userID', data[0][0].ID);
                //     console.log(localStorage.getItem('userID'))
				// 	console.log(data);
                //     location.replace("index.html");
				// }else{
				// 	Swal.fire({
                //         icon: 'error',
                //         title: 'Wrong username or password entered',
                //         confirmButtonText: "Close"
                //     })
				// }
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
		console.log("it's a doctor");
		location.replace("");
	}
}

function removeUserFromSession() {
    localStorage.removeItem('userID');
	localStorage.removeItem('role');
    localStorage.removeItem('username');
    redirectUser(false)
}

function getData() {

    const loginUsername = document.getElementById('username').value;
    const loginPassword = document.getElementById('password').value;

    login(loginUsername, loginPassword);
}
