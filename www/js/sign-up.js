const personIdentity = document.querySelector('#signUp .form-group #select')
const signUpForm = document.querySelector('#signUp')
const submitBtn = document.querySelector('#signUp .form-group #signUp-btn')


function hideAndShowOtherSpecializationElement(status){
    if(status ==="others"){
        document.getElementById('otherDoctorSpecialization').setAttribute("required","");
        showElement("#otherSpecializationDiv");
        
    }else{
        document.getElementById('otherDoctorSpecialization').removeAttribute("required");
        hideElement("#otherSpecializationDiv")
    }
}


function personIdentityForm(option){
    if(personIdentity.value == ''){
        Swal.fire({
            icon: 'error',
            title: 'Please indicate who you are in the field',
            confirmButtonText: "Close"
        })
    }else{
        if(option == 'doctor'){
            hideElement("#signUp")
            showElement("#doctor-form")
     
         }else if(option == 'patient'){
            hideElement("#signUp")
            showElement("#patient-form")
         }
    }

}

submitBtn.addEventListener('click',function(e){
    e.preventDefault()
    personIdentityForm(personIdentity.value)
})

const backToSignUp = document.querySelector('#doctor-form .form-group .utility .mb-2 a')

backToSignUp.addEventListener('click',function(){
        hideElement("#doctor-form")
        showElement("#signUp")
})

// A section that validate the entire sign Up form.
const doc_firstName = document.getElementById('doc-firstname');
const doc_middleName = document.getElementById('doc-middlename');
const doc_lastName = document.getElementById('doc-lastname');
const doc_email = document.getElementById('doc-email');
const doc_phoneNumber = document.getElementById('doc-phone-number');
const doc_specialization = document.getElementById('specialization');
const doc_otherSpecialization = document.getElementById('otherDoctorSpecialization');
const doc_hospital = document.getElementById('doc-hospital');
const doc_password = document.getElementById('doc-user-password')
const doc_comfirmPassword = document.getElementById('doc-comfirm-password');
const doc_username = document.getElementById('doc-username')
const doc_signUP_btn = document.getElementById('doc-signUp-btn');



let counter = 0;
// Stored all inportant input fields in an extra array.
let allDocSignUpInput = [
    doc_firstName,
    doc_lastName,
    doc_username,
    doc_email,
    doc_phoneNumber,
    doc_specialization,
    doc_hospital, 
    doc_password
]
console.log
// This function is getting all the data from the sign-up form.
function getUserSignUpData() {

    if(checkNetworkStatus()){
        showLoader("#signUpLoader-cover");
        showLoader(".signUploader");

        for(let i = 0; i < allDocSignUpInput.length; i++){

            let input = allDocSignUpInput[i];

            if(input.value !== ''){
                counter = i;
            }else{
                hideLoader("#signUpLoader-cover");
                hideLoader(".signUploader")
                Swal.fire({
                    icon: 'error',
                    title: 'Please fill in the required input fields',
                    confirmButtonText: "Close"
                })
                counter = undefined;
                break;
            }
        };


        counter += 1


        if(counter === allDocSignUpInput.length){
            

            if(doc_specialization.value.includes('What do you specialize in')){
                hideLoader("#signUpLoader-cover");
                hideLoader(".signUploader")
                Swal.fire({
                    icon: 'error',
                    title: 'Please indicate what you are specialized in',
                    confirmButtonText: "Close"
                })
            }
            else if(doc_specialization.value === 'others'){

                let userData1 = {
                    "first_Name": doc_firstName.value,
                    "middle_Name": doc_middleName.value,
                    "last_Name": doc_lastName.value,
                    "email": doc_email.value,
                    "phone_Number": doc_phoneNumber.value,
                    "specialization": doc_otherSpecialization.value,
                    "hospital": doc_hospital.value,
                    "password": doc_password.value,
                    "user_Name": doc_username.value
                }
            
                     // Passing the user data to the validation function.
                     validateUserSignUpData(userData1)
                }
         else{

                    let userData2 = {
                        "first_Name": doc_firstName.value,
                        "middle_Name": doc_middleName.value,
                        "last_Name": doc_lastName.value,
                        "email": doc_email.value,
                        "phone_Number": doc_phoneNumber.value,
                        "specialization": doc_specialization.value,
                        "hospital": doc_hospital.value,
                        "password": doc_password.value,
                        "user_Name": doc_username.value
                    }
                
     	            // Passing the user data to the validation function.
                     validateUserSignUpData(userData2)
                }
        }

    }
    else{
        Swal.fire({
            icon: 'error',
            title: 'Please connect to the internet to login',
            confirmButtonText: "Close"
        })
        hideLoader("#signUpLoader-cover");
		hideLoader(".signUploader");
    }
   
}

function validateUserSignUpData(userData){

    if(checkNetworkStatus()){
        showLoader("#signUpLoader-cover");
        showLoader(".signUploader");

        let existing_Emails = [];

        fetch("https://docconnect2022.herokuapp.com/api/email",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(data => {
            let request = data[0];
            request.forEach((result)=>{
                existing_Emails.push(result.doc_email)
            })

            if(existing_Emails.includes(userData.doc_email)){
                hideLoader("#signUpLoader-cover");
                hideLoader(".signUploader");
        
                Swal.fire({
                    icon: 'error',
                    title: 'This email exist',
                    confirmButtonText: "Close"
                });
            }else{
                submit_User_To_DB(userData)
            }
            
        })
        .catch(err => err.message)

    }  else {

        hideLoader("#signUpLoader-cover");
        hideLoader(".signUploader");

        Swal.fire({
            icon: 'error',
            title: 'Please connect to the internet to login',
            confirmButtonText: "Close"
        })
    }
    
}

function submit_User_To_DB(userData){
    if (checkNetworkStatus()) {
		showLoader("#signUpLoader-cover");
		showLoader(".signUploader");
        
        if(userData.password === doc_comfirmPassword.value){

            fetch("https://docconnect2022.herokuapp.com/api/sigup-Doctor",{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            })
            .then(response => response.json())
            .then(data => {
				hideLoader("#signUpLoader-cover");
				hideLoader(".signUploader");
				 
				Swal.fire({
					icon: 'Success',
					title: 'Please Login to Continue',
					confirmButtonText: "Login"
				}).then(function() {
					location.replace("login.html")
				});
				
			})
            .catch(err => err.message)
           
        }else{
			hideLoader("#signUpLoader-cover");
			hideLoader(".signUploader");
            Swal.fire({
                icon: 'error',
                title: 'Your password and comfirm password are not the same',
                confirmButtonText: "Close"
            })
        }

    }   else {
        Swal.fire({
            icon: 'error',
            title: 'Please connect to the internet to login',
            confirmButtonText: "Close"
        })
        hideLoader("#signUpLoader-cover");
			hideLoader(".signUploader");
    }
  
}


doc_signUP_btn.addEventListener('click',(e)=>{
    e.preventDefault()
    getUserSignUpData()
})




// Patient sign up section
const patient_signUp_form = document.getElementById('patient-form')
const patient_firstname = document.getElementById('patient-firstname')
const patient_middlename = document.getElementById('patient-middlename')
const patient_lastname = document.getElementById('patient-lastname')
const patient_username = document.getElementById('patient-username')
const patient_email = document.getElementById('patient-email')
const patient_password = document.getElementById('patient-password')
const patient_comfirmPassword = document.getElementById('patient-comfirm-password')
const patient_phoneNumber = document.getElementById('patient-phone-number')
const patientBackToSignUP = document.getElementById('patient-backTo-signUP')
const patient_occupation = document.getElementById('patient-occupation')
const patientSubmitBtn = document.getElementById('patient-signUp-btn')


let allPatientInput = [
    patient_firstname,
    patient_lastname,
    patient_username,
    patient_email,
    patient_password,
    patient_phoneNumber,
    patient_occupation
]

patientBackToSignUP.addEventListener('click',function(){
    hideElement("#patient-form")
    showElement("#signUp")
})

function getPatientData(){

    for(let i = 0; i < allPatientInput.length; i++){

        let input = allPatientInput[i];

        if(input.value !== ''){
            counter = i;
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Please fill in the required input fields',
                confirmButtonText: "Close"
            })
            counter = undefined;
            hideLoader("#signUpLoader-cover");
            hideLoader(".signUploader")
            break;
        }
    };

    counter += 1;

    if(counter === allPatientInput.length){
        let userData = {
            first_Name: patient_firstname.value,
            middle_Name: patient_middlename.value,
            last_Name: patient_lastname.value,
            email: patient_email.value,
            phone_Number: patient_phoneNumber.value,
            occupation: patient_occupation.value,
            password: patient_password.value,
            user_Name: patient_username.value,
        }
        validatePatientData(userData)
    }
}


function validatePatientData(userData){
    showLoader("#signUpLoader-cover");
	showLoader(".signUploader");

    if(checkNetworkStatus()){
		showLoader("#signUpLoader-cover");
		showLoader(".signUploader");

        let allPatientData = []
        
        fetch("https://docconnect2022.herokuapp.com/api/email",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(data => {
            let request = data[0];
            request.forEach((result)=>{
                allPatientData.push(result.email)
            })

            if(allPatientData.includes(userData.email)){
                hideLoader("#signUpLoader-cover");
                hideLoader(".signUploader");
        
                Swal.fire({
                    icon: 'error',
                    title: 'This email exist',
                    confirmButtonText: "Close"
                });
            }else{
                submitPatientDataToDB(userData)
            }
            
        })
        .catch(err => err.message)
    }  else {

		hideLoader("#signUpLoader-cover");
		hideLoader(".signUploader");

        Swal.fire({
            icon: 'error',
            title: 'Please connect to the internet to login',
            confirmButtonText: "Close"
        })
    }

}


function submitPatientDataToDB(userData){
    if (checkNetworkStatus()) {
		showLoader("#signUpLoader-cover");
		showLoader(".signUploader");
        
        if(userData.password === patient_comfirmPassword.value){

            fetch("https://docconnect2022.herokuapp.com/api/ordinary",{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            })
            .then(response => response.json())
            .then(data => {
				hideLoader("#signUpLoader-cover");
				hideLoader(".signUploader");
				 
				Swal.fire({
					icon: 'Success',
					title: 'Please Login to Continue',
					confirmButtonText: "Login"
				}).then(function() {
					location.replace("login.html")
				});
				
			})
            .catch(err => err.message)
           
        }else{
			hideLoader("#signUpLoader-cover");
			hideLoader(".signUploader");
            Swal.fire({
                icon: 'error',
                title: 'Your password and comfirm password are not the same',
                confirmButtonText: "Close"
            })
        }

    }else {
        Swal.fire({
            icon: 'error',
            title: 'Please connect to the internet to login',
            confirmButtonText: "Close"
        })
    }
  
}

patientSubmitBtn.addEventListener('click',function(e){
    e.preventDefault()
    getPatientData()
})