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
    appoitmentInfo()
     
   

})


function appoitmentInfo(){
    let allAptInput = document.querySelectorAll('#book-appointment form .form-group input')
    let textArea = document.getElementById('appointment-note')
    let info = {}
    let counter = 0;

    // validating for empty appointment input field
    for(let i = 0; i < allAptInput.length; i++){
       let input = allAptInput[i]
        // if any input field is empty throw error message is exit iteration
        if(input.value == ''){
            Swal.fire({
                icon: 'error',
                title: `Please enter the empty input field`,
                confirmButtonText: "Close"
            })
            break;
        }else{
            
            info['doctorId'] = Number(receiverID);
            info['patientId'] = Number(localStorage.getItem('userID'))
            info[input.name]= input.value;
            counter++
        }
    }

    // if counter is equal to the length of all the 
    // appointment form
    if(counter == allAptInput.length){

        info[textArea.name] = textArea.value;
       
        // passing current appoint for validation
        validateAppointment(info)

    }
    
}

// validating previous Apptment
function validateAppointment(info){
    makeAPIGetRequest(`${URL}/api/getAppointments`)
    .then(data => {
        // getting all appointments from db 
        let result = data[0]
        console.log(result)
        let counter = 0;
       
        for(let i = 0; i < result.length; i++){
            let apt = result[i]
              // checking if current apt time and date is same to each apt time and date from db
              if(info.doctorId == apt.doctorId && info.patientId == apt.patientId && info.appointment_time == apt.appointment_Time){
                
                Swal.fire({
                    icon: 'error',
                    title: 'You" already schedule an appointment with this date and time',
                    confirmButtonText: "Close"
                })
                break;
            }else {
                counter++
            }
        }
        
        if(counter == result.length){
            
            submitAppointment(info)
            // reset all input field to empty

             reInitializeForm()
          
        }
    })

}

// Submitting 
function submitAppointment(info){

    
    makeAPIPostRequest(`${URL}/api/make_appointment`,info)
    
}


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
