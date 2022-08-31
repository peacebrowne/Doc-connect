const bookBtn = document.getElementById('bookBtn')
const apt_form = document.getElementById('book-appointment')
const bckToMainPage = document.querySelector('#book-appointment #book-head #bckToMainPage');


bookBtn.addEventListener('click',ev =>{
    ev.preventDefault();
    hideElement('#doc-profile')
    hideElement('#appointmentDoctors')
    hideElement('#bckToDocPro5')
    showElement('#book-appointment')
})

bckToMainPage.addEventListener('click',()=>{
    location.reload()
    // hideElement('#book-appointment')
    // showElement('#doc-short-info')
})


const allAptInput = document.querySelectorAll('#book-appointment form input')
const bckToDocPro5 = document.querySelector('#book-appointment #book-head').children[1];


function reInitializeForm(){
    allAptInput.forEach(input =>{
        input.value = ''
    })
    aptNote.value = ''
}

bckToDocPro5.addEventListener('click', ev =>{
    ev.stopImmediatePropagation()
    hideElement('#book-appointment')
    showElement('#doc-short-info')
    
 
   
})

const aptNote = document.querySelector('#book-appointment #appointment-note')
const apt_Request_Btn = document.querySelector('#book-appointment #request-apt-btn')

let receiverID;

function received_ID(id){
    receiverID = id
}

apt_Request_Btn.addEventListener('click',ev =>{
    ev.preventDefault();
    appointmentInfo()
     
   

})

const appointmentInfo = () =>{
    // get input data
    let input = document.querySelectorAll('#book-appointment form input')
    let apt_note = document.querySelector('#book-appointment form textarea')
    
    validate_apt_info(input,apt_note)

}

const validate_apt_info = (input,note) => {
    let name
    let info = {};

    // iterate form to get all data.
    for(const i of input){
        if(i.value == ''){
            name = i.name.split('_')[1];
            Swal.fire({
                icon: 'error',
                title: `Please enter the ${name} field`,
                confirmButtonText: "Close"
            })
            return;
        }

        info[i.name] = i.value;
    }

    // validate for valid contact number.
    let contact = contact_validation(info['patient_contact_number']);
    if(contact == 'error') return;

    // validate for valid contact number.
    let email = email_validation(info['patient_email'])
    if(email == 'error') return;

    // validate for valid appointment data.
    let date = date_validation(info['appointment_date'])
    if(date == 'error') return;

    // check if appointment note is empty.
    if(note.value == ''){
        name = note.name.split('_')[1]
        Swal.fire({
            icon: 'error',
            title: `Please enter the ${name} field`,
            confirmButtonText: "Close"
        })
        return;
    }

    info[note.name] = note.value;
    info['doctorId'] = Number(receiverID);
    info['patientId'] = Number(localStorage.getItem('userID'))
    
    console.log(info)
    submit_appointment(info)
    // validate_existing_apts(info)

}

const date_validation = date => {
    
    // let apt_date = Array.of(date).flatMap(d => d.split('-')) 
    let apt_date = date.split('-') 
    let apt_year = +apt_date[0]
    let apt_month = +apt_date[1]
    let apt_day = +apt_date[2]

    let current_date = new Date();
    let year = +current_date.getFullYear();
    let month = +current_date.getMonth()+1;
    let day = +current_date.getDate();

    if(apt_year < year){
        Swal.fire({
            icon: 'error',
            title: `Invalid!
                    Appointed year has passed.
                    `,
            confirmButtonText: "Close"
        })
        return 'error';
    }

    if(apt_month < month ){
        Swal.fire({
            icon: 'error',
            title: `Invalid!
                    Appointed month has passed.
                    `,
            confirmButtonText: "Close"
        })
        return 'error';
    }

    if(apt_day < day){
        Swal.fire({
            icon: 'error',
            title: `Invalid!
                    Appointed day has passed.
                    `,
            confirmButtonText: "Close"
        })
        return 'error';
    }

}

// contact vaidation function
const contact_validation = contact =>{

    if(contact.length === 9 || contact.length === 10){
        return contact;
    }

    Swal.fire({
        icon: 'error',
        title: `Invalid Phone Number.
                Digits should be at most 9 or 10.`,
        confirmButtonText: "Close"
    })
    return 'error';

}

// email validation function
const email_validation = email =>{

    if(email.includes('@gmail.com') || email.includes('@yahoo.com')) return email;
    
    Swal.fire({
        icon: 'error',
        title: `Invalid Email Address.
                Email should be. ex: "abc@gmail".`,
        confirmButtonText: "Close"
    })
    return 'error';

}

// validate for an existent data and time
const validate_existing_apts = info => {
    makeAPIGetRequest(`${URL}/api/getAppointments`)
    .then(data => {
        // let current_date = info.appointment_date;
        
        let appointments = data[0];
        console.log(appointments)
        // let same_appointment = appointments.find(apt => {
        //     let date = apt.appointment_date.split('T')[0];
        //     // date === current_date;
        // })

    })

}
const submit_appointment = info =>{
    makeAPIPostRequest(`${URL}/api/make_appointment`,info)

}

// Submitting 

// function submitAppointment(info){
    
//     makeAPIPostRequest(`${URL}/api/make_appointment`,info)
    
// }


// function is displaying doctors or both appointment and chat
function appointmentAndChats(){
    makeAPIGetRequest(`${URL}/api/get_users`)

    .then(data => {
        for(let i = 0; i < data[0].length; i++){

			let datum = data[0][i];
			
			if(datum.roles === 'Doctor'){

                //    Doc Picture Section
				let imgDiv = document.createElement('div')
				imgDiv.setAttribute('style','padding: 15px')
				imgDiv.classList.add('img')
				let img = `
				<img src="${datum.profile_pic}" width="50px" height="50px" style="border-radius: 50%;"/>
								
				<div class="doc-flow" style="display: none;">
					<div class="doc-flow-items doc-names">
						<strong class="doc-name">${datum.first_Name} ${datum.last_Name}</strong>
						
						<strong class="doc-specs">${datum.specialization}</strong> 
					</div>
					
				</div>
				<span id="docId" style="display:none">${datum.ID}</span>

				`
				imgDiv.innerHTML = img;
				imglist2.appendChild(imgDiv)

            }
        }
    })
}
// appointmentAndChats()



let appointment = document.getElementById('page-doctors')

// Getting Doctor from database only for appointments
function appointmentDoctors(){
    makeAPIGetRequest(`${URL}/api/get_users`)

	.then(data => {
        for(let i = 0; i < data[0].length; i++){

			let datum = data[0][i];
			
			if(datum.roles === 'Doctor'){

                let aptDoctors = document.createElement('div');
                aptDoctors.classList.add('aptDoc')
                let aptDoc = `
                <img src="${datum.profile_pic}" width="50px" height="50px"/>
                
                <div class="doc-flow">
                    <div class="doc-flow-items doc-names">
                        <strong class="doc-name">${datum.first_Name} ${datum.last_Name}</strong>
                        
                    <strong class="doc-specs">${datum.specialization}</strong> 
                    </div>
                    <div class="doc-flow-items">
                        <strong class="doc-followers">Followers</strong>
                        <strong>1200</strong>
                    </div>
                </div>
                <span id="docId" style="display:none">${datum.ID}</span>

                `
                aptDoctors.innerHTML = aptDoc;
                appointment.appendChild(aptDoctors)
            }
        }
    })
}
appointmentDoctors()

const scheduleAppointment = document.getElementById('schedule-appointment')
const mainSection = document.querySelector('main')

// Getting Doctors only for appointment
function getAptDoc(){
    let aptDoctors = document.querySelectorAll('.aptDoc')

    // adding click event to each doc for setting an appointment;

    aptDoctors.forEach(doc =>{
        doc.addEventListener('click',() => {
            receiverID = doc.lastElementChild.textContent;
            // console.log(receiverID)
            showAppointmentForm()
        })
    })
}

scheduleAppointment.addEventListener('click',()=>{
    hideElement('main')
    hideElement('#landing-page-header')
    hideElement('#landing-page-footer')
    showElement('#book-appointment')
    hideElement('#book-appointment form')
    showElement('#book-appointment #appointmentDoctors')
    hideElement('#bckToDocPro5')

    // getting all doc only for appointment
    getAptDoc()
})


// display appointment form for patient to schedule appointment
function showAppointmentForm(){
    hideElement('#book-appointment #appointmentDoctors')
    document.querySelector('#book-appointment form').style.display = 'flex'
}
