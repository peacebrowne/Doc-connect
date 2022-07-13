let current_section_name = document.querySelector('#landing-page-header #nav_logo span strong')
let student_pic = document.querySelectorAll('#profile_img')
student_pic.forEach(pic => pic.src = localStorage.getItem('profile-picture'))


document.querySelector("#tab-head-chat").addEventListener('click', (e) => {
    let name = 'Home'
    current_section_name.textContent = name;
    hideElement(current_weigh_section);
    setAsInactive(current_weigh_tab_head);
    current_weigh_section = "#home-page";
    current_weigh_tab_head = "#tab-head-chat #icons";
    document.getElementById("footerChatText").style.color = "#000";
    showElement(current_weigh_section);
    setAsActive(current_weigh_tab_head);
    showElement('#landing-page-header')

})

document.querySelector("#tab-head-calls").addEventListener('click', () => {
    let name = 'Order Medicine'
    current_section_name.textContent = name;
    // document.getElementById("icons").style.color = null;
    hideElement(current_weigh_section);
    setAsInactive(current_weigh_tab_head);
    current_weigh_section = "#calls";
    current_weigh_tab_head = "#tab-head-calls";
    document.getElementById("footerCallText").style.color = "#000";
    showElement(current_weigh_section);
    setAsActive(current_weigh_tab_head);
    showElement('#landing-page-header')

})

document.querySelector("#tab-head-doc").addEventListener('click', () => {
    let name = 'Doctor Profile'
    current_section_name.textContent = name;
    hideElement(current_weigh_section);
    showElement('#landing-page-header')
    // document.getElementById("icons").style.color = null;
    setAsInactive(current_weigh_tab_head);
    current_weigh_section = "#doc-profile";
    current_weigh_tab_head = "#tab-head-doc";
    // document.getElementById("footerHospitalText").style.color = "#000";
    showElement(current_weigh_section);
    setAsActive(current_weigh_tab_head);
    document.getElementById('more-about-doc').style.display ='none'
})


// let student_sidebar_picture = document.getElementById('sidebarProfileImg')

// let img = localStorage.getItem('profile-picture');

// student_sidebar_picture.src = img;

// let profile_picture = document.querySelector('#nav_logo img')
// profile_picture.src = img;


// chat with doctor section starts here
const chat_with_doctor = document.getElementById('chat-with-doc')

chat_with_doctor.addEventListener('click',ev => {
    ev.stopImmediatePropagation()
    hideElement('#landing-page-header')
    hideElement('#landing-page-main')
    hideElement('#landing-page-footer')
    showElement('#doc-conversation')

    if (checkNetworkStatus()) {
        
        openMessage()
       
    } else {
        Swal.fire({
            icon: 'error',
            title: `Please Check Your Internet`,
            confirmButtonText: "Close"
        })
    }

})

let hide_and_show = ()=>{
    
}


let receiver_pic = document.querySelector('#doc-img .incoming-img img')
receiver_pic.src = localStorage.getItem('profile-picture')
let doctor_name = document.querySelector('#doc-conversation #header #name #doc-name')
let studentID = localStorage.getItem('studentID')
let assign_doctor = Number(localStorage.getItem('assign-doctor'))


const openMessage = () => {
   
    makeAPIGetRequest(`${URL}/api/get_users`)
    .then(data => {

        let doctor = data[0].find(name => name.ID === assign_doctor);
        console.log(doctor)

        document.querySelector('.incoming-img img').src = doctor.profile_pic

        if(doctor != undefined){
            doctor_name.textContent = `${doctor.first_Name} ${doctor.last_Name}`
              // displaying previous conversation between student and doctor
              previousMessages(studentID,assign_doctor,doctor.profile_pic)

        }
        getUsersId(assign_doctor,studentID,doctor.profile_pic)

    })
}

let studentId;
let doctorId;

const chatsMessages = document.getElementById('charts')

let previousMessages = (stdID,docID,image) =>{
    studentId = stdID;
    doctorId = docID;

    makeAPIGetRequest(`${URL}/api/getMessage`)
    .then(data => {

        let messages = data[0];
        messages.forEach(msg => {
            
            if(msg.from_user == stdID && msg.to_user == docID){
                let receivedDiv = document.createElement('div')
                receivedDiv.classList.add('user-response')
               
                if(msg.message == ''){
                    receivedDiv.innerHTML = `<div class="response" style="padding: 7px 10px; width: 50px; height: 30px;">
                    <span>
                    </span>
                    </div>`
                }else{
                    receivedDiv.innerHTML = `<div class="response">
                    <span>
                        ${msg.message}
                    </span>
                    </div>`
                }
               
                chatsMessages.appendChild(receivedDiv)

            }else{
                if(msg.to_user == stdID && msg.from_user == docID){
                    let sendDiv = document.createElement('div')
                    sendDiv.classList.add('user-text')

                    if(msg.message == ''){
                        sendDiv.innerHTML = `<div class="incoming-img">
                        <img src="${image}" width="50px" height="50px" style="border-radius: 50px;"  alt="">
                        </div>
                        <div class="message" style="padding: 7px 10px; width: 50px; height: 30px;">
                            <span>
                            </span>
                        </div>`
                    }else{
                        sendDiv.innerHTML = `<div class="incoming-img">
                        <img src="${image}" width="50px" height="50px" style="border-radius: 50px;"  alt="">
                        </div>
                        <div class="message">
                            <span>
                                ${msg.message}
                            </span>
                        </div>`
                    }
                  
                    chatsMessages.appendChild(sendDiv)
                }
            }

        })
    })
    
}



// student appointment with doctor
const studentName = document.getElementById('student-name')
const studentContact = document.getElementById('student-contact')
const studentEmail = document.getElementById('student-email')
const studentClass = document.getElementById('student-class')
const aptDate = document.getElementById('appointment-date')
const aptTime = document.getElementById('appointment-time')
const aptNote = document.getElementById('appointment-message')
const submitApt = document.getElementById('submit-studentApt')
const appointmentDiv = document.getElementById('student-appointment');

appointmentDiv.addEventListener('click', (ev)=>{
    ev.stopImmediatePropagation()
    hideElement('#landing-page-header')
    hideElement('#landing-page-main')
    hideElement('#landing-page-footer')
    showElement('#book-appointment')
})

let student_appointment_info = ()=>{
    
    let info ={
        student_name: studentName.value,
        student_contact: studentContact.value,
        student_email: studentEmail.value,
        student_class: studentClass.value,
        student_id: localStorage.getItem('studentID'),
        school_name: localStorage.getItem("school-name"),
        apt_date: aptDate.value,
        apt_time: aptTime.value,
        apt_note: aptNote.value,
        doc_id: assign_doctor
    };

    validate_student_apt(info)

}

let allAptInput = document.querySelectorAll('#book-appointment form input')


let validate_student_apt= info =>{

    let counter = 0;

    for(let i = 0; i < allAptInput.length; i++){
        let input = allAptInput[i];

        if(input.value != ''){
            counter++
        }else{
            Swal.fire({
                icon: 'error',
                title: `Please enter your ${input.placeholder}`,
                confirmButtonText: "Close"
            })
            break;
        }
    }

    if(counter == allAptInput.length){
        if(studentClass.value.includes("Please Select Your Class")){
            Swal.fire({
                icon: 'error',
                title: `Please Select Your Class`,
                confirmButtonText: "Close"
            })
        } else{
            // submit appointment
            sumbit_student_apt(info)
        }
    }

}

// submit student appointment.
let sumbit_student_apt = info =>{
    console.log(info)

}

submitApt.addEventListener('click', ev =>{
    ev.preventDefault()
    student_appointment_info()
    // console.log('aaa')
})

let view_more = document.getElementById('view-more')
view_more.addEventListener('click',()=>{
    document.getElementById('more-about-doc').style.display ='block'
})

let doc_profile_chatBtn = document.getElementById('doc-profile-chat')

doc_profile_chatBtn.addEventListener('click',ev =>{
    ev.preventDefault()
    hideElement('#landing-page-header')
    hideElement('#landing-page-main')
    hideElement('#landing-page-footer')
    showElement('#doc-conversation')

    openMessage()
})


// Book Emergency

// Book Emergency
const book_emergency = document.getElementById('book-emergency')

book_emergency.addEventListener('click', ()=>{
    hideElement('#landing-page-footer')
    hideElement('#landing-page-header')
    hideElement('#home-section')
    hideElement('#container-fluid')
    showElement('#hospitals')
})